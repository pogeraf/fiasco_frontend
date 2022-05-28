import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconnectModalComponent } from './reconnect-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReconnectModalComponent],
  imports: [CommonModule, RouterModule],
})
export class ReconnectModalModule {}
