import { Injectable } from '@angular/core';
import {
  IText,
  TCoordinates,
} from '../../room/current-room/current-room.interface';

interface IDefaultTextElementOpt {
  text: string;
  coordinates: TCoordinates;
  styles?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TextareaService {
  constructor() {}

  public defaultTextElement(opt: IDefaultTextElementOpt): IText {
    return {
      type: 'text',
      value: opt.text,
      coordinates: opt.coordinates,
    };
  }
}
