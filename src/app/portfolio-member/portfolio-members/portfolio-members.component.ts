import { Component, OnInit } from '@angular/core';
import { PortfolioMember } from '../portfolio-model/portfolio-member';
import { Router } from '@angular/router';
import { PortfolioService } from '../portfolio-service/portfolio.service';

@Component({
  selector: 'app-portfolio-members',
  templateUrl: './portfolio-members.component.html',
  styleUrls: ['./portfolio-members.component.scss']
})
export class PortfolioMembersComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  public title: string = 'Portfolio Components'
  public portfolioMembers: PortfolioMember[] = []
      
  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    public portfolioService: PortfolioService,

  ) {}

  ngOnInit() {

    this.portfolioService.fetchPortfolioMembers()
    this.portfolioService.portfolioMembersSubject.subscribe(portfolioMembers => this.portfolioMembers = portfolioMembers)
    
  }

  ///////////////
  // Functions //
  ///////////////

  public showPortfolioMemberDetails(portfolioMember: PortfolioMember): void {

    this.router.navigate([`markets/${portfolioMember.marketId}/assets/${portfolioMember.assetId}`]);
  
  }

}
