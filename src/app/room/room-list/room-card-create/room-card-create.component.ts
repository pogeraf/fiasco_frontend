import { Component, OnInit } from '@angular/core';
import { StyleService } from '../../../services/color/style.service';
import { IRoomCard } from '../room-list.interface';
import { RoomListService } from '../../../services/room-list/room-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card-create',
  templateUrl: './room-card-create.component.html',
  styleUrls: ['./room-card-create.component.scss'],
})
export class RoomCardCreateComponent implements OnInit {
  public isCreating: boolean = false;
  public devMod: boolean = false;
  public newCard: IRoomCard = {} as IRoomCard;

  constructor(
    public styleService: StyleService,
    private roomListService: RoomListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initNewCard();
  }

  private initNewCard(): void {
    this.newCard = this.roomListService.defaultValueCard();
  }

  public generate(): void {
    const style = this.newCard.styles;
    style.bg.color = this.styleService.generateRgba();
    style.border.color = this.styleService.generateRgba();
    style.font.color = this.styleService.generateRgb();
    style.border.radius.value = Math.floor(Math.random() * 50);
    style.border.size.value = Math.floor(Math.random() * 3 + 1);
    style.name.bg.color = this.styleService.generateRgb();
  }
  public cancel(): void {
    this.initNewCard();
    this.isCreating = false;
  }
  public create(): void {
    if (!this.isValid) {
      return;
    }

    this.router.navigate([`/room/id/${this.newCard.name}`]);
    this.roomListService.addRoomCard(JSON.parse(JSON.stringify(this.newCard)));
    this.initNewCard();
    this.isCreating = false;
  }

  private get isValid(): boolean {
    if (this.devMod) {
      return true;
    } else {
      this.newCard.maxUsers = Number(this.newCard.maxUsers);
      return Boolean(this.newCard.maxUsers && this.newCard.name);
    }
  }
}
