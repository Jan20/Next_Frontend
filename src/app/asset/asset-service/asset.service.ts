import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Asset } from '../asset-model/asset'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { UserService } from '../../user/user-service/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { MarketService } from '../../market/market-service/market.service'
import { Market } from '../../market/market-model/market'

@Injectable()
export class AssetService {

  ///////////////
  // Variables //
  ///////////////
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
  ) {}

  ///////////////
  // Functions //
  ///////////////

  public toggleInAddMode(): void {
    this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public fetchAsset(marketId: string, assetId: string): any {
    console.log('___________________________________________')
    console.log(this.userService.getUser().getUserId())
    console.log(marketId)
    console.log(assetId)
    console.log('___________________________________________')
    this.assetDocument = this.angularFirestore.doc(`users/${this.userService.getUser().getUserId()}/markets/${marketId}/assets/${assetId}`)
    this.assetDocument.valueChanges().subscribe( asset => {
      console.log('___________________________________________')
      console.log(asset)
      console.log('___________________________________________')
      this.setAsset(asset)
      this.assetSubject.next(asset)
    })
  }

  public fetchAssets(marketId: string): void {
    this.assetCollection = this.angularFirestore.collection(`users/${this.userService.getUser().getUserId()}/markets/${marketId}/assets`)
    this.assetCollection.valueChanges().subscribe(assets => {
      let assetsToAdd: Asset[] = []
      assets.forEach(asset => { assetsToAdd.push(new Asset(asset.assetId, asset.name, asset.symbol, asset.market)) })
      this.setAssets(assetsToAdd)
      this.assetsSubject.next(assetsToAdd)
    })
  }

  public addAsset(marketId: string, name: string, symbol: string): void {
    this.marketDocument = this.angularFirestore.doc(`users/${this.userService.getUser().getUserId()}/markets/${marketId}`)
    this.marketDocument.valueChanges().subscribe(market => {
      const asset: any = { name: name, symbol: symbol, market: market.name }
      this.assetCollection.add(asset)
      this.assetCollection.valueChanges().subscribe( assets => {
        assets.forEach(asset => { 
          this.assetCollection.ref.where('name', '==', asset.name).get().then( assetToUpdate => {
            assetToUpdate.docs.forEach(assetToUpdate => {
              this.assetCollection.doc(assetToUpdate.id).update({ assetId: assetToUpdate.id })  
            })
          })
        })
        this.setInAddMode(false)
      })   
    })
  }

  public deleteAsset(marketId: string, assetId: string): void {
    this.angularFirestore.doc(`users/${this.userService.getUser().getUserId()}/markets/'${marketId}/assets/${assetId}`).delete()
    this.router.navigate([`/markets/${marketId}`])
  }

  /////////////
  // Getters //
  /////////////
  public getAsset(): Asset {
    return this.asset
  }

  public getAssets(): Asset[] {
    return this.assets
  }

  public getInAddMode(): boolean {
    return this.inAddMode
  }

  /////////////
  // Setters //
  /////////////
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
