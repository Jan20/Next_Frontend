import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset-model/asset';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';
import { BackendService } from '../../config/backend/backend.service';


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private asset: Asset = this.assetService.getAsset()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private backendService: BackendService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.assetService.assetSubject.subscribe(asset => this.asset = asset)
      this.assetService.fetchAsset(params['marketId'], params['assetId'])
    })
  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate([`/markets/${params['marketId']}`])
    })
  }


  /////////////
  // Getters //
  /////////////
  public getAsset(): Asset {
    return this.asset
  }

  /////////////
  // Setters //
  /////////////
  public setAsset(asset: Asset): void {
    this.asset = asset
  }

}
