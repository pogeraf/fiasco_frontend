import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISit, TItemTypes } from '../../current-room.interface';

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

  createElementEvent(type: TItemTypes, data: ISit) {
    this.createElement.emit(data);
  }
}
