import { Injectable } from '@angular/core';
import {
  IContextMenuItem,
  IText,
  ITextCreated,
  TCoordinates,
} from '../../room/current-room/current-room.interface';
import { ElementService } from '../element/element.service';
import { EventTypes } from '../../global.interface';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';

interface IDefaultTextElementOpt {
  text: string;
  coordinates: TCoordinates;
  type?: 'white' | 'black' | 'random';
  styles?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TextareaService {
  constructor(
    protected elementService: ElementService,
    private api: ApiService,
    protected userService: UserService
  ) {}

  getContextmenuForText(elem: ITextCreated): Array<IContextMenuItem> {
    return [
      {
        name: elem.editing?.isEditing ? 'Decline editing' : 'Edit',
        callback: () => {
          this.toggleEditingTextarea(
            elem.element_id,
            !elem?.editing?.isEditing
          );
        },
      },
      ...this.elementService.getContextmenu(elem.element_id),
    ];
  }

  public toggleEditingTextarea(element_id: string, isEdit: boolean): void {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, {
      element_id,
      editing: {
        isEditing: isEdit,
        user: this.userService.userName,
      },
    });
  }

  public updateTextareaValue(element_id: string, data: string): void {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, {
      element_id,
      value: data,
      editing: {},
    });
  }

  public createTextElement(opt: IDefaultTextElementOpt): IText {
    console.log(opt.type);
    return {
      type: 'text',
      value: opt.text,
      coordinates: opt.coordinates,
      styles: this.elementService.elementStyle(opt?.type || 'white'),
    };
  }
}
