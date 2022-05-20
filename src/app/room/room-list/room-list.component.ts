import { Component, OnInit } from '@angular/core';
import { TRoomList } from './room-list.interface';
import { RoomListService } from '../../services/room-list/room-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  public roomList$: Observable<TRoomList> = new Observable();
  public roomList: TRoomList = [];

  constructor(private roomListService: RoomListService) {
    this.roomList$ = this.roomListService.roomList$;
  }

  ngOnInit(): void {
    this.roomList$.subscribe((data: TRoomList) => {
      this.roomList = data;
    });
  }
}
