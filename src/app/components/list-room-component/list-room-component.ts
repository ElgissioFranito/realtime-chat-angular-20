import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-list-room-component',
  imports: [],
  templateUrl: './list-room-component.html',
  styleUrl: './list-room-component.scss'
})
export class ListRoomComponent {

  conversations = [
    { title: "Can't Sleep, Possibly Insomnia...", time: "3m", count: "2" },
    { title: "My BF just left today...", time: "3m", count: "" },
    { title: "Best Meditation App? I ne...", time: "3m", count: "2" },
    { title: "How to be a better person?", time: "3m", count: "2" },
    { title: "How to not think about st...", time: "3m", count: "" },
    { title: "How to be calm & stoic", time: "3m", count: "" },
    { title: "Great medication Books", time: "3m", count: "" },
    { title: "Mindfulness Tips 101?", time: "3m", count: "" },
    { title: "Where to meditate best", time: "3m", count: "" }
  ];

  sharedService = inject(SharedService);

  viewMessenger() {
    this.sharedService.isOnListRoom.set(false);
  }
}
