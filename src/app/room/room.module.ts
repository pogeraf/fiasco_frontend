import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RouterModule } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';
import { CurrentRoomModule } from './current-room/current-room.module';
import { LoginInRoomComponent } from './login-in-room/login-in-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomComponent, LoginInRoomComponent],
  imports: [
    CommonModule,
    RouterModule,
    RoomListModule,
    CurrentRoomModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RoomModule {}
