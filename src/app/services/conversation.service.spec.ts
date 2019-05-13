import { TestBed } from '@angular/core/testing';

import { ConvesationService } from './conversation.service';

describe('ConvesationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvesationService = TestBed.get(ConvesationService);
    expect(service).toBeTruthy();
  });
});
