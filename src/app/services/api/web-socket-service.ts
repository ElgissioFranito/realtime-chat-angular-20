import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { UserInterface } from '../../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: Socket | null = null;
  private messagesSubject = new BehaviorSubject<string[]>([]);
  private userJoinedSubject = new BehaviorSubject<UserInterface>({} as UserInterface);
  private userLeftSubject = new BehaviorSubject<number>(0);
  messages$: Observable<string[]> = this.messagesSubject.asObservable();
  userJoined$: Observable<UserInterface> = this.userJoinedSubject.asObservable();
  userLeft$: Observable<number> = this.userLeftSubject.asObservable();

  userId = signal(0);

  connect() {
    if (this.socket) return; // Prevent multiple connections

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Ajouter un gestionnaire pour l'événement connection-success
    this.socket.on('connection-success', (data: any) => {
      if (data.user) {
        // Ajouter l'utilisateur connecté à votre liste ou état local
        this.userJoinedSubject.next(data.user);
        
        // Vous pouvez également stocker clientId ou userId localement si nécessaire
        localStorage.setItem('clientId', data.clientId); // Optionnel
        localStorage.setItem('userId', data.userId); // Optionnel

        this.userId.set(data.userId);
      }
    });

    this.socket.on('user-joined', (data: any) => {
      if (data.user) {
        this.userJoinedSubject.next(data.user);
      }
    });

    this.socket.on('user-left', (data: any) => {
      if (data.userId) {
        this.userLeftSubject.next(data.userId);
      }
    });

    this.socket.on('message', (data: string) => {
      const currentMessages = this.messagesSubject.getValue();
      this.messagesSubject.next([...currentMessages, data]);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  sendMessage(message: string) {
    if (this.socket?.connected) {
      this.socket.emit('test', message);
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;

        this.userId.set(0);
        localStorage.removeItem('clientId');
        localStorage.removeItem('userId');

    }
  }
}
