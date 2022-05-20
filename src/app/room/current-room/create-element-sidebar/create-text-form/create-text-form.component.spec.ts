import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTextFormComponent } from './create-text-form.component';

describe('CreateTextFormComponent', () => {
  let component: CreateTextFormComponent;
  let fixture: ComponentFixture<CreateTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTextFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
