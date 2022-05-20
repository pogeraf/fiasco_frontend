import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateElementSidebarComponent } from './create-element-sidebar.component';

describe('CreateElementSidebarComponent', () => {
  let component: CreateElementSidebarComponent;
  let fixture: ComponentFixture<CreateElementSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateElementSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateElementSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
