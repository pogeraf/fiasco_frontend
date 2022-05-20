import { TestBed } from '@angular/core/testing';

import { StyleService } from './color.service';

describe('ColorService', () => {
  let service: StyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
