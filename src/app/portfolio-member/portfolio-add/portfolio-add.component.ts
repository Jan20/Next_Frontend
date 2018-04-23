import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Asset } from '../../asset/asset-model/asset';
import { AssetService } from '../../asset/asset-service/asset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.scss']
})
export class PortfolioAddComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Portfolio'
  public formTitle: string = 'Add To Portfolio'
  private asset: Asset = new Asset('', '', '', '', 0, '')
  private assetName: string
  private quantity: number
  
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
    public portfolioService: PortfolioService,

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
  
    console.log(+this.quantity)
    this.portfolioService.addPortfolioMember(this.asset, +this.quantity)
    this.quantityFormControl.reset()
    this.router.navigate(['/portfolio'])
  }
}