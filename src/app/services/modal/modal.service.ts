import { Injectable } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Subscription } from 'rxjs';
import { ReconnectModalComponent } from '../../modals/reconnect-modal/reconnect-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private subscriptions = new Subscription();

  constructor(protected simpleModalService: SimpleModalService) {}

  public openReconnectModal(): void {
    this.simpleModalService.removeAll().then(() => {
      const subscription = this.simpleModalService
        .addModal(ReconnectModalComponent)
        .subscribe();
      this.subscriptions.add(subscription);
    });
  }
}
