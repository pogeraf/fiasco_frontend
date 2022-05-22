import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { DiceService } from './dice-service.service';

describe('DiceServiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
