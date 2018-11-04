import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Market } from '../../market/market-model/market';
import { GenericService } from '../../shared/services/generic-service';
import { Asset } from '../asset-model/asset';
import { Entry } from '../asset-model/entry';
import { Prediction } from '../asset-model/prediction';

@Injectable()
export class AssetService extends GenericService {

  ///////////////
  // Variables //
  ///////////////
  private asset: Asset = new Asset('', '', '', '')
  private assets: Asset[]
  private timeSeries: Entry[]
  private trainPredictions: Prediction[] = []
  private testPredictions: Prediction[] = []
  private shortTermPredictions: Prediction[]
  private shortTermTestPredictions: Prediction[]
  public inUpdateMode: boolean = false

  //////////////
  // Subjects //
  //////////////
  public assetSubject: Subject<Asset> = new Subject<Asset>()
  public assetsSubject: Subject<Asset[]> = new Subject<Asset[]>()
  public timeSeriesSubject: Subject<Entry[]> = new Subject<Entry[]>()
  public trainPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  public testPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  public shortTermPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  public shortTermTestPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  public inUpdateModeSubject: Subject<Boolean> = new Subject<Boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private angularFirestore: AngularFirestore,
  
  ) {

    super()

  }

  //////////////////////////
  // Retrieve Predictions //
  //////////////////////////
  public async fetchTimeSeries(marketId: string, assetId: string): Promise<void> {

    this.angularFirestore.collection<Entry>(`markets/${marketId}/assets/${assetId}/series`).valueChanges().subscribe(entries => this.setTimeSeries(entries))

  }

  public async fetchTrainPredictions(marketId: string, assetId: string): Promise<void> {
    
    this.angularFirestore.collection<Prediction>(`markets/${marketId}/assets/${assetId}/train_predictions`).valueChanges().subscribe(trainPredictions => this.setTrainPredictions(trainPredictions))

  }

  public async fetchTestPredictions(marketId: string, assetId: string): Promise<void> {
    
    this.angularFirestore.collection<Prediction>(`markets/${marketId}/assets/${assetId}/test_predictions`).valueChanges().subscribe(testPredictions => this.setTestPredictions(testPredictions))

  }

  public async fetchShortTermPredictions(marketId: string, assetId: string): Promise<void> {

    this.angularFirestore.collection<Prediction>(`markets/${marketId}/assets/${assetId}/short_term_predictions`).valueChanges().subscribe(shortTermPredictions => this.setShortTermPredictions(shortTermPredictions))

  }

  public async fetchShortTermTestPredictions(marketId: string, assetId: string): Promise<void> {

    this.angularFirestore.collection<Prediction>(`markets/${marketId}/assets/${assetId}/short_term_test_predictions`).valueChanges().subscribe(shortTermTestPredictions => this.setShortTermTestPredictions(shortTermTestPredictions))

  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public async fetchAsset(marketId: string, assetId: string): Promise<void> {
  
    this.angularFirestore.doc<Asset>(`markets/${marketId}/assets/${assetId}`).valueChanges().subscribe( asset => this.setAsset(asset))
  
  }
  
  public async fetchAssets(marketId: string): Promise<void> {
  
    
    this.angularFirestore.collection<Asset>(`markets/${marketId}/assets`).valueChanges().subscribe(assets => this.setAssets(assets))
  
  }

  public async addAsset(market_id: string, name: string, symbol: string): Promise<void> {
  
    const asset: any = { name: name, symbol: symbol, market_id: market_id}
    this.angularFirestore.collection<Asset>(`markets/${market_id}/assets`).doc(symbol).set(asset)
    this.setInAddMode(false)

  }
  public async deleteAsset(marketId: string, assetId: string): Promise<void> {
  
    this.angularFirestore.doc(`markets/${marketId}/assets/${assetId}`).delete()
    // this.fetchAssets(marketId)

  }

  ///////////////
  // Functions //
  ///////////////
  public toggleInUpdateMode(): void {

    this.inAddMode === true ? this.setInUpdateMode(false) : this.setInUpdateMode(true)

  }


  /////////////
  // Getters //
  /////////////
  public getAsset(): Asset {
  
    return this.asset
  
  }


  public async getAssets(marketId: string): Promise<Asset[]> {
  
    if (this.assets !== null && this.assets !== undefined) {

      console.log('this.assets')
      console.log(this.assets)
      return new Promise<Asset[]>( resolve => resolve(this.assets))

    }

    await this.fetchAssets(marketId)
    this.assetsSubject.subscribe(assets => {
      console.log('asset service')
      console.log(assets)
      return new Promise<Asset[]>( resolve => resolve(assets) )
    })

     
  
  }

  public async getAllAssets(): Promise<any>{

    this.assets = []
    
    this.angularFirestore.collection<Market>(`markets`).valueChanges().subscribe(markets => {

      markets.forEach(market => {


          this.angularFirestore.collection<Asset>(`markets/${market.market_id}/assets`).valueChanges().subscribe(assets => {
            console.log(assets)

            this.assets.forEach(existingAsset => {

              this.assets.push(existingAsset)
  
            })
            return new Promise(resolve => {
              resolve(this.assets)

  
          })
        })
      })
    })
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

  
  public getShortTermPrediction(): Prediction[] {

    return this.shortTermPredictions

  }

  public getShortTermTestPredictions(): Prediction[] {

    return this.shortTermTestPredictions

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
  
  }

  
  public setShortTermPredictions(shortTermPredictions: Prediction[]): void {
  
    this.shortTermPredictions = shortTermPredictions
    this.shortTermPredictionsSubject.next(shortTermPredictions)
  
  }

  public setShortTermTestPredictions(shortTermTestPredictions: Prediction[]): void {

    this.shortTermTestPredictions = shortTermTestPredictions
    this.shortTermTestPredictionsSubject.next(shortTermTestPredictions)

  }

  public setInUpdateMode(inUpdateMode: boolean): void {

    this.inUpdateMode = inUpdateMode
    this.inUpdateModeSubject.next(inUpdateMode)
    
  }

}
