import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSitFormComponent } from './create-sit-form.component';

describe('CreateSitFormComponent', () => {
  let component: CreateSitFormComponent;
  let fixture: ComponentFixture<CreateSitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
