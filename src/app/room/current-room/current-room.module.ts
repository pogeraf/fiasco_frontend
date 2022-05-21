import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRoomComponent } from './current-room.component';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateElementSidebarComponent } from './create-element-sidebar/create-element-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDiceFormComponent } from './create-element-sidebar/create-dice-form/create-dice-form.component';
import { CreateTextFormComponent } from './create-element-sidebar/create-text-form/create-text-form.component';
import { CreateSitFormComponent } from './create-element-sidebar/create-sit-form/create-sit-form.component';
import { BoardModule } from './board/board.module';

@NgModule({
  declarations: [
    CurrentRoomComponent,
    CreateElementSidebarComponent,
    UsersListComponent,
    CreateDiceFormComponent,
    CreateTextFormComponent,
    CreateSitFormComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BoardModule],
})
export class CurrentRoomModule {}
