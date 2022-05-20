import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRoomComponent } from './current-room.component';
import { RouterModule } from '@angular/router';
import { DiceComponent } from './dice/dice.component';
import { CreateElementSidebarComponent } from './create-element-sidebar/create-element-sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDiceFormComponent } from './create-element-sidebar/create-dice-form/create-dice-form.component';
import { CreateTextFormComponent } from './create-element-sidebar/create-text-form/create-text-form.component';
import { CreateSitFormComponent } from './create-element-sidebar/create-sit-form/create-sit-form.component';
import { CardWithTextComponent } from './card-with-text/card-with-text.component';

@NgModule({
  declarations: [
    CurrentRoomComponent,
    DiceComponent,
    CreateElementSidebarComponent,
    UsersListComponent,
    ContextMenuComponent,
    CreateDiceFormComponent,
    CreateTextFormComponent,
    CreateSitFormComponent,
    CardWithTextComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class CurrentRoomModule {}
