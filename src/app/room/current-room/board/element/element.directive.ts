import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ICreatedElement } from '../../current-room.interface';
import { StyleService } from '../../../../services/color/style.service';
import { UserService } from '../../../../services/user/user.service';
import { TextareaService } from '../../../../services/textarea/textarea.service';

@Directive({
  selector: '[appCurrentElement]',
})
export class ElementDirective {
  @Input() element: ICreatedElement;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public styleService: StyleService,
    public userService: UserService,
    public textareaService: TextareaService
  ) {}
}
