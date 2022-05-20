import { Injectable } from '@angular/core';
import { IBg, IBorder, ISize, TColor } from '../../room/room.interface';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  get whiteColor(): TColor {
    return [255, 255, 255, 1];
  }
  get blackColor(): TColor {
    return [0, 0, 0, 1];
  }
  get opacityColor(): TColor {
    return [0, 0, 0, 0];
  }

  constructor() {}

  public generateRgb(): TColor {
    return [
      this.subpixelGenerate(),
      this.subpixelGenerate(),
      this.subpixelGenerate(),
      1,
    ];
  }

  public generateRgba(): TColor {
    return [
      this.subpixelGenerate(),
      this.subpixelGenerate(),
      this.subpixelGenerate(),
      Number(Math.random().toFixed(1)),
    ];
  }

  public subpixelGenerate(): number {
    return Math.round(Math.random() * 256);
  }

  public colorArrayToStr(rgba: TColor): string {
    return `rgba(${rgba?.[0] || 0}, ${rgba?.[1] || 0}, ${rgba?.[2] || 0}, ${
      rgba?.[3] || 0
    })`;
  }

  public sizeToStr(size: ISize): string {
    return size?.value ? size?.value + size?.unit : String(size?.value);
  }

  public borderObjToStr(border: IBorder): string {
    return `${this.sizeToStr(border?.size)} ${
      border?.type
    } ${this.colorArrayToStr(border?.color)}`;
  }

  public bgUrlToStr(bg: IBg): string {
    return bg?.url ? "url('" + bg?.url + "')" : '';
  }

  public reverseColor(rgba: TColor): string {
    const value = () => this.subpixelGenerate() * 0.5;
    const tmpColor: TColor = [
      rgba[0] > 150 ? value() : 255 - value(),
      rgba[1] > 150 ? value() : 255 - value(),
      rgba[2] > 150 ? value() : 255 - value(),
      1,
    ];
    return this.colorArrayToStr(tmpColor);
  }
}
