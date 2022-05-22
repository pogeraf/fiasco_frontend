import { Injectable } from '@angular/core';
import {
  IContextMenuItem,
  IText,
  ITextCreated,
  TCoordinates,
} from '../../room/current-room/current-room.interface';
import { ElementService } from '../element/element.service';

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
  constructor(protected elementService: ElementService) {}

  getContextmenuForText(elem: ITextCreated): Array<IContextMenuItem> {
    return [
      {
        name: 'Edit',
        callback: () => {
          this.elementService.updateElementValues(elem.element_id, '');
        },
      },
      ...this.elementService.getContextmenu(elem.element_id),
    ];
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
