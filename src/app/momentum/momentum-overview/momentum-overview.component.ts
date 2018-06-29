import { Component, OnInit, Input } from '@angular/core'
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
  public title = 'Please choose a stock to invest in'
  public assets: Asset[] = []
  public asset: Asset = new Asset('', '', '', '')
  public position = 0
  private marketId: string

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private momentumService: MomentumService,

  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.marketId = params['marketId']
      this.assetService.fetchAssets(this.marketId)

    })

    this.assetService.assetsSubject.subscribe(assets => {
      
      this.assets = this.momentumService.mergeSort(assets)

    })
    
  }

  ///////////////
  // Functions //
  ///////////////
  public switchView(asset: Asset): void {

    this.router.navigate([`markets/${this.marketId}/assets/${asset.symbol}`])

  }
  
}


