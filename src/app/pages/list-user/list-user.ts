import { Component, inject, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { SharedService } from '../../services/shared-service';
import { DialogService } from '../../services/dialog-service';
import { AddUserComponent } from '../../dialogs/add-user-component/add-user-component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/api/user-service';

@Component({
  selector: 'app-list-user',
  imports: [
    FormsModule
  ],
  templateUrl: './list-user.html',
  styleUrl: './list-user.scss'
})
export class ListUser {
  usersCount = signal(0);
  users = signal<UserInterface[]>([]);
  searchTerm ="";

  sharedService = inject(SharedService);
  userService = inject(UserService);
  _dialogService = inject(DialogService);

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (us) => {
        this.users.set(us);
        console.log(this.users());
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

  onSearch(){}

  onClickUser(e: Event, user: UserInterface) {
    e.stopPropagation();
    this.sharedService.isOnListRoom.set(false);
    this.sharedService.isDisplayMessenger.set(true);
    this.sharedService.selectedUser.set(user);
  }
}
