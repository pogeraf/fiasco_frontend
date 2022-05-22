import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDice } from '../../current-room.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiceService } from '../../../../services/dice/dice.service';
import { StyleService } from '../../../../services/color/style.service';

@Component({
  selector: 'app-create-dice-form',
  templateUrl: './create-dice-form.component.html',
  styleUrls: ['./create-dice-form.component.scss'],
})
export class CreateDiceFormComponent implements OnInit {
  @Input() isCreating: boolean;
  @Output() createElement = new EventEmitter<IDice>();

  diceForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    d: new FormControl(6, Validators.required),
    diceType: new FormControl('white', Validators.required),
    style: new FormControl(''),
  });

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

  constructor(
    private diceService: DiceService,
    private styleService: StyleService
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

  createDiceEvent() {
    this.createElement.emit({
      ...this.diceByType,
      d: this.diceForm.value.d,
      value: this.diceService.generateRandoValueForDice(this.diceForm.value.d),
      coordinates: [15, 200],
    });
  }
}
