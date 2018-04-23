import { Component, OnInit } from '@angular/core'
import { Asset } from '../asset-model/asset'
import { ActivatedRoute, Router } from '@angular/router'
import { AssetService } from '../asset-service/asset.service'
import { BackendService } from '../../config/backend/backend.service'
import { Entry } from '../asset-model/entry'
import { PortfolioService } from '../../portfolio/portfolio-service/portfolio.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public asset: Asset = new Asset('', '', '', '',)
  public quantity = 0
  public prediction = 0

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private portfolioService: PortfolioService,
  
  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.assetService.fetchAsset(params['marketId'], params['assetId'])
      this.assetService.assetSubject.subscribe(asset => {
        
        this.prediction = asset.short_term_prediction
        this.asset = asset

        this.portfolioService.fetchPortfolioMembers()
        this.portfolioService.portfolioMembersSubject.subscribe(portfolioMembers => {

          portfolioMembers.forEach(portfolioMember => {

            if (portfolioMember.assetId === asset.assetId) {

              this.quantity = portfolioMember.quantity

            }
          })
        })

      })
    })
    
  }

  ///////////////
  // Functions //
  ///////////////
  public buyAsset(asset: Asset): void {

    this.portfolioService.buyAsset(asset, this.quantity)
    this.router.navigate([`/portfolio/add/market/${asset.marketId}/asset/${asset.assetId}`])

  }

  public sellAsset(asset: Asset): void {



  }

  public showAssetOverview(): void {
  
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate([`/markets/${params['marketId']}`])
    })
  
  }

  
}


