import { Component, Input, OnInit } from '@angular/core';
import { ElementDirective } from '../element.directive';
import { ITextCreated } from '../../../current-room.interface';

@Component({
  selector: 'app-card-with-text',
  templateUrl: './card-with-text.component.html',
  styleUrls: ['./card-with-text.component.scss'],
})
export class CardWithTextComponent extends ElementDirective implements OnInit {
  @Input() override element: ITextCreated;

  public get isEditing(): boolean {
    return this.element?.editing?.isEditing;
  }

  public get isEditingPlayer(): boolean {
    return this.element?.editing?.user === this.userService.userName;
  }

  public get textareaStyle() {
    const style = this.element.styles;
    return {
      background: this.styleService.colorArrayToStr(style.bg?.color),
      borderRadius: this.styleService.sizeToStr(style.border?.radius),
      fontSize: this.styleService.sizeToStr(style.font?.size),
      color: this.styleService.colorArrayToStr(style.font?.color),
    };
  }

  textValue: string;

  ngOnInit(): void {
    this.textValue = this.element.value;
  }

  save(): void {
    this.textareaService.updateTextareaValue(
      this.element.element_id,
      this.textValue
    );
  }

  cancel(): void {
    this.textareaService.toggleEditingTextarea(this.element.element_id, false);
  }

  get valueChanged(): boolean {
    return this.textValue !== this.element.value;
  }
}
