import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContexMenuComponent } from './contex-menu.component';

describe('ContexMenuComponent', () => {
  let component: ContexMenuComponent;
  let fixture: ComponentFixture<ContexMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContexMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContexMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
