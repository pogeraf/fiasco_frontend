import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentRoomService } from '../../services/current-room/current-room.service';
import {
  ICurrentRoom,
  IDice,
  ISit,
  IText,
  TCoordinates,
} from './current-room.interface';
import { ApiService } from '../../services/api/api.service';
import { DiceService } from '../../services/dice/dice.service';
import { UserService } from '../../services/user/user.service';
import { MobileService } from '../../services/mobile/mobile.service';
import { Observable } from 'rxjs';
import {
  EventTypes,
  IEventMessage,
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
    items: {},
  } as ICurrentRoom;
  public coordinates: Array<number> = [100, 100];

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
      this.currentRoom.name = this.name;
      this.initHandler();
    }
  }

  ngOnDestroy(): void {
    this.api.disconnect();
  }

  private initHandler() {
    this.api.connect(this.name, this.userName);

    this.api.addEventHandler(EventTypes.INITIAL, (message: any) => {
      this.currentRoom.users = message.data.players;
      this.currentRoom.items = message.data.elements;
    });

    this.api.addEventHandler(EventTypes.PLAYER_CONNECTED, (message: any) => {
      if (this.currentRoom.users[message.sender]) {
        this.currentRoom.users[message.sender].online = true;
      } else {
        this.currentRoom.users[message.sender] = {
          online: true,
        };
      }
    });

    this.api.addEventHandler(EventTypes.PLAYER_DISCONNECT, (message: any) => {
      this.currentRoom.users[message.sender].online = false;
    });

    this.api.addEventHandler(EventTypes.GET_STATISTICS, (message: any) => {
      console.log(message);
    });

    this.api.addEventHandler(
      EventTypes.UPSERT_ELEMENT,
      (message: IEventMessage<IUpsertElementEvent>) => {
        this.currentRoom.items[message.data.element_id] = message.data;
      }
    );

    this.api.addEventHandler(EventTypes.DELETE_ELEMENT, (message: any) => {
      delete this.currentRoom.items[message.data.element_id];
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

  public addElement(element: IDice | ISit | IText) {
    this.api.sendMessage(EventTypes.UPSERT_ELEMENT, element);
    this.updateCurrentRoom();
  }

  public deleteElement(id: string, e: MouseEvent) {
    e.preventDefault();
    setTimeout(() => (this.isMoving = ''), 0);
    this.api.sendMessage(EventTypes.DELETE_ELEMENT, { element_id: id });
  }

  moveHandler = (e: MouseEvent) => this.moveElement(e);
  moveEndHandler = () => this.endMovingElementById();

  private moveElement(e: MouseEvent) {
    this.currentRoom.items[this.isMoving].coordinates = [
      e.clientX - 10,
      e.clientY - 10,
    ];
  }

  public startMovingElementById(id: string) {
    this.isMoving = id;
    document.addEventListener('mousemove', this.moveHandler);
    document.addEventListener('mouseup', this.moveEndHandler);
  }

  public endMovingElementById() {
    this.api.sendMessage(
      EventTypes.UPSERT_ELEMENT,
      this.diceService.updateDiceById(this.currentRoom.items[this.isMoving])
    );
    document.removeEventListener('mousemove', this.moveHandler);
    document.removeEventListener('mouseup', this.moveEndHandler);
    this.isMoving = '';
  }

  public coordinatesToStyle(coordinates: TCoordinates): {
    left: string;
    top: string;
  } {
    return {
      left: coordinates[0] + 'px',
      top: coordinates[1] + 'px',
    };
  }

  public objKeys(obj: object) {
    return Object.keys(obj || {});
  }

  private updateCurrentRoom(): void {
    this.currentRoomService.updateRoom(this.currentRoom);
  }
}
