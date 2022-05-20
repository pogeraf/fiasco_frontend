import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRoomComponent } from './current-room.component';
import { RouterModule } from '@angular/router';
import { DiceComponent } from './dice/dice.component';
import { CreateElementSidebarComponent } from './create-element-sidebar/create-element-sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrentRoomComponent,
    DiceComponent,
    CreateElementSidebarComponent,
    UsersListComponent,
    ContextMenuComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class CurrentRoomModule {}
