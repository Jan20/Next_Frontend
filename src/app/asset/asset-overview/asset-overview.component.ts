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
  private inAddMode: boolean = false
  private assets: Asset[] = this.assetService.getAssets()
      

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
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

  /////////////
  // Getters //
  /////////////
  public getMarketId(): string {
    return this.marketId
  }

  public getInAddMode(): boolean {
    return this.inAddMode
  }

  public getAssets(): Asset[] {
    return this.assets
  }

  /////////////
  // Setters //
  /////////////
  public setMarketId(marketId: string): void {
    this.marketId = marketId
  }

  public setInAddMode(inAddMode: boolean): void {
    this.inAddMode = inAddMode
    this.assetService.inAddModeSubject.next(inAddMode)
  }

  public setAssets(assets: Asset[]): void {
    this.assets = assets
  }

}