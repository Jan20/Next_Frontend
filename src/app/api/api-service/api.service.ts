import { Injectable } from '@angular/core';

// Services
import { UserService } from '../../user/user-service/user.service'
import { MarketService } from '../../market/market-service/market.service'
import { AssetService } from '../../asset/asset-service/asset.service'
import { Asset } from '../../asset/asset-model/asset';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ///////////////
  // Variables //
  ///////////////
  private userId: string
  private assets: Asset[]

  constructor(

    private marketService: MarketService,
    private assetService: AssetService,

  ) { }

  ///////////////
  // Functions //
  ///////////////
  public async fetchSeries(): Promise<void> {

    this.marketService.fetchMarkets()

    this.marketService.marketsSubject.subscribe(markets => {

      markets.forEach(market => {

        this.assets = []
        this.assetService.fetchAssets(market.marketId)

        this.assetService.assetsSubject.subscribe(assets => {

          this.assets.forEach(asset => {


          })
        })
      })
    })
  }


}
