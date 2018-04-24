import { Component, OnInit } from '@angular/core'
import { Asset } from '../asset-model/asset'
import { ActivatedRoute, Router } from '@angular/router'
import { AssetService } from '../asset-service/asset.service'
import { BackendService } from '../../config/backend/backend.service'
import { Entry } from '../asset-model/entry'
import { PortfolioMemberService } from '../../portfolio-member/portfolio-member-service/portfolio-member.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private portfolioMemberId: string
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
    private portfolioMemberService: PortfolioMemberService,
  
  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      console.log('________ Asset Details _____________')
      console.log(params['marketId'])
      console.log(params['assetId'])
      this.assetService.fetchAsset(params['marketId'], params['assetId'])
      
    })

    this.assetService.assetSubject.subscribe(asset => {
      

      console.log('___________Asset______________')
      console.log(asset)
      
      if (asset) {

        this.asset = asset
        this.prediction = asset.short_term_prediction

        this.portfolioMemberService.fetchPortfolioMembers('default_portfolio')
        this.portfolioMemberService.portfolioMembersSubject.subscribe( portfolioMembers => {

          portfolioMembers.forEach(portfolioMember => {

            if (portfolioMember.assetId === asset.assetId) {

              this.quantity = portfolioMember.quantity
              this.portfolioMemberId = portfolioMember.portfolioMemberId

            }
          })
        })

      }
      
      
    })
    
  }

  ///////////////
  // Functions //
  ///////////////
  public buyAsset(asset: Asset): void {

    console.log('___________Asset Details______________')
    console.log(asset)
    this.router.navigate([`portfolio/buy/market/${asset.marketId}/assets/${asset.assetId}`])
    
  }

  public sellAsset(asset: Asset): void {

    this.router.navigate([`portfolio/sell/${this.portfolioMemberId}`])

  }

  public showAssetOverview(): void {
  
    this.activatedRoute.params.subscribe( params => this.router.navigate([`/markets/${params['marketId']}`]))
  
  }
  
}


