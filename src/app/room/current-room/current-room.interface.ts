import { IStyles } from '../room.interface';

export type TElementTypes = 'dice' | 'sit' | 'text';

export type TCurrentRoom = Array<ICurrentRoom>;

export type TCoordinates = [number, number];

export interface IPlayersInRoom {
  online: boolean;
}

export interface IElement {
  type: TElementTypes;
  coordinates: TCoordinates;
  styles: IStyles;
  value: string;
}

export interface IDice extends IElement {
  d: number;
}

export interface IText extends IElement {}

export interface ICreatedElement extends IElement {
  element_id: string;
  player: string;
  room: string;
}

export interface IDiceCreated extends IDice, ICreatedElement {}
export interface ITextCreated extends IText, ICreatedElement {}

export interface ISit extends IElement {}

export interface ICurrentRoom {
  elements: { [id: string]: ICreatedElement };
  players: { [id: string]: IPlayersInRoom };
}
