import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AssetService } from '../../asset/asset-service/asset.service'
import { MarketService } from '../../market/market-service/market.service'
import { Market } from '../../market/market-model/market'
import { Asset } from '../../asset/asset-model/asset'
import { MomentumService } from '../../momentum/momentum-service/momentum.service'

@Component({
  selector: 'app-momentum-overview',
  templateUrl: './momentum-overview.component.html',
  styleUrls: ['./momentum-overview.component.scss']
})
export class MomentumOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Momentum'
  // private portfolioMemberId: string
  // public asset: Asset = new Asset('', '', '', '',)
  // public quantity = 0
  // public prediction = 0
  private assets: Asset[] = []
  public asset: Asset = new Asset('', '', '', '')
  public position = 0

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,
    private assetService: AssetService,
    private momentumService: MomentumService,

  ) {}

  ngOnInit() {

    this.marketService.fetchMarkets()
    this.marketService.marketsSubject.subscribe(markets => {
      console.log(markets)

      for (let i = 0; i < markets.length; i++) {

        this.assetService.fetchAssets(markets[i].marketId)
      
      }
    
    })

    this.assetService.assetsSubject.subscribe(assets => {
      
      console.log(assets)
      this.assets = this.momentumService.mergeSort(assets)
      this.asset = this.assets[0]

    })
    
  }


  ///////////////
  // Functions //
  ///////////////
  public switchToNextAsset() {

    if (this.position + 1 > this.assets.length-1) {

      return

    } 

    this.asset = this.assets[this.position + 1]
    this.position = this.position + 1
    
  }

  public switchToPreviousAsset() {

    if (this.position - 1 < 0) {

      return

    } 

    this.asset = this.assets[this.position - 1]
    this.position = this.position - 1
    
  }


  // private async initialize() {

  //   await this.activatedRoute.params.subscribe(params => this.assetService.fetchAsset(params['marketId'], params['assetId']))

  //   this.assetService.assetSubject.subscribe(asset => {
      
  //     if (asset !== null && asset !== undefined) {

  //       this.asset = asset
  //       this.prediction = asset.short_term_prediction

  //       this.portfolioMemberService.fetchPortfolioMembers('default_portfolio')
  //       this.portfolioMemberService.portfolioMembersSubject.subscribe( portfolioMembers => {

  //         portfolioMembers.forEach(portfolioMember => {

  //           if (portfolioMember.assetId === asset.assetId && portfolioMember.status !== 'sold') {

  //             this.quantity = portfolioMember.quantity
  //             this.portfolioMemberId = portfolioMember.portfolioMemberId

  //           }
  //         })
  //       })

  //     }
  //   })

  // }


  // public buyAsset(asset: Asset): void {

  //   console.log('___________Asset Details______________')
  //   console.log(asset)
  //   this.router.navigate([`portfolio/buy/market/${asset.marketId}/assets/${asset.assetId}`])
    
  // }

  // public sellAsset(asset: Asset): void {
  //   console.log('___________Asset Details______________')
  //   console.log(asset)
  //   this.router.navigate([`portfolio/sell/${this.portfolioMemberId}`])

  // }

  // public showAssetOverview(): void {
  
  //   this.activatedRoute.params.subscribe( params => this.router.navigate([`/markets/${params['marketId']}`]))
  
  // }
  
}


