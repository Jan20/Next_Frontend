import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Market } from '../market-model/market'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../user/user-service/user.service';

@Injectable()
export class MarketService {

  ///////////////
  // Variables //
  ///////////////
  private market: Market = new Market('', '', '')
  private markets: Market[] = []
  private marketCollection: AngularFirestoreCollection<Market>
  private marketDocument: AngularFirestoreDocument<Market>
  private addMarketFlag: boolean = false

  //////////////
  // Subjects //
  //////////////
  public marketSubject: Subject<Market> = new Subject<Market>()
  public marketsSubject: Subject<any> = new Subject<any>()
  public addMarketFlagSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
  ) {}

  ///////////////
  // Functions //
  ///////////////
  public toggleAddMarketFlag(): void {
    this.addMarketFlag === false ? this.setAddMarketFlag(true) : this.setAddMarketFlag(false)
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public fetchMarket(marketId: string): any {
    this.userService.userSubject.subscribe(user => {
      this.marketDocument = this.angularFirestore.doc(`users/${user.getUserId()}/markets/${marketId}`)
      this.marketDocument.valueChanges().subscribe(market => {
        this.setMarket(market)
        this.marketSubject.next(market)
      })
    })

  }

  public fetchMarkets(): void {
    this.userService.userSubject.subscribe(user => {
      this.marketCollection = this.angularFirestore.collection(`users/${user.getUserId()}/markets`)
      this.marketCollection.valueChanges().subscribe(markets => {
        console.log('______________________________________________________________')
        console.log(markets)
        console.log('______________________________________________________________')
        let newMarkets: Market[] = []
        markets.forEach(market => newMarkets.push(new Market(market.marketId, market.name, market.category)))
        this.setMarkets(newMarkets)
        this.marketsSubject.next(newMarkets)
      })
    })
    
  }

  public addMarket(name: string, category: string): void {
    const market: any = { name: name, category: category }
    this.marketCollection.add(market)
    this.marketCollection.valueChanges().subscribe( markets => {
      markets.forEach(market => { 
        this.marketCollection.ref.where('name', '==', market.name).get().then( m => {
          m.docs.forEach(m => {
            this.marketCollection.doc(m.id).update({ marketId: m.id })  
          })
        })
      })
    })
    this.setAddMarketFlag(false)
  }

  public deleteMarket(market: Market): void {
    this.angularFirestore.doc('users/' + this.userService.getUser().getUserId() + '/markets/' + market.getMarketId()).delete()
  }

  /////////////
  // Getters //
  /////////////
  public getMarket(): Market {
    return this.market
  }

  public getMarkets(): Market[] {
    return this.markets
  }

  public getAddMarketFlag(): boolean {
    return this.addMarketFlag
  }

  /////////////
  // Setters //
  /////////////
  public setMarket(market: Market): void {
    this.market = market
    this.marketSubject.next(market)
  }

  public setMarkets(markets: Market[]): void {
    this.markets = markets
    this.marketsSubject.next(markets)
  }

  public setAddMarketFlag(addMarketFlag: boolean): void {
    this.addMarketFlag = addMarketFlag
    this.addMarketFlagSubject.next(addMarketFlag)
  }
}

