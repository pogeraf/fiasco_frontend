import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IEventHandlers, EventTypes } from '../../global.interface';
import { ModalService } from '../modal/modal.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected ws: WebSocketSubject<any>;

  protected connectErrorSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public connectError$: Observable<boolean> =
    this.connectErrorSource.asObservable();
  protected disconnectedManually = false;

  protected handlers: IEventHandlers = {} as IEventHandlers;

  constructor(protected modalService: ModalService) {}

  public connect(room: string, player: string): any {
    this.ws = webSocket(
      `wss://api.fiasco.world/?room=${room}&player=${player}`
    );
    this.ws.subscribe(
      (message: { event: EventTypes; sender: string; data: any }) => {
        if (this.handlers[message.event]) {
          this.handlers[message.event](message);
        }
      },
      () => {
        if (!this.disconnectedManually) {
          this.connectErrorSource.next(true);
        } else {
          this.disconnectedManually = false;
        }
      }
    );
  }

  sendMessage(event: EventTypes, data: {}) {
    this.ws?.next({
      event,
      data,
    });
  }

  public disconnect(): void {
    this.ws?.complete();
    this.disconnectedManually = true;
  }

  public addEventHandler(event: EventTypes, call: CallableFunction) {
    this.handlers[event] = call;
  }
}
