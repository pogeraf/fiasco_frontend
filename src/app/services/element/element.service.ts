import { Injectable } from '@angular/core';
import {
  IDice,
  ISit,
  IText,
  TCoordinates,
} from '../../room/current-room/current-room.interface';
import { EventTypes } from '../../global.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentRoomService } from '../current-room/current-room.service';
import { ApiService } from '../api/api.service';
import { IStyles } from '../../room/room.interface';
import { StyleService } from '../color/style.service';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currentRoomService: CurrentRoomService,
    private api: ApiService,
    private styleService: StyleService
  ) {}

  public addElement(element: IDice | ISit | IText) {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, element);
  }

  public deleteElement(id: string) {
    this.api.sendMessage(EventTypes.DELETE_ELEMENT, { element_id: id });
  }

  public updateElementCoordinates(
    element_id: string,
    coordinates: TCoordinates
  ): void {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, {
      element_id,
      coordinates,
    });
  }

  public updateElementValues(element_id: string, value: TCoordinates): void {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, {
      element_id,
      value,
    });
  }

  public elementStyle(type: 'white' | 'black' | 'random'): IStyles {
    const style: IStyles = {
      bg: {
        color: this.styleService.whiteColor,
        url: '',
      },
      border: {
        color: this.styleService.blackColor,
        size: {
          value: 1,
          unit: 'px',
        },
        radius: { value: 0, unit: 'px' },
        type: 'solid',
      },
      font: {
        color: this.styleService.blackColor,
        size: {
          value: 15,
          unit: 'px',
        },
      },
    };
    if (type === 'white') return style;
    style.bg.color =
      type === 'black'
        ? this.styleService.blackColor
        : this.styleService.generateRgba();

    style.border.color =
      type === 'black'
        ? this.styleService.opacityColor
        : this.styleService.generateRgba();

    style.font.color =
      type === 'black'
        ? this.styleService.whiteColor
        : this.styleService.generateRgba();
    return style;
  }
}
