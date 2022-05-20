import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IText } from '../../current-room.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextareaService } from '../../../../services/textarea/textarea.service';

@Component({
  selector: 'app-create-text-form',
  templateUrl: './create-text-form.component.html',
  styleUrls: ['./create-text-form.component.scss'],
})
export class CreateTextFormComponent implements OnInit {
  @Input() isCreating: boolean;
  @Output() createElement = new EventEmitter<IText>();

  textForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    blockType: new FormControl('default', Validators.required),
    style: new FormControl(''),
  });

  constructor(private textareaService: TextareaService) {}

  ngOnInit(): void {}

  createElementEvent() {
    this.createElement.emit(
      this.textareaService.defaultTextElement({
        coordinates: [15, 150],
        text: this.textForm.value.text,
      })
    );
    this.textForm.reset({ blockType: 'default' });
  }
}
