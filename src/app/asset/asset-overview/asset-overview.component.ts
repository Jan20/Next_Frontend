import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user-service/user.service';
import { AssetService } from '../asset-service/asset.service';
import { Asset } from '../asset-model/asset';

@Component({
  selector: 'app-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  public assets: Asset[] = this.assetService.getAssets()
      
  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public assetService: AssetService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.assetService.assetsSubject.subscribe(assets => { this.assets = assets })
      this.assetService.fetchAssets(params['marketId'])
    })
  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetDetails(assetId: string): void {
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate([`/markets/${params['marketId']}/assets/${assetId}`]);
    })
  }
}