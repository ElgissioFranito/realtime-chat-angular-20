import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-private-message-component',
  imports: [],
  templateUrl: './private-message-component.html',
  styleUrl: './private-message-component.scss'
})
export class PrivateMessageComponent {

  sharedService = inject(SharedService);

  onRoomList(){
    this.sharedService.isOnListRoom.set(true);
  }

}
