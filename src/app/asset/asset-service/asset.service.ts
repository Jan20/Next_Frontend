import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Asset } from '../asset-model/asset'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { UserService } from '../../user/user-service/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { MarketService } from '../../market/market-service/market.service'
import { Market } from '../../market/market-model/market'
import { Entry } from '../asset-model/entry';
import { User } from '../../user/user-model/user';

@Injectable()
export class AssetService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private market: Market
  private timeSeries: Entry[]
  private asset: Asset = new Asset('', '', '', '')
  private assets: Asset[] = []
  private assetDocument: AngularFirestoreDocument<Asset>
  private assetCollection: AngularFirestoreCollection<Asset>
  private seriesCollection: AngularFirestoreCollection<Entry>
  private marketDocument: AngularFirestoreDocument<Market>
  public inAddMode: boolean = false

  //////////////
  // Subjects //
  //////////////
  public assetSubject: Subject<Asset> = new Subject<Asset>()
  public assetsSubject: Subject<any> = new Subject<any>()
  public timeSeriesSubject: Subject<any> = new Subject<any>()
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
  public async fetchAsset(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.assetDocument = this.angularFirestore.doc(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}`)
    this.assetDocument.valueChanges().subscribe( asset => {
        this.setAsset(asset)
        this.assetsSubject.next(asset)
    })
  }

  public async fetchTimeSeries(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.seriesCollection = this.angularFirestore.collection(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/series`)
    this.seriesCollection.valueChanges().subscribe(entries => {
      let series: Entry[] = []
      entries.forEach(entry => {
        series.push(new Entry(entry.name, entry.symbol, entry.close, entry.date))
      })
      this.setTimeSeries(series)
      this.timeSeriesSubject.next(series)
    })
  }

  public async fetchAssets(marketId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.assetCollection = this.angularFirestore.collection(`users/${this.user.userId}/markets/${marketId}/assets`)
    this.assetCollection.valueChanges().subscribe(assets => {
      let assetsToAdd: Asset[] = []
      assets.forEach(asset => { assetsToAdd.push(new Asset(asset.assetId, asset.name, asset.symbol, asset.market)) })
      this.setAssets(assetsToAdd)
      this.assetsSubject.next(assetsToAdd)
    })
  }

  public async addAsset(marketId: string, name: string, symbol: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.marketDocument = this.angularFirestore.doc(`users/${this.user.userId}/markets/${marketId}`)
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

  public async deleteAsset(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc(`users/${this.user.userId}/markets/'${marketId}/assets/${assetId}`).delete()
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

  public getTimeSeries(): Entry[] {
    return this.timeSeries
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
 
  public setTimeSeries(timeSeries: Entry[]): void {
    this.timeSeries = timeSeries
    this.timeSeriesSubject.next(timeSeries)
  }

}
