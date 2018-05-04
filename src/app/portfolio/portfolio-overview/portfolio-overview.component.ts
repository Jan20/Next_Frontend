import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from '../../asset/asset-model/asset'
import { AssetService } from '../../asset/asset-service/asset.service'
import { Portfolio } from '../portfolio-model/portfolio';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { PortfolioMemberService } from '../../portfolio-member/portfolio-member-service/portfolio-member.service';
import { PortfolioMember } from '../../portfolio-member/portfolio-member-model/portfolio-member';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss']
})
export class PortfolioOverviewComponent implements OnInit {

  
  ///////////////
  // Variables //
  ///////////////
  private portfolioMembers: PortfolioMember[]
  public portfolio: Portfolio = new Portfolio(0, 0)
  public cash: number = 0
  public assets: number = 0
  public title: string = 'Portfolio'

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private portfolioService: PortfolioService,
    private portfolioMemberService: PortfolioMemberService,

  ) {}

  ngOnInit() {
    
    this.portfolioService.fetchPortfolio('default_portfolio')
    this.portfolioService.portfolioSubject.subscribe(portfolio => {
     
      this.cash = +portfolio.cash
      this.portfolio = this.portfolio
      
    })

    this.portfolioMemberService.fetchPortfolioMembers('default_portfolio')
    this.portfolioMemberService.portfolioMembersSubject.subscribe(portfolioMembers => {
    
      this.portfolioMembers = portfolioMembers
      this.portfolioMembers.forEach(portfolioMember => {

        if (portfolioMember.status !== 'sold') {

          this.assets = this.assets + portfolioMember.quantity

        }



      })


    })

  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {

    

  }

  
  public showCash(): void {

    this.router.navigate(['/portfolio/cash'])

  }


}
