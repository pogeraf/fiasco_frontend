import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectModalComponent } from './reconnect-modal.component';

describe('ReconectModalComponent', () => {
  let component: ReconnectModalComponent;
  let fixture: ComponentFixture<ReconnectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReconnectModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconnectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
