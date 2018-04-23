import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Asset } from '../../asset/asset-model/asset';
import { AssetService } from '../../asset/asset-service/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioMemberService } from '../portfolio-member-service/portfolio-member.service';

@Component({
  selector: 'app-portfolio-member-add',
  templateUrl: './portfolio-member-add.component.html',
  styleUrls: ['./portfolio-member-add.component.scss']
})
export class PortfolioMemberAddComponent implements OnInit {

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
  public addPortfolioMember(): void {
  
    this.portfolioMemberService.buyAsset('default_portfolio', this.asset, +this.quantity)
    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])
  
  }
}