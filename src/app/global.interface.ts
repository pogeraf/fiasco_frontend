import {
  TCoordinates,
  TItemTypes,
} from './room/current-room/current-room.interface';

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
  data: object;
}

export interface IUpsertElementEvent extends DataMessage {
  event: EventTypes.UPSERT_ELEMENT;
  data: {
    room: string;
    player: string;
    coordinates: TCoordinates;
    element_id: string;
    styles: object;
    type: TItemTypes;
    value?: number;
    d?: number;
  };
}
