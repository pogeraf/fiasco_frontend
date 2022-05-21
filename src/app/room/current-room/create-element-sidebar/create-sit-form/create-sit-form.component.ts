import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISit, TElementTypes } from '../../current-room.interface';

@Component({
  selector: 'app-create-sit-form',
  templateUrl: './create-sit-form.component.html',
  styleUrls: ['./create-sit-form.component.scss'],
})
export class CreateSitFormComponent implements OnInit {
  @Input() isCreating: boolean;
  @Output() createElement = new EventEmitter<ISit>();

  constructor() {}

  ngOnInit(): void {}

  createElementEvent(type: TElementTypes, data: ISit) {
    this.createElement.emit(data);
  }
}
