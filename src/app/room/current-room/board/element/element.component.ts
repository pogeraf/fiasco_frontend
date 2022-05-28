import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementService } from '../../../../services/element/element.service';
import { ElementDirective } from './element.directive';
import { ICreatedElement, TCoordinates } from '../../current-room.interface';
import { DiceComponent } from './dice/dice.component';
import { CardWithTextComponent } from './card-with-text/card-with-text.component';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('elementContent') elementContent: ElementRef;
  @ViewChild('contextMenuComponent', { read: ElementRef })
  contextMenuComponent: ElementRef<HTMLElement>;

  @ViewChild(ElementDirective, { static: true })
  appCurrentElement: ElementDirective;

  static contextmenuSize: TCoordinates = [200, 100];
  @Input() board: ElementRef;
  @Input() element: ICreatedElement;

  mouseShiftCoordinates: TCoordinates;
  mouseCoordinatesByElement: TCoordinates;
  mouseCoordinatesByPage: TCoordinates;

  openContextmenu: boolean = false;
  isMoving: boolean;

  public get elementPosition() {
    return {
      left: this.element.coordinates[0] + 'px',
      top: this.element.coordinates[1] + 'px',
    };
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private elementService: ElementService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  ngAfterViewInit() {
    this.elementContent.nativeElement.addEventListener(
      'contextmenu',
      this.showContextMenuHandler
    );
    // @ts-ignore
    this.isMoving = !this.element?.editing?.isEditing;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadComponent();
    // @ts-ignore
    this.isMoving = !this.element?.editing?.isEditing;
  }

  loadComponent() {
    const viewContainerRef = this.appCurrentElement.viewContainerRef;
    viewContainerRef.clear();
    const componentSetRef = (componentType: Type<ElementDirective>) => {
      const componentRef =
        viewContainerRef.createComponent<ElementDirective>(componentType);
      componentRef.instance.element = this.element;
    };

    switch (this.element.type) {
      case 'dice':
        componentSetRef(DiceComponent);
        break;
      case 'text':
        componentSetRef(CardWithTextComponent);
        break;
      default:
        console.error(
          `Element with type ${this.element.type} is not supported`
        );
    }
  }

  moveHandler = (e: MouseEvent) => this.moveElement(e);
  moveEndHandler = () => this.endMovingElementById();

  private moveElement(e: MouseEvent) {
    this.element.coordinates = [
      e.clientX - this.mouseShiftCoordinates[0],
      e.clientY - this.mouseShiftCoordinates[1],
    ];
  }

  public startMovingElementById(event: MouseEvent) {
    if (event.button === 2) return;
    this.mouseShiftCoordinates = [
      event.clientX - this.element.coordinates[0],
      event.clientY - this.element.coordinates[1],
    ];
    this.board.nativeElement.addEventListener('mousemove', this.moveHandler);
    this.board.nativeElement.addEventListener('mouseup', this.moveEndHandler);
  }

  public endMovingElementById() {
    this.elementService.updateElementCoordinates(
      this.element.element_id,
      this.element.coordinates
    );
    this.board.nativeElement.removeEventListener('mousemove', this.moveHandler);
    this.board.nativeElement.removeEventListener(
      'mouseup',
      this.moveEndHandler
    );
  }

  deleteDefaultContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  showContextMenuHandler = (e: MouseEvent) => this.showContextMenu(e);

  public showContextMenu(e: MouseEvent) {
    this.deleteDefaultContextMenu(e);
    this.mouseCoordinatesByPage = [e.screenX, e.screenY];
    this.mouseCoordinatesByElement = [
      Math.abs(this.element.coordinates[0] - e.clientX),
      e.clientY - this.element.coordinates[1],
    ];

    this.openContextmenu = true;

    document.addEventListener('mousedown', this.interactContextMenuHandler);
    this.elementContent.nativeElement.removeEventListener(
      'contextmenu',
      this.showContextMenuHandler
    );
  }

  closeContextMenu() {
    this.openContextmenu = false;
    this.elementContent.nativeElement.addEventListener(
      'contextmenu',
      this.showContextMenuHandler
    );
    document.removeEventListener('mousedown', this.interactContextMenuHandler);
  }

  interactContextMenuHandler = (e: MouseEvent) => this.interactContextMenu(e);

  public interactContextMenu(e: MouseEvent): void {
    if (!e.composedPath().includes(this.contextMenuComponent.nativeElement)) {
      this.closeContextMenu();
    }
  }

  public get contextMenuPosition(): ['left' | 'right', 'top' | 'bottom'] {
    return [
      this.mouseCoordinatesByPage[0] + ElementComponent.contextmenuSize[0] >
      window.screen.width
        ? 'left'
        : 'right',
      this.mouseCoordinatesByPage[1] + ElementComponent.contextmenuSize[1] >
      window.screen.height
        ? 'top'
        : 'bottom',
    ];
  }
}
