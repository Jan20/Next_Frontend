import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Market } from '../market-model/market'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../user/user-service/user.service';
import { User } from '../../user/user-model/user';
import { GenericService } from '../../shared/services/generic-service'
import { Asset } from '../../asset/asset-model/asset'

@Injectable()
export class MarketService extends GenericService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private market: Market
  private markets: Market[]
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public marketSubject: Subject<Market> = new Subject<Market>()
  public marketsSubject: Subject<any> = new Subject<any>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private userService: UserService,
    private angularFirestore: AngularFirestore,
  
  ) {

    super()

  }

  ///////////////
  // Functions //
  ///////////////


  /////////////////////
  // CRUD Operations //
  /////////////////////
  public async fetchMarket(marketId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Market>(`users/${this.user.userId}/markets/${marketId}`).valueChanges().subscribe(market => this.setMarket(market))
  
  }

  public async fetchMarkets(): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Market>(`users/${this.user.userId}/markets`).valueChanges().subscribe(markets => this.setMarkets(markets))
  
  }

  public async addMarket(name: string, category: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const marketCollection = this.angularFirestore.collection<Market>(`users/${this.user.userId}/markets`)
    const object: any = {name: name, category: category}
    marketCollection.add(object)
    marketCollection.ref.where('name', '==', name).get().then( markets => markets.docs.forEach(market => marketCollection.doc(market.id).update({ marketId: market.id })))
    this.setInAddMode(false)
  
  }

  public async deleteMarket(marketId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc(`users/${this.user.userId}/markets/${marketId}`).delete()
  
  }

  public async cleanMarketData(marketId: string): Promise<void> {

    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<Asset>(`users/${this.user.userId}/markets/${marketId}/assets`).valueChanges().subscribe(assets => {

      assets.forEach(asset => {

        this.angularFirestore.doc(`users/${this.user.userId}/markets/${marketId}/assets/series`).delete()

      })
    }) 
  }

  public async

  /////////////
  // Getters //
  /////////////
  public getMarket(): Market { 
    
    return this.market 
  
  }
  

  public async getMarkets(): Promise<Market[]> { 
    
    if (this.markets !== null && this.markets !== undefined) {

      return new Promise<Market[]>(resolve => resolve(this.markets))
      
    }

    let returnMarkets: Market[]
    await this.userService.getUser().then(user => this.user = user)
    await this.angularFirestore.collection<Market>(`users/${this.user.userId}/markets`).valueChanges().subscribe(markets => {
    
      console.log(markets)
      returnMarkets = markets
        
    })

    return new Promise<Market[]>( resolve => {
      resolve(returnMarkets)})


  }
  
  
  public getInAddMode(): boolean { 
    
    return this.inAddMode 
  
  }
  
  /////////////
  // Setters //
  /////////////
  public setMarket(market): void { 
    
    this.market = market
    this.marketSubject.next(market)
  
  }
  
  
  public setMarkets(markets: Market[]): void { 
    
    this.markets = markets
    this.marketsSubject.next(markets)
  
  }

  
  public setInAddMode(inAddMode: boolean): void {
    
    this.inAddMode = inAddMode
    this.inAddModeSubject.next(inAddMode)}

  }

