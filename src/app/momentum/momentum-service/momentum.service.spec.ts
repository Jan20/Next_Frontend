import { TestBed, inject } from '@angular/core/testing';

import { MomentumService } from './momentum.service';

describe('MomentumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MomentumService]
    });
  });

  it('should be created', inject([MomentumService], (service: MomentumService) => {
    expect(service).toBeTruthy();
  }));
});
