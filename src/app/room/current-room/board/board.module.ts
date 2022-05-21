import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ElementComponent } from './element/element.component';
import { DiceComponent } from './element/dice/dice.component';
import { CardWithTextComponent } from './element/card-with-text/card-with-text.component';
import { ContextMenuComponent } from './element/context-menu/context-menu.component';
import { ElementDirective } from './element/element.directive';

@NgModule({
  declarations: [
    BoardComponent,
    ElementComponent,
    DiceComponent,
    CardWithTextComponent,
    ContextMenuComponent,
    ElementDirective,
  ],
  exports: [BoardComponent],
  imports: [CommonModule],
})
export class BoardModule {}
