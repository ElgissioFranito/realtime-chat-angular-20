import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared-service';
import { DialogService } from '../../services/dialog-service';

@Component({
  selector: 'app-add-user-component',
  imports: [FormsModule],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.scss'
})
export class AddUserComponent {

  close!: (result?: boolean) => void;

  name = "";
  userService = inject(UserService);
  // sharedService = inject(SharedService);
  dialogService = inject(DialogService);

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
