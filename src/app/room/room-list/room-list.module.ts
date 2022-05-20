import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room-list.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { RoomCardCreateComponent } from './room-card-create/room-card-create.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomListComponent, RoomCardComponent, RoomCardCreateComponent],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RoomListModule {}
