import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentRoomService } from '../../services/current-room/current-room.service';
import {
  ICurrentRoom,
  IDiceCreated,
  ITextCreated,
} from './current-room.interface';
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
import { ElementService } from '../../services/element/element.service';
import { TextareaService } from '../../services/textarea/textarea.service';

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
    private mobile: MobileService,
    private elementService: ElementService,
    private textareaService: TextareaService
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
        for (const key in this.currentRoom.elements) {
          // this.currentRoom.elements[key].contextmenu =
          //   this.elementService.getContextmenu(key);
          this.currentRoom.elements[key].contextmenu =
            this.currentRoom.elements[key]?.type === 'dice' || key === 'dice'
              ? this.diceService.getContextmenuForDice(
                  this.currentRoom.elements[key] as IDiceCreated
                )
              : this.textareaService.getContextmenuForText(
                  this.currentRoom.elements[key] as ITextCreated
                );
          this.currentRoomService.setCurrentRoomValue(this.currentRoom);
        }
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
          // contextmenu: this.elementService.getContextmenu(
          //   message.data.element_id
          // ),
          contextmenu:
            this.currentRoom.elements[message.data.element_id]?.type ===
              'dice' || message.data?.type === 'dice'
              ? this.diceService.getContextmenuForDice(
                  message.data as IDiceCreated
                )
              : this.textareaService.getContextmenuForText(
                  message.data as ITextCreated
                ),
        };
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
