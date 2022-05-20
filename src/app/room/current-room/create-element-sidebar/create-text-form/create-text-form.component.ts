import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-text-form',
  templateUrl: './create-text-form.component.html',
  styleUrls: ['./create-text-form.component.scss'],
})
export class CreateTextFormComponent implements OnInit {
  @Input() isCreating: boolean;

  constructor() {}

  ngOnInit(): void {}
}
