import { Injectable } from '@angular/core';
import {
  ICurrentRoom,
  TCurrentRoom,
} from '../../room/current-room/current-room.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentRoomService {
  private currentRoomList: TCurrentRoom = JSON.parse(
    localStorage.getItem('currentRoomList') || '[]'
  );

  constructor() {}

  public addNewRoom(name: string, maxUsers: number): void {
    const room: ICurrentRoom = this.defaultRoom(name, maxUsers);
    this.currentRoomList.push(room);
    localStorage.setItem(
      'currentRoomList',
      JSON.stringify(this.currentRoomList)
    );
  }
  public updateRoom(room: ICurrentRoom): void {
    const list = this.currentRoomList;
    list[list.indexOf(room)] = room;
    localStorage.setItem('currentRoomList', JSON.stringify(list));
  }

  public getRoomByName(name: string): ICurrentRoom {
    return (
      this.currentRoomList.find((e) => e.name === name) ||
      this.defaultRoom('', 0)
    );
  }

  public defaultRoom(name: string, maxUsers: number): ICurrentRoom {
    return {
      name,
      maxUsers,
      usersInRoom: 0,
      users: {},
      items: {},
    };
  }
}
