import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardCreateComponent } from './room-card-create.component';

describe('RoomCardCreateComponent', () => {
  let component: RoomCardCreateComponent;
  let fixture: ComponentFixture<RoomCardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCardCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
