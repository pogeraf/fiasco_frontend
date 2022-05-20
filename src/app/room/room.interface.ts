export type TColor = [number, number, number, number];

export type TBorder =
  | 'solid'
  | 'none'
  | 'dotted'
  | 'dashed'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'hidden';

export type TUnit = 'px' | '%' | 'em' | 'pt' | 'rem';

export interface IRoom {
  name: string; // Unique key
  maxUsers: number;
  usersInRoom: number;
}

export interface IStyles {
  bg: IBg;
  border: IBorder;
  font: IFont;
}

export interface ISize {
  value: number;
  unit: TUnit;
}

export interface IBg {
  color: TColor;
  url?: string;
}

export interface IDefaultStyle {
  size: ISize;
  color: TColor;
}

export interface IFont extends IDefaultStyle {}

export interface IBorder extends IDefaultStyle {
  type: TBorder;
  radius: ISize;
}

export interface IName extends IDefaultStyle {
  bg: IBg;
}
