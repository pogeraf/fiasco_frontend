import {
  ICreatedElement,
  IPlayersInRoom,
  TCoordinates,
  TItemTypes,
} from './room/current-room/current-room.interface';
import { IStyles } from './room/room.interface';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type IHandlers = {
  [id in EventTypes]: CallableFunction;
};

export enum EventTypes {
  INITIAL = '$initial',
  PLAYER_CONNECTED = '$player-connected',
  PLAYER_DISCONNECT = '$player-disconnected',
  GET_STATISTICS = 'get-statistics',
  MOVED = 'moved',
  ADD_DICE = 'addDice',
  UPSERT_ELEMENT = 'upsert-element',
  DELETE_ELEMENT = 'delete-element',
}

export interface IEventMessage<TObj extends DataMessage> {
  event: PropType<TObj, 'event'>;
  data: PropType<TObj, 'data'>;
  sender: string;
}

export interface DataMessage {
  event: string;
  data: object | null;
}

export interface IInitialEvent extends DataMessage {
  event: EventTypes.INITIAL;
  data: {
    players: { [id: string]: IPlayersInRoom };
    elements: { [id: string]: ICreatedElement };
  };
}

export interface IUpsertElementEvent extends DataMessage {
  event: EventTypes.UPSERT_ELEMENT;
  data: {
    room: string;
    player: string;
    coordinates: TCoordinates;
    element_id: string;
    styles: IStyles;
    type: TItemTypes;
    value: string;
    d?: number;
  };
}

export interface IPlayerConnectedEvent extends DataMessage {
  event: EventTypes.PLAYER_CONNECTED;
  data: null;
}

export interface IPlayerDisconnectedEvent extends DataMessage {
  event: EventTypes.PLAYER_DISCONNECT;
  data: null;
}
