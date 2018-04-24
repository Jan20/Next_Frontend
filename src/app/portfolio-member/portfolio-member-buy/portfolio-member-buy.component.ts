import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AssetService } from '../../asset/asset-service/asset.service'
import { PortfolioMemberService } from '../portfolio-member-service/portfolio-member.service'
import { FormControl } from '@angular/forms'
import { Asset } from '../../asset/asset-model/asset'

@Component({
  selector: 'app-portfolio-member-buy',
  templateUrl: './portfolio-member-buy.component.html',
  styleUrls: ['./portfolio-member-buy.component.scss']
})
export class PortfolioMemberBuyComponent implements OnInit {


  ///////////////
  // Variables //
  ///////////////
  private asset: Asset = new Asset('', '', '', '', 0, '')
  private assetName: string
  private quantity: number
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
    public assetService: AssetService,
    public portfolioMemberService: PortfolioMemberService,

  ) {}
  
  ngOnInit() {
  
    this.activatedRoute.params.subscribe(params => this.assetService.fetchAsset(params['marketId'], params['assetId']))
    this.assetService.assetSubject.subscribe( asset => this.asset = asset )
    this.quantityFormControl.valueChanges.subscribe(quantity => this.quantity = quantity)
  
  }
  
  ///////////////
  // Functions //
  ///////////////
  public buyAsset(): void {
  
    console.log('_________Buy Asset_______________')
    console.log(this.asset)
    console.log(this.quantity)
    this.portfolioMemberService.buyAsset('default_portfolio', this.asset, +this.quantity)
    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])
  
  }

  public cancel(): void {

    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])

  }

}
