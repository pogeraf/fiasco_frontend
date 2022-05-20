import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDice, ISit, IText, TItemTypes } from '../current-room.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiceService } from '../../../services/dice/dice.service';
import { StyleService } from '../../../services/color/style.service';

@Component({
  selector: 'app-create-element-sidebar',
  templateUrl: './create-element-sidebar.component.html',
  styleUrls: ['./create-element-sidebar.component.scss'],
})
export class CreateElementSidebarComponent implements OnInit {
  @Output() createElement = new EventEmitter<IDice | ISit | IText>();
  elementTypes: Array<TItemTypes> = ['dice', 'text', 'sit'];
  isCreating: TItemTypes | undefined = undefined;

  diceByType = {
    ...this.diceService.prepareDiceToBack(),
    value: 1,
  };

  get diceStyle() {
    return {
      left: this.diceByType.coordinates[0] + 'px',
      top: this.diceByType.coordinates[1] + 'px',
      background: this.styleService.colorArrayToStr(
        this.diceByType.styles.bg?.color
      ),
      border: this.styleService.borderObjToStr(this.diceByType.styles.border),
      borderRadius: this.styleService.sizeToStr(
        this.diceByType.styles.border?.radius
      ),
      fontSize: this.styleService.sizeToStr(this.diceByType.styles.font?.size),
      color: this.styleService.colorArrayToStr(
        this.diceByType.styles.font?.color
      ),
    };
  }

  diceForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    d: new FormControl(6, Validators.required),
    diceType: new FormControl('white', Validators.required),
    style: new FormControl(''),
  });

  constructor(
    private diceService: DiceService,
    public styleService: StyleService
  ) {}

  ngOnInit(): void {
    this.updateDiceStyle();
    this.diceForm.valueChanges.subscribe(() => {
      this.updateDiceStyle();
    });
  }

  updateDiceStyle(): void {
    this.diceByType.styles = {
      ...this.diceService.prepareDiceTemplate(
        this.diceForm.get('diceType')?.value
      ).styles,
    };
  }

  startCreating(type: TItemTypes) {
    this.isCreating = this.isCreating === type ? undefined : type;
  }

  createElementEvent(type: TItemTypes) {
    let element;
    switch (type) {
      case 'dice':
        element = {
          ...this.diceByType,
          d: this.diceForm.value.d,
          value: this.diceService.generateRandoValueForDice(
            this.diceForm.value.d
          ),
        };
        break;
      case 'text':
        element = this.diceForm.value;
        break;
      case 'sit':
        element = this.diceForm.value;
        break;
    }
    this.createElement.emit({ ...element, coordinates: [10, 150] });
  }
}
