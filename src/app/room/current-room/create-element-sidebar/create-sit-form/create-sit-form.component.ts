import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-sit-form',
  templateUrl: './create-sit-form.component.html',
  styleUrls: ['./create-sit-form.component.scss'],
})
export class CreateSitFormComponent implements OnInit {
  @Input() isCreating: boolean;

  constructor() {}

  ngOnInit(): void {}
}
