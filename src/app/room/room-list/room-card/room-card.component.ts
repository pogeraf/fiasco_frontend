import { Component, Input, OnInit } from '@angular/core';
import { IRoomCardStyleCss, IRoomCardStyles } from '../room-list.interface';
import { StyleService } from '../../../services/color/style.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() maxUsers: number = 0;
  @Input() usersInRoom: number = 0;
  @Input() styles: IRoomCardStyles = {} as IRoomCardStyles;

  public get cardStyle(): IRoomCardStyleCss {
    return {
      background: this.styleService.colorArrayToStr(this.styles.bg?.color),
      backgroundImage: this.styleService.colorArrayToStr(this.styles.bg?.color),
      border: this.styleService.borderObjToStr(this.styles.border),
      borderRadius: this.styleService.sizeToStr(this.styles.border?.radius),
      fontSize: this.styleService.sizeToStr(this.styles.font?.size),
      color: this.styleService.colorArrayToStr(this.styles.font?.color),
    };
  }

  constructor(public styleService: StyleService) {}

  ngOnInit(): void {}
}
