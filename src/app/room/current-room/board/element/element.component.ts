import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementService } from '../../../../services/element/element.service';
import { ElementDirective } from './element.directive';
import { ICreatedElement, TCoordinates } from '../../current-room.interface';
import { DiceComponent } from './dice/dice.component';
import { CardWithTextComponent } from './card-with-text/card-with-text.component';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @ViewChild(ElementDirective, { static: true })
  appCurrentElement!: ElementDirective;

  static contextmenuSize: TCoordinates = [200, 100];
  @Input() board: ElementRef;
  @Input() element: ICreatedElement;

  mouseShiftCoordinates: TCoordinates;
  mouseCoordinatesByElement: TCoordinates;
  mouseCoordinatesByPage: TCoordinates;

  openContextmenu: boolean = false;

  public get elementPosition() {
    return {
      left: this.element.coordinates[0] + 'px',
      top: this.element.coordinates[1] + 'px',
    };
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private elementService: ElementService
  ) {}

  ngOnInit(): void {
    this.loadComponent();
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

  public showContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.mouseCoordinatesByPage = [e.screenX, e.screenY];
    this.mouseCoordinatesByElement = [
      Math.abs(this.element.coordinates[0] - e.clientX),
      e.clientY - this.element.coordinates[1],
    ];

    this.openContextmenu = !this.openContextmenu;

    if (this.openContextmenu) {
      setTimeout(() => {
        document.addEventListener(
          'mouseup',
          (e: any) => {
            e.preventDefault();
            // TODO: hardcode
            this.openContextmenu =
              e.button === 2 && e?.path?.[4]?.tagName === 'APP-ELEMENT';
          },
          {
            once: true,
          }
        );
      }, 1000);
    }
  }
  public get contextmenuPosition(): ['left' | 'right', 'top' | 'bottom'] {
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
