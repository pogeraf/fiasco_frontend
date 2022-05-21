import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICreatedElement } from '../current-room.interface';
import { CurrentRoomService } from '../../../services/current-room/current-room.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @ViewChild('board') boardElement: ElementRef;
  elementsInRoom: { [id: string]: ICreatedElement };
  keysElementsInRoom: Array<string>;

  constructor(private currentRoomService: CurrentRoomService) {}

  ngOnInit(): void {
    this.currentRoomService.currentRoom$.subscribe((data) => {
      this.elementsInRoom = data.elements;
      this.keysElementsInRoom = Object.keys(data.elements || {});
    });
  }
}
