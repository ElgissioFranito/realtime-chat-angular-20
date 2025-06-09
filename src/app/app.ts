import { Component, inject, signal } from '@angular/core';
import { ListUser } from './pages/list-user/list-user';
import { SharedService } from './services/shared-service';
import { DialogOutletComponent } from './dialogs/dialog-outlet/dialog-outlet.component';
import { ListRoomComponent } from "./components/list-room-component/list-room-component";
import { PrivateMessageComponent } from "./components/private-message-component/private-message-component";

@Component({
  selector: 'app-root',
  imports: [
    ListUser,
    DialogOutletComponent,
    ListRoomComponent,
    PrivateMessageComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'realtime-chat-angular-20';
  isDisplayMessenger = signal(false);
  
  sharedService = inject(SharedService);

  toggleMessenger() {
    if (this.isDisplayMessenger()) {
      this.isDisplayMessenger.set(false)
    } else {
      this.sharedService.isOnListRoom.set(true)
      this.isDisplayMessenger.set(true)
    }
  }

}
