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
  public title: string = 'Portfolio Components'
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
    this.portfolioMembers = []
    this.portfolioMemberService.fetchPortfolioMembers('default_portfolio')
    this.portfolioMemberService.portfolioMembersSubject.subscribe(portfolioMembers => {
      
      portfolioMembers.forEach(portfolioMember => {

        let flag = true

        for (let i = 0; i < this.portfolioMembers.length; i++) {

          if (this.portfolioMembers[i].assetId === portfolioMember.assetId) {

            flag = false

          }

        }
        
        if (flag) {

          portfolioMember.status !== 'sold' ? this.portfolioMembers.push(portfolioMember) : null

        }        
        console.log(this.portfolioMembers)
      })
    
    })

  }

  public showPortfolioMemberDetails(portfolioMember: PortfolioMember): void {

    this.router.navigate([`markets/${portfolioMember.marketId}/assets/${portfolioMember.assetId}`]);
  
  }

}
