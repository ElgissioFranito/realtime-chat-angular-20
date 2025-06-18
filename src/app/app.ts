import { Component, inject, signal } from '@angular/core';
import { ListUser } from './pages/list-user/list-user';
import { SharedService } from './services/shared-service';
import { DialogOutletComponent } from './dialogs/dialog-outlet/dialog-outlet.component';
import { ListRoomComponent } from "./components/list-room-component/list-room-component";
import { PrivateMessageComponent } from "./components/private-message-component/private-message-component";
import { CommonModule, NgStyle } from '@angular/common';
import { WebSocketService } from './services/api/web-socket-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    ListUser,
    DialogOutletComponent,
    ListRoomComponent,
    PrivateMessageComponent,
    NgStyle,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'realtime-chat-angular-20';  
  sharedService = inject(SharedService);

  toggleMessenger() {
    if (this.sharedService.isDisplayMessenger()) {
      this.sharedService.isDisplayMessenger.set(false)
    } else {
      this.sharedService.isOnListRoom.set(true)
      this.sharedService.isDisplayMessenger.set(true)
    }
  }

  message: string = '';
  private messageSubscription: Subscription | null = null;
  webSocketService = inject(WebSocketService);

  ngOnInit() {
    // Subscribe to incoming messages
    this.messageSubscription = this.webSocketService.messages$.subscribe({
      next: (msg) => {
        // Messages are handled in the service and exposed via Observable
      },
      error: (err) => console.error('WebSocket error:', err)
    });

    // Connect to WebSocket server
    this.webSocketService.connect();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnDestroy() {
    // Clean up subscription and disconnect
    this.messageSubscription?.unsubscribe();
    this.webSocketService.disconnect();
  }

}
