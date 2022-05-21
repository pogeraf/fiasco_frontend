import { Component, OnInit } from '@angular/core';
import { ElementDirective } from '../element.directive';

@Component({
  selector: 'app-card-with-text',
  templateUrl: './card-with-text.component.html',
  styleUrls: ['./card-with-text.component.scss'],
})
export class CardWithTextComponent extends ElementDirective implements OnInit {
  public get blockStyle() {
    return {
      left: this.element.coordinates[0] + 'px',
      top: this.element.coordinates[1] + 'px',
    };
  }

  ngOnInit(): void {}
}
