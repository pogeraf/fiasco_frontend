import { Injectable } from '@angular/core';
import { ICurrentRoom } from '../../room/current-room/current-room.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentRoomService {
  private currentRoomSource = new BehaviorSubject<ICurrentRoom>(
    {} as ICurrentRoom
  );
  public currentRoom$ = this.currentRoomSource.asObservable();
  constructor() {}

  public setCurrentRoomValue(room: ICurrentRoom) {
    this.currentRoomSource.next(room);
  }
}
