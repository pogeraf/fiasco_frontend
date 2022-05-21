import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ICreatedElement } from '../../current-room.interface';
import { StyleService } from '../../../../services/color/style.service';

@Directive({
  selector: '[appCurrentElement]',
})
export class ElementDirective {
  @Input() element: ICreatedElement;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public styleService: StyleService
  ) {}
}
