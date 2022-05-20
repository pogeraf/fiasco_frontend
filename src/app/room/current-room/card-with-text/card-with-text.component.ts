import { Component, Input, OnInit } from '@angular/core';
import { IDiceCreated } from '../current-room.interface';

@Component({
  selector: 'app-card-with-text',
  templateUrl: './card-with-text.component.html',
  styleUrls: ['./card-with-text.component.scss'],
})
export class CardWithTextComponent implements OnInit {
  @Input() textBlock: IDiceCreated;

  public get blockStyle() {
    return {
      left: this.textBlock.coordinates[0] + 'px',
      top: this.textBlock.coordinates[1] + 'px',
    };
  }

  constructor() {}

  ngOnInit(): void {}
}
