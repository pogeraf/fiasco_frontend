import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoomCard, TRoomList } from '../../room/room-list/room-list.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomListService {
  rooms: TRoomList = JSON.parse(localStorage.getItem('roomList') || '[]');

  private roomListSource = new BehaviorSubject<TRoomList>(this.getRoomDB);
  public roomList$ = this.roomListSource.asObservable();

  constructor() {}

  get getRoomDB(): any {
    return this.rooms;
  }

  public addRoomCard(value: IRoomCard): void {
    this.rooms.push(value);
    this.roomListSource.next(this.getRoomDB);
    localStorage.setItem('roomList', JSON.stringify(this.rooms));
  }

  public defaultValueCard(): IRoomCard {
    return {
      name: '',
      styles: {
        bg: {
          color: [255, 255, 255, 1],
        },
        border: {
          size: {
            value: 1,
            unit: 'px',
          },
          type: 'solid',
          color: [0, 0, 0, 1],
          radius: {
            value: 1,
            unit: 'px',
          },
        },
        font: {
          color: [255, 255, 255, 1],
          size: {
            value: 20,
            unit: 'px',
          },
        },
        name: {
          bg: { color: [0, 0, 0, 1] },
          color: [255, 255, 255, 1],
          size: {
            value: 10,
            unit: 'px',
          },
        },
      },
    };
  }
}
