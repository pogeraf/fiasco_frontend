import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInRoomComponent } from './login-in-room.component';

describe('LoginInRoomComponent', () => {
  let component: LoginInRoomComponent;
  let fixture: ComponentFixture<LoginInRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginInRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
