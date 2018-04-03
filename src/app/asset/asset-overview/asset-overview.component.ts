import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
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
  public assets: Asset[] = []

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    public assetService: AssetService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.assetService.setMarketId(params['marketId'])
      this.assetService.fetchAssets()
      this.assetService.assetsSubject.subscribe(assets => {
        this.assets = assets
      })
    })
  }
}