import { Component, inject, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { SharedService } from '../../services/shared-service';
import { DialogService } from '../../services/dialog-service';
import { AddUserComponent } from '../../dialogs/add-user-component/add-user-component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/api/user-service';
import { WebSocketService } from '../../services/api/web-socket-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-user',
  imports: [
    FormsModule
  ],
  templateUrl: './list-user.html',
  styleUrl: './list-user.scss'
})
export class ListUser {
  userConnected = signal<UserInterface | null>(null);
  usersCount = signal(0);
  users = signal<UserInterface[]>([]);
  searchTerm = "";

  sharedService = inject(SharedService);
  userService = inject(UserService);
  _dialogService = inject(DialogService);

  webSocketService = inject(WebSocketService);
  private userJoinedSubscription: Subscription | null = null;
  private userLeftSubscription: Subscription | null = null;

  ngOnInit() {
    // Subscribe to user joined event
    this.userJoinedSubscription = this.webSocketService.userJoined$.subscribe({
      next: (user) => {
        this.getUsers();
      },
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed')
    });

    // Subscribe to user left event
    this.userLeftSubscription = this.webSocketService.userLeft$.subscribe({
      next: (userId) => {
        this.getUsers();
      },
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed')
    });

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users : UserInterface[]) => {
        this.users.set(users.filter(user => user.id !== this.webSocketService.userId()));
        const userConnected = users.find(user => user.id === this.webSocketService.userId());
        console.log('User connected:',  this.webSocketService.userId());
        if (userConnected) {
          console.log('User connected:', userConnected);
          
          this.userConnected.set(userConnected);
        }
        this.usersCount.set(this.users().length);
      }
    });
  }

  getInitialUsers(username: string): string {
    return username.charAt(0).toUpperCase();
  }

  onCreateUser() {
    this._dialogService.open(AddUserComponent
    ).afterClosed.subscribe(result => {

      if (result) {
        this.getUsers();
      }
    });
  }

  onDeleteUser(e: Event, user_id: number) {
    e.stopPropagation();
    this.userService.delete(user_id)
      .subscribe((user) => {
        this.getUsers();
      });
  }

  onUpdateUser(e: Event, user: UserInterface) {
    e.stopPropagation();
    this._dialogService.open(AddUserComponent, {
      user
    }).afterClosed.subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  onSearch() { }

  onClickUser(e: Event, user: UserInterface) {
    e.stopPropagation();
    this.sharedService.isOnListRoom.set(false);
    this.sharedService.isDisplayMessenger.set(true);
    this.sharedService.selectedUser.set(user);
  }
}
