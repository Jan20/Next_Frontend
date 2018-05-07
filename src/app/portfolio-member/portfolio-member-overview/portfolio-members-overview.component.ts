import { Component, OnInit } from '@angular/core';
import { PortfolioMember } from '../portfolio-member-model/portfolio-member';
import { Router } from '@angular/router';
import { PortfolioMemberService } from '../portfolio-member-service/portfolio-member.service';

@Component({

  selector: 'app-portfolio-member-overview',
  templateUrl: './portfolio-member-overview.component.html',
  styleUrls: ['./portfolio-member-overview.component.scss']

})
export class PortfolioMemberOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  public title: string = 'Watchlist Members'
  public portfolioMembers: PortfolioMember[] = []
      
  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    public portfolioMemberService: PortfolioMemberService,

  ) {}

  ngOnInit() {

    this.init2()
    
  }

  ///////////////
  // Functions //
  ///////////////
  private async init2(): Promise<void>{
    
    this.portfolioMemberService.fetchPortfolioMembers('default_portfolio')
    this.portfolioMemberService.portfolioMembersSubject.subscribe(portfolioMembers => {

      this.portfolioMembers = []

      portfolioMembers.forEach(portfolioMember => {

        portfolioMember.status !== 'closed' ? this.portfolioMembers.push(portfolioMember) : null

      })
    
    })

  }

  public showPortfolioMemberDetails(portfolioMember: PortfolioMember): void {

    this.router.navigate([`markets/${portfolioMember.marketId}/assets/${portfolioMember.assetId}`]);
  
  }

}
