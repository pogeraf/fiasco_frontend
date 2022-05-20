import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IHandlers, EventTypes } from '../../global.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // @ts-ignore
  protected ws: WebSocketSubject<any>;

  protected handlers: IHandlers = {} as IHandlers;

  constructor() {}

  public connect(room: string, player: string): any {
    this.ws = webSocket(
      `wss://api.fiasco.world/?room=${room}&player=${player}`
    );
    this.ws.subscribe(
      (message: { event: EventTypes; sender: string; data: any }) => {
        if (this.handlers[message.event]) {
          this.handlers[message.event](message);
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
  }

  public addEventHandler(event: EventTypes, call: CallableFunction) {
    this.handlers[event] = call;
  }
}
