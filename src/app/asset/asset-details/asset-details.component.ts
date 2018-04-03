import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset-model/asset';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public asset: Asset = new Asset('', '', '', '')

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private activatedRoute: ActivatedRoute,
    public assetService: AssetService,
  ) {}

  ngOnInit() {

    this.assetService.assetSubject.subscribe(asset => {
      this.asset = asset
    })

    this.activatedRoute.params.subscribe(params => {
      this.assetService.fetchAsset(params['assetId'])
    })
  }

  
}
