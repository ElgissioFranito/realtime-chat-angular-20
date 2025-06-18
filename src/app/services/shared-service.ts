import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isDisplayMessenger = signal(false);
  isOnListRoom = signal(true);
  selectedUser = signal<UserInterface | null>(null);


}
