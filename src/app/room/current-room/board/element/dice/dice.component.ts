import { Component, OnInit } from '@angular/core';
import { ElementDirective } from '../element.directive';

interface IDiceStyle {
  left: string;
  top: string;

  background: string;

  border: string;
  borderRadius: string;

  fontSize: string;
  color: string;
}

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent extends ElementDirective implements OnInit {
  public get diceStyle(): IDiceStyle {
    const style = this.element.styles;

    return {
      left: this.element.coordinates[0] + 'px',
      top: this.element.coordinates[1] + 'px',
      background: this.styleService.colorArrayToStr(style.bg?.color),
      border: this.styleService.borderObjToStr(style.border),
      borderRadius: this.styleService.sizeToStr(style.border?.radius),
      fontSize: this.styleService.sizeToStr(style.font?.size),
      color: this.styleService.colorArrayToStr(style.font?.color),
    };
  }

  ngOnInit(): void {}

  // public abstractArrayByLength(l: number): Array<undefined> {
  //   return new Array<undefined>(l);
  // }
}
