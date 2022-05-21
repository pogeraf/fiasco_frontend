import { Injectable } from '@angular/core';
import {
  IText,
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

  public defaultTextElement(opt: IDefaultTextElementOpt): IText {
    return {
      type: 'text',
      value: opt.text,
      coordinates: opt.coordinates,
      styles: this.elementService.elementStyle('white'),
    };
  }
}
