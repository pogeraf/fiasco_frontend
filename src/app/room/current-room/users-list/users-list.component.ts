import { Component, Input, OnInit } from '@angular/core';
import { IUserInRoom } from '../current-room.interface';

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
  @Input() users: { [id: string]: IUserInRoom } = {};

  constructor() {}

  public getSortedUsers(): TSortedUsers {
    const onlineUsers: TSortedUsers = [];
    const offlineUsers: TSortedUsers = [];

    for (const user in this.users) {
      (this.users[user].online ? onlineUsers : offlineUsers).push({
        name: user,
        online: this.users[user].online,
      });
    }

    return [...onlineUsers, ...offlineUsers];
  }

  public objKeys(obj: object) {
    return Object.keys(obj || {});
  }

  ngOnInit(): void {}
}
