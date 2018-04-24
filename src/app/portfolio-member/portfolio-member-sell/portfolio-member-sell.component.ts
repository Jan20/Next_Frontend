import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AssetService } from '../../asset/asset-service/asset.service'
import { PortfolioMemberService } from '../portfolio-member-service/portfolio-member.service'
import { FormControl } from '@angular/forms'
import { Asset } from '../../asset/asset-model/asset'
import { PortfolioMember } from '../portfolio-member-model/portfolio-member';

@Component({
  selector: 'app-portfolio-member-sell',
  templateUrl: './portfolio-member-sell.component.html',
  styleUrls: ['./portfolio-member-sell.component.scss']
})
export class PortfolioMemberSellComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private quantity: number
  public portfolioMember: PortfolioMember = new PortfolioMember('', '', '', '', '', '', 0, '', '', '')
  public title = 'Portfolio'
  
  //////////////////
  // FormControls //
  //////////////////
  public quantityFormControl: FormControl = new FormControl()
  
  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public portfolioMemberService: PortfolioMemberService,

  ) {}
  
  ngOnInit() {
  
    this.activatedRoute.params.subscribe(params => {
      
      this.portfolioMemberService.fetchPortfolioMember('default_portfolio', params['portfolioMemberId'])
    
    })

    this.portfolioMemberService.portfolioMemberSubject.subscribe( portfolioMember => this.portfolioMember = portfolioMember )
    this.quantityFormControl.valueChanges.subscribe(quantity => this.quantity = quantity)
  
  }
  
  ///////////////
  // Functions //
  ///////////////
  public sellAsset(): void {
  
    this.portfolioMemberService.sellAsset('default_portfolio', this.portfolioMember.portfolioMemberId, +this.quantity)
    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])
  
  }

  public cancel(): void {

    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])

  }
  
}
