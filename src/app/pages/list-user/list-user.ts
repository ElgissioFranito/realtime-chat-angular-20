import { Component, inject, signal } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { UserService } from '../../services/user-service';
import { UserInterface } from '../../interfaces/user-interface';
import { SharedService } from '../../services/shared-service';
import { DialogService } from '../../services/dialog-service';
import { AddUserComponent } from '../../dialogs/add-user-component/add-user-component';

@Component({
  selector: 'app-list-user',
  imports: [],
  templateUrl: './list-user.html',
  styleUrl: './list-user.scss'
})
export class ListUser {
  usersCount = signal(0);
  users = signal<UserInterface[]>([]);

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

  onDeleteUser(user_id: number) {
    this.userService.delete(user_id)
      .subscribe((user) => {
        this.getUsers();
      });
  }

  onUpdateUser(user: UserInterface) {
    this._dialogService.open(AddUserComponent, {
      user
    }).afterClosed.subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
