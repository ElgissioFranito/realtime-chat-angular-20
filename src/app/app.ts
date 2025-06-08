import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListUser } from './pages/list-user/list-user';
import { SharedService } from './services/shared-service';
import { AddUserComponent } from './components/add-user-component/add-user-component';
import { DialogOutletComponent } from './dialog-outlet/dialog-outlet.component';

@Component({
  selector: 'app-root',
  imports: [ListUser, DialogOutletComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'realtime-chat-angular-20';

  sharedService = inject(SharedService);

}
