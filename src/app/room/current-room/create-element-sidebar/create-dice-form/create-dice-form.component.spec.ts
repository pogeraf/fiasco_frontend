import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiceFormComponent } from './create-dice-form.component';

describe('CreateDiceFormComponent', () => {
  let component: CreateDiceFormComponent;
  let fixture: ComponentFixture<CreateDiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
