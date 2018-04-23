import { TestBed, inject } from '@angular/core/testing';

import { PortfolioMemberService } from './portfolio-member.service';

describe('PortfolioMemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioMemberService]
    });
  });

  it('should be created', inject([PortfolioMemberService], (service: PortfolioMemberService) => {
    expect(service).toBeTruthy();
  }));
});
