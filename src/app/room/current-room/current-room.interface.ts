import { IRoom, IStyles } from '../room.interface';

export type TItemTypes = 'dice' | 'sit' | 'text';

export type TCurrentRoom = Array<ICurrentRoom>;

export type TCoordinates = [number, number];

export interface IUserInRoom {
  online: boolean;
}

export interface IItem {
  type: TItemTypes;
  coordinates: TCoordinates;
}

export interface ICreatedItem extends IItem {
  element_id: string;
  player: string;
  room: string;
}

export interface IDice extends IItem {
  d: number;
  styles: IStyles;
  value: number;
}

export interface IDiceCreated extends IDice, ICreatedItem {}

export interface ISit extends IItem {}
export interface IText extends IItem {
  value: string;
}

export interface ICurrentRoom extends IRoom {
  users: { [id: string]: IUserInRoom };
  // TODO: HERE
  items: { [id: string]: any };
}
