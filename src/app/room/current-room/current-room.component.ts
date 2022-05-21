import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentRoomService } from '../../services/current-room/current-room.service';
import { ICurrentRoom } from './current-room.interface';
import { ApiService } from '../../services/api/api.service';
import { DiceService } from '../../services/dice/dice.service';
import { UserService } from '../../services/user/user.service';
import { MobileService } from '../../services/mobile/mobile.service';
import { Observable } from 'rxjs';
import {
  EventTypes,
  IEventMessage,
  IInitialEvent,
  IPlayerConnectedEvent,
  IPlayerDisconnectedEvent,
  IUpsertElementEvent,
} from '../../global.interface';

@Component({
  selector: 'app-room',
  templateUrl: './current-room.component.html',
  styleUrls: ['./current-room.component.scss'],
})
export class CurrentRoomComponent implements OnInit, OnDestroy {
  // @ViewChild(adDirective) elements;
  public name: string = '';
  public currentRoom: ICurrentRoom = {
    elements: {},
    players: {},
  };
  isMoving: string = '';

  isMobile$: Observable<boolean> = new Observable<boolean>();

  public get userName(): string {
    return this.userService.userName;
  }

  public get isRoom(): boolean {
    return this.name !== '';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currentRoomService: CurrentRoomService,
    private api: ApiService,
    private diceService: DiceService,
    private userService: UserService,
    private mobile: MobileService
  ) {
    this.isMobile$ = mobile.isMobile$;
    activatedRoute.params.subscribe((params) => {
      this.name = params['name'];
    });
  }

  ngOnInit(): void {
    if (!this.redirectOnLoginPage()) {
      this.currentRoomService.currentRoom$.subscribe((data) => {
        this.currentRoom = data;
      });
      this.initHandler();
    }
  }

  ngOnDestroy(): void {
    this.api.disconnect();
  }

  private initHandler() {
    this.api.connect(this.name, this.userName);

    this.api.addEventHandler(
      EventTypes.INITIAL,
      (message: IEventMessage<IInitialEvent>) => {
        this.currentRoomService.setCurrentRoomValue(message.data);
      }
    );

    this.api.addEventHandler(
      EventTypes.PLAYER_CONNECTED,
      (message: IEventMessage<IPlayerConnectedEvent>) => {
        if (this.currentRoom.players[message.sender]) {
          this.currentRoom.players[message.sender].online = true;
        } else {
          this.currentRoom.players[message.sender] = {
            online: true,
          };
        }
        this.updateRoomValue();
      }
    );

    this.api.addEventHandler(
      EventTypes.PLAYER_DISCONNECT,
      (message: IEventMessage<IPlayerDisconnectedEvent>) => {
        this.currentRoom.players[message.sender].online = false;
        this.updateRoomValue();
      }
    );

    this.api.addEventHandler(EventTypes.GET_STATISTICS, (message: any) => {
      console.log(message);
    });

    this.api.addEventHandler(
      EventTypes.UPSERT_ELEMENT,
      (message: IEventMessage<IUpsertElementEvent>) => {
        this.currentRoom.elements[message.data.element_id] = {
          ...this.currentRoom.elements[message.data.element_id],
          ...message.data,
        };
        console.log(this.currentRoom.elements[message.data.element_id]);
        this.updateRoomValue();
      }
    );

    this.api.addEventHandler(EventTypes.DELETE_ELEMENT, (message: any) => {
      delete this.currentRoom.elements[message.data.element_id];
      this.updateRoomValue();
    });
  }

  private redirectOnLoginPage(): boolean {
    if (!this.userName) {
      this.router.navigate([
        '/login/',
        { redirectTo: `/room/id/${this.name}` },
      ]);
      return true;
    }
    return false;
  }

  private updateRoomValue() {
    this.currentRoomService.setCurrentRoomValue(this.currentRoom);
  }
}
