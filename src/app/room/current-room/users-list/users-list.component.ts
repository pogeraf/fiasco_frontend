import { Component, OnInit } from '@angular/core';
import { IPlayersInRoom } from '../current-room.interface';
import { CurrentRoomService } from '../../../services/current-room/current-room.service';

type TSortedUsers = Array<ISortedUser>;

interface ISortedUser {
  name: string;
  online: boolean;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  players: { [id: string]: IPlayersInRoom } = {};

  constructor(private currentRoomService: CurrentRoomService) {}

  public getSortedUsers(): TSortedUsers {
    const onlineUsers: TSortedUsers = [];
    const offlineUsers: TSortedUsers = [];

    for (const user in this.players) {
      (this.players[user].online ? onlineUsers : offlineUsers).push({
        name: user,
        online: this.players[user].online,
      });
    }

    return [...onlineUsers, ...offlineUsers];
  }

  public objKeys(obj: object) {
    return Object.keys(obj || {});
  }

  ngOnInit(): void {
    this.currentRoomService.currentRoom$.subscribe((data) => {
      this.players = data.players;
    });
  }
}
