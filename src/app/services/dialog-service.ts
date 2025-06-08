import { ComponentRef, Injectable, signal, Type, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private vcr!: ViewContainerRef;

  isCreateUserDialog = signal(false);

  setRootViewContainerRef(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  open<T extends object>(component: Type<T>, data?: any): { ref: ComponentRef<T>, afterClosed: Subject<any> } {
    const componentRef = this.vcr.createComponent(component);
    const afterClosed = new Subject<any>();

    if ('data' in componentRef.instance) {
      (componentRef.instance as any).data = data;
    }

    // if ('close' in componentRef.instance) {
      (componentRef.instance as any).close = (result?: boolean) => {
        afterClosed.next(result);
        afterClosed.complete();
        componentRef.destroy();
      };
    // }

    return { ref: componentRef, afterClosed };
  }
}
