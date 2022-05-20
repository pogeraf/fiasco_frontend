import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRoomComponent } from './room.component';

describe('RoomComponent', () => {
  let component: CurrentRoomComponent;
  let fixture: ComponentFixture<CurrentRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentRoomComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
