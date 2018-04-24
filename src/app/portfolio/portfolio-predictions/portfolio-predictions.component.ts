import { Component, OnInit } from '@angular/core';
import { Asset } from '../../asset/asset-model/asset';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../../asset/asset-service/asset.service';
import { MarketService } from '../../market/market-service/market.service';
import { Market } from '../../market/market-model/market';
import { PortfolioService } from '../portfolio-service/portfolio.service';

@Component({
  selector: 'app-portfolio-predictions',
  templateUrl: './portfolio-predictions.component.html',
  styleUrls: ['./portfolio-predictions.component.scss']
})
export class PortfolioPredictionsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  public title: string = 'Predictions'
  public markets: Market[]
  public assets: Asset[] = []
      
  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,
    public assetService: AssetService,
    public portfolioService: PortfolioService,

  ) {

   

  }

  ngOnInit() {

    console.log('executed')

    this.marketService.fetchMarkets().then(() => {
      this.marketService.marketsSubject.subscribe( markets => {
        markets.forEach( market => {console.log(market.marketId);this.assetService.fetchAssets(market.marketId).then(() => {
          this.assets = []
          this.assetService.assetsSubject.subscribe(assets => {
            assets.forEach(asset => {
              let flag = true
              for (let i = 0 ; i < this.assets.length; i++) {
                if (this.assets[i].assetId == asset.assetId) {
                  flag = false
                }
              }
              flag ? this.assets.push(asset) : null
            })
          })
        })
      })
    })
    })
  }
      

  ///////////////
  // Functions //
  ///////////////
  public showAssetDetails(asset: Asset): void {

    this.router.navigate([`/markets/${asset.marketId}/assets/${asset.assetId}`]);
  
  }

  
  private compareAssets(a: Asset, b: Asset): number {
    
    if (a.short_term_prediction < b.short_term_prediction) {
    
      return -1
    
    }
    
    if (a.short_term_prediction > b.short_term_prediction) {

      return 1

    }
    
    return 0
  }

}
