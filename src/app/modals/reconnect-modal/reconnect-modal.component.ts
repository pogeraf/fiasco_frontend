import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { ReconnectModalModule } from './reconnect-modal.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reconnect-modal',
  templateUrl: './reconnect-modal.component.html',
  styleUrls: ['./reconnect-modal.component.scss'],
})
export class ReconnectModalComponent
  extends SimpleModalComponent<ReconnectModalModule, any>
  implements OnInit
{
  constructor(
    private router: Router,
    private simpleModalService: SimpleModalService
  ) {
    super();
  }

  ngOnInit(): void {}

  public reconnect(): void {
    window.location.reload();
  }

  public leave(): void {
    this.simpleModalService.removeAll().then(() => {
      this.router.navigate(['/']);
    });
  }
}
