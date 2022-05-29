import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementComponent } from '../element.component';
import {
  IContextMenuItem,
  TCoordinates,
} from '../../../current-room.interface';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @Input() items: Array<IContextMenuItem> | undefined;
  @Input() position: ['left' | 'right', 'top' | 'bottom'];
  @Input() mouseCoordinates: TCoordinates;

  @Output() close = new EventEmitter();

  public get styles() {
    const left =
      (this.position[0] === 'left'
        ? this.mouseCoordinates[0] - ElementComponent.contextmenuSize[0] - 10
        : this.mouseCoordinates[0] + 10) + 'px';
    const top =
      (this.position[1] === 'top'
        ? this.mouseCoordinates[1] - ElementComponent.contextmenuSize[1]
        : this.mouseCoordinates[1]) + 'px';
    return {
      width: `${ElementComponent.contextmenuSize[0]}px`,
      height: `${ElementComponent.contextmenuSize[1]}px`,

      top,
      left,
    };
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.mouseCoordinates);
  }
}
