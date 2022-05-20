import { Component, Input, OnInit } from '@angular/core';
import { IDiceCreated } from '../current-room.interface';
import { StyleService } from '../../../services/color/style.service';

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
export class DiceComponent implements OnInit {
  @Input() dice: IDiceCreated;

  public get diceStyle(): IDiceStyle {
    const style = this.dice.styles;
    console.log(this.dice.coordinates);
    console.log(this.dice);
    return {
      left: this.dice.coordinates[0] + 'px',
      top: this.dice.coordinates[1] + 'px',
      background: this.styleService.colorArrayToStr(style.bg?.color),
      border: this.styleService.borderObjToStr(style.border),
      borderRadius: this.styleService.sizeToStr(style.border?.radius),
      fontSize: this.styleService.sizeToStr(style.font?.size),
      color: this.styleService.colorArrayToStr(style.font?.color),
    };
  }

  constructor(private styleService: StyleService) {}

  ngOnInit(): void {}

  // public abstractArrayByLength(l: number): Array<undefined> {
  //   return new Array<undefined>(l);
  // }
}
