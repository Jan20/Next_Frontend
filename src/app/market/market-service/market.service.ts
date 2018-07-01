import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Asset } from '../../asset/asset-model/asset';
import { GenericService } from '../../shared/services/generic-service';
import { Market } from '../market-model/market';

@Injectable()
export class MarketService extends GenericService {

  ///////////////
  // Variables //
  ///////////////
  private market: Market
  private markets: Market[]
  public marketSubject: Subject<Market> = new Subject<Market>()
  public marketsSubject: Subject<any> = new Subject<any>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
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
  
    this.angularFirestore.doc<Market>(`markets/${marketId}`).valueChanges().subscribe(market => this.setMarket(market))
  
  }

  public async fetchMarkets(): Promise<void> {
    
    this.angularFirestore.collection<Market>(`markets`).valueChanges().subscribe(markets => this.setMarkets(markets))
  
  }

  public async addMarket(name: string, id: string, category: string): Promise<void> {
    
    const object: any = {name: name, market_id: id, category: category}
    this.angularFirestore.collection<Market>(`markets`).doc(id).set(object)
    this.setInAddMode(false)
  
  }

  public async deleteMarket(marketId: string): Promise<void> {
  
    
    this.angularFirestore.doc(`markets/${marketId}`).delete()
  
  }

  public async cleanMarketData(marketId: string): Promise<void> {
    
    this.angularFirestore.collection<Asset>(`markets/${marketId}/assets`).valueChanges().subscribe(assets => {

      assets.forEach(asset => {

        this.angularFirestore.doc(`markets/${marketId}/assets/series`).delete()

      })
    }) 
  }

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
    
    await this.angularFirestore.collection<Market>(`markets`).valueChanges().subscribe(markets => {
    
      console.log(markets)
      returnMarkets = markets
        
    })

    return new Promise<Market[]>( resolve => {
      resolve(returnMarkets)})

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

}