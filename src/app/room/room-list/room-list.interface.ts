import { IBg, IDefaultStyle, IRoom, IStyles } from '../room.interface';

export type TRoomList = Array<IRoomCard>;

export interface IRoomCardStyleCss {
  background: string;
  backgroundImage: string;

  border: string;
  borderRadius: string;

  color: string;
  fontSize: string;
}

export interface IName extends IDefaultStyle {
  bg: IBg;
}

export interface IRoomCardStyles extends IStyles {
  name: IName;
}

export interface IRoomCard extends IRoom {
  styles: IRoomCardStyles;
}
