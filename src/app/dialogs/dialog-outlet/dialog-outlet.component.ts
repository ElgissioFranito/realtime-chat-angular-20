import { ChangeDetectionStrategy, Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog-service';

@Component({
  selector: 'app-dialog-outlet',
  standalone: true,
  imports: [],
  templateUrl: './dialog-outlet.component.html',
  styleUrl: './dialog-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogOutletComponent implements OnInit {

  vcr = inject(ViewContainerRef);
  dialogService = inject(DialogService);

  ngOnInit() {
    this.dialogService.setRootViewContainerRef(this.vcr);
  }
}
