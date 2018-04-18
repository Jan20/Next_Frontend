import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Asset } from '../asset-model/asset'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { UserService } from '../../user/user-service/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { MarketService } from '../../market/market-service/market.service'
import { Market } from '../../market/market-model/market'
import { Entry } from '../asset-model/entry'
import { Prediction } from '../asset-model/prediction'
import { User } from '../../user/user-model/user'


@Injectable()
export class AssetService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private asset: Asset = new Asset('', '', '', '')
  private assets: Asset[] = []
  private assetDocument: AngularFirestoreDocument<Asset>
  private assetCollection: AngularFirestoreCollection<Asset>
  private timeSeries: Entry[]
  private seriesCollection: AngularFirestoreCollection<Entry>
  private trainPredictions: Prediction[] = []
  private trainPredictionsCollection: AngularFirestoreCollection<Prediction>
  private testPredictions: Prediction[] = []
  private testPredictionsCollection: AngularFirestoreCollection<Prediction>
  private market: Market
  private marketDocument: AngularFirestoreDocument<Market>
  public inAddMode: boolean = false

  //////////////
  // Subjects //
  //////////////
  public assetSubject: Subject<Asset> = new Subject<Asset>()
  public assetsSubject: Subject<any> = new Subject<any>()
  public timeSeriesSubject: Subject<any> = new Subject<any>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public trainPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  public testPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()

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

  //////////////////////////
  // Retrieve Predictions //
  //////////////////////////
  public async fetchTimeSeries(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Entry>(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/series`).valueChanges().subscribe(entries => this.setTimeSeries(entries))
  }

  public async fetchTrainPredictions(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Prediction>(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/train_predictions`).valueChanges().subscribe(trainPredictions => this.setTrainPredictions(trainPredictions))
  }

  public async fetchTestPredictions(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Prediction>(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/test_predictions`).valueChanges().subscribe(testPredictions => this.setTestPredictions(testPredictions))
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public async fetchAsset(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Asset>(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}`).valueChanges().subscribe( asset => this.setAsset(asset))
  }
  
  public async fetchAssets(marketId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Asset>(`users/${this.user.userId}/markets/${marketId}/assets`).valueChanges().subscribe(assets => this.setAssets(assets))
  }

  public async addAsset(marketId: string, name: string, symbol: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Market>(`users/${this.user.userId}/markets/${marketId}`).valueChanges().subscribe(market => {
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

  public getTrainPredictions(): Prediction[] {
    return this.trainPredictions
  }

  public getTestPredictions(): Prediction[] {
    return this.testPredictions
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

  public setTrainPredictions(trainPredictions: Prediction[]): void {
    this.trainPredictions = trainPredictions
    this.trainPredictionsSubject.next(trainPredictions)
  }

  public setTestPredictions(testPredictions: Prediction[]): void {
    this.testPredictions = testPredictions
    this.testPredictionsSubject.next(testPredictions)
    console.log(testPredictions)
  }

}
