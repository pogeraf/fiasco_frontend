import { Injectable } from '@angular/core';
import {
  IDice,
  IDiceCreated,
  TCoordinates,
  TItemTypes,
} from '../../room/current-room/current-room.interface';
import { IStyles } from '../../room/room.interface';
import { StyleService } from '../color/style.service';

interface IDiceConstruct {
  type?: TItemTypes;
  d?: number;
  value?: number;
  coordinates?: TCoordinates;
  styles?: IStyles;
}

interface IDiceConstructWithId extends IDiceConstruct {
  element_id: string;
  room: string;
  player: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  constructor(private styleService: StyleService) {}

  generateRandoValueForDice(d: number | undefined): number {
    return Math.round(Math.random() * (d ? d++ : 7));
  }

  public prepareDiceToBack(opt?: IDiceConstruct): IDice {
    return {
      type: opt?.type || 'dice',
      coordinates: opt?.coordinates || [0, 0],
      d: opt?.d || 6,
      value: opt?.value || this.generateRandoValueForDice(opt?.d),
      styles: {
        bg: {
          color: opt?.styles?.bg?.color || this.styleService.generateRgb(),
          url: opt?.styles?.bg?.url,
        },
        border: {
          color: opt?.styles?.border?.color || this.styleService.generateRgb(),
          size: opt?.styles?.border?.size || { value: 1, unit: 'px' },
          radius: opt?.styles?.border?.radius || { value: 0, unit: 'px' },
          type: opt?.styles?.border?.type || 'solid',
        },
        font: {
          color: opt?.styles?.font?.color || this.styleService.generateRgb(),
          size: opt?.styles?.font?.size || { value: 15, unit: 'px' },
        },
      },
    };
  }

  public prepareDiceTemplate(
    type: 'white' | 'black' | 'random' | 'custom'
  ): IDice {
    const dice = this.prepareDiceToBack();
    dice.styles.border.color =
      type === 'white'
        ? this.styleService.blackColor
        : type === 'black'
        ? this.styleService.opacityColor
        : dice.styles.border.color;
    dice.styles.font.color =
      type === 'white'
        ? this.styleService.blackColor
        : type === 'black'
        ? this.styleService.whiteColor
        : dice.styles.font.color;
    dice.styles.bg.color =
      type === 'white'
        ? this.styleService.whiteColor
        : type === 'black'
        ? this.styleService.blackColor
        : dice.styles.bg.color;
    return dice;
  }

  public updateDiceById(optWithId: IDiceConstructWithId): IDiceCreated {
    return {
      ...this.prepareDiceToBack(optWithId),
      element_id: optWithId.element_id,
      room: optWithId.room,
      player: optWithId.player,
    };
  }
}
