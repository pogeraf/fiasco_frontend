import { Component, OnInit } from '@angular/core';
import { ElementDirective } from '../element.directive';

@Component({
  selector: 'app-card-with-text',
  templateUrl: './card-with-text.component.html',
  styleUrls: ['./card-with-text.component.scss'],
})
export class CardWithTextComponent extends ElementDirective implements OnInit {
  public get textareaStyle() {
    const style = this.element.styles;

    return {
      background: this.styleService.colorArrayToStr(style.bg?.color),
      border: this.styleService.borderObjToStr(style.border),
      borderRadius: this.styleService.sizeToStr(style.border?.radius),
      fontSize: this.styleService.sizeToStr(style.font?.size),
      color: this.styleService.colorArrayToStr(style.font?.color),
    };
  }

  ngOnInit(): void {}
}
