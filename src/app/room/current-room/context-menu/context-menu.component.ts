import { Component, Input, OnInit } from '@angular/core';
import { ICreatedItem } from '../current-room.interface';

@Component({
  selector: 'app-contex-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @Input() item: ICreatedItem = {} as ICreatedItem;

  constructor() {}

  ngOnInit(): void {}
}
