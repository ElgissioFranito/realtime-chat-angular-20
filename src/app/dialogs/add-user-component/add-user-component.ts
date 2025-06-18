import { Component, inject, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../services/dialog-service';
import { UserService } from '../../services/api/user-service';

@Component({
  selector: 'app-add-user-component',
  imports: [FormsModule],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.scss'
})
export class AddUserComponent {
 @Input() data: any;
  close!: (result?: boolean) => void;

  name = "";
  user_id = 0;
  userService = inject(UserService);
  // sharedService = inject(SharedService);
  dialogService = inject(DialogService);

  ngOnInit() {
    if (this.data) {      
      this.name = this.data.user.name;
      this.user_id = this.data.user.id;
    }
  }


  onSubmit() {
    if (this.name) {
      const user = {
        name: this.name
      }
      this.userService.createUser(user).subscribe({
        next: (res) => {
          console.log('User created:', res);
          this.closed(true); // Ferme le dialogue avec un résultat
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });
      this.name = ''; // Réinitialise le champ de saisie
    }
  }


  onUpdate() {
    if (this.name && this.user_id) {
      const user = {
        name: this.name
      }
      this.userService.updateUser(this.user_id, user).subscribe({
        next: (res) => {
          console.log('User updated:', res);
          this.closed(true); // Ferme le dialogue avec un résultat
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });
      this.name = ''; // Réinitialise le champ de saisie
    }
  }

  onCancel() {
    this.name = '';
    this.closed(false); // Ferme le dialogue avec un résultat
  }

  closed(isResult: boolean) {
    // éviter l'erreur : this.close is not a function
    if (typeof this.close === 'function') {
      this.close(isResult);
    }
  }

}
