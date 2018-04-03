import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Asset } from '../asset-model/asset';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from '../../user/user-service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from '../../market/market-service/market.service';
import { Market } from '../../market/market-model/market';

@Injectable()
export class AssetService {

  ///////////////
  // Variables //
  ///////////////
  private marketId: string
  private market: Market
  private asset: Asset = new Asset('', '', '', '')
  private assets: Asset[] = []
  private assetDocument: AngularFirestoreDocument<Asset>
  private assetCollection: AngularFirestoreCollection<Asset>
  private marketDocument: AngularFirestoreDocument<Market>
  public inAddMode: boolean = false

  //////////////
  // Subjects //
  //////////////
  public assetSubject: Subject<Asset> = new Subject<Asset>()
  public assetsSubject: Subject<any> = new Subject<any>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService
  ) {

  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {
    this.router.navigate(['/markets', this.marketId, '/assets']);
  }

  public showAssetDetails(assetId: string): void {
    this.router.navigate(['/markets', this.marketId, '/assets', assetId]);
  }

  public toggleInAddMode(): void {
    this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public fetchAsset(assetId: string): any {
    this.assetDocument = this.angularFirestore.doc('users/' + this.userService.getUser().getUserId() + '/markets/' + this.marketId + '/assets/' + assetId)
    this.assetDocument.valueChanges().subscribe(asset => this.setAsset(asset))
  }

  public fetchAssets(): void {
    this.assetCollection = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/markets/' + this.marketId + '/assets/')
    this.assetCollection.valueChanges().subscribe(assets => {
      let assetsToAdd: Asset[] = []
      assets.forEach(asset => { assetsToAdd.push(new Asset(asset.assetId, asset.name, asset.symbol, asset.market)) })
      this.setAssets(assetsToAdd)
    })
  }

  public addAsset(name: string, symbol: string): void {
    this.marketService.fetchMarket(this.getMarketId())
    this.marketDocument = this.angularFirestore.doc('users/' + this.userService.getUser().getUserId() + '/markets/' + this.getMarketId())
    this.marketDocument.valueChanges().subscribe(market => {
      this.market = market
      console.log(this.market)
      const asset: any = { name: name, symbol: symbol, market: this.market.name }
      this.assetCollection = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/markets/' + this.market.marketId + '/assets/')
      this.assetCollection.add(asset)
      this.assetCollection.valueChanges().subscribe( assets => {
        assets.forEach(asset => { 
          this.assetCollection.ref.where('name', '==', asset.name).get().then( assetToUpdate => {
            assetToUpdate.docs.forEach(assetToUpdate => {
              this.assetCollection.doc(assetToUpdate.id).update({ assetId: assetToUpdate.id })  
            })
          })
        })
      })
      this.setInAddMode(false)
    })
   

  }

  public deleteAsset(assetId: string): void {
    this.angularFirestore.doc('users/' + this.userService.getUser().getUserId() + '/markets/' + this.marketService.getMarketId() + '/assets/' + assetId).delete()
    this.router.navigate(['/markets', this.marketService.getMarket().getMarketId()]);
  }

  /////////////
  // Getters //
  /////////////
  public getMarketId(): string {
    return this.marketId
  }

  public getAsset(assetId: string): Asset {
    return this.asset
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

  public setAsset(asset: Asset): void {
    this.asset = asset
    this.assetSubject.next(asset)
  }

  public setAssets(assets: Asset[]): void {
    this.assets = assets
    this.assetsSubject.next(assets)
  }

  public setInAddMode(inAddMode: boolean): void {
    this.inAddMode = inAddMode
    this.inAddModeSubject.next(inAddMode)
  }
}
