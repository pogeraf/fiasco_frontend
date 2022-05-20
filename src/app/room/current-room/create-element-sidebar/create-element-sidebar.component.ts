import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDice, ISit, IText, TItemTypes } from '../current-room.interface';
import { StyleService } from '../../../services/color/style.service';

@Component({
  selector: 'app-create-element-sidebar',
  templateUrl: './create-element-sidebar.component.html',
  styleUrls: ['./create-element-sidebar.component.scss'],
})
export class CreateElementSidebarComponent implements OnInit {
  @Output() createElement = new EventEmitter<IDice | ISit | IText>();
  elementTypes: Array<TItemTypes> = ['dice', 'text', 'sit'];
  isCreating: TItemTypes | undefined = undefined;

  constructor(public styleService: StyleService) {}

  ngOnInit(): void {}

  startCreating(type: TItemTypes) {
    this.isCreating = this.isCreating === type ? undefined : type;
  }

  createElementEvent(type: TItemTypes, data: IDice | ISit | IText) {
    this.createElement.emit(data);
  }
}
