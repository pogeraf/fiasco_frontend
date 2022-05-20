import { TestBed } from '@angular/core/testing';

import { TextareaService } from './textarea.service';

describe('TextareaService', () => {
  let service: TextareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
