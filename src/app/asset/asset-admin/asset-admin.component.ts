import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';
import { Asset } from '../asset-model/asset';

@Component({
  selector: 'app-asset-admin',
  templateUrl: './asset-admin.component.html',
  styleUrls: ['./asset-admin.component.scss']
})
export class AssetAdminComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  public assets: Asset[] = []
      
  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    public assetService: AssetService,

  ) {}

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => this.assetService.fetchAssets(params['marketId']))
    this.assetService.assetsSubject.subscribe(assets => this.assets = assets)

  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetDetails(assetId: string): void {
  
    this.activatedRoute.params.subscribe(params => {
  
      this.router.navigate([`/markets/${params['marketId']}/assets/${assetId}`]);
  
    })
  
  }

  public updateAsset(asset: Asset): void {

    this.assetService.toggleInUpdateMode()
    
  }

  public deleteAsset(asset: Asset): void {
    
    console.log(asset)
    this.assetService.deleteAsset(asset.market_id, asset.symbol)
  
  }

}