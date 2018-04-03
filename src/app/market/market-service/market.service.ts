import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Market } from '../market-model/market'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../user/user-service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class MarketService {

  ///////////////
  // Variables //
  ///////////////
  private market: Market = new Market('', '', '')
  private markets: Market[] = []
  private marketCollection: AngularFirestoreCollection<Market> = this.angularFirestore.collection('users/'+1+'/markets')
  public addMarketFlag: boolean = false

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
    private router: Router,
  ) {

  }

  ///////////////
  // Functions //
  ///////////////
  public showMarketDetails(market: Market): void {
    this.router.navigate(['/markets', market.getMarketId()]);
  }

  public toggleAddMarketFlag(): void {
    if( this.addMarketFlag === false) {
      this.addMarketFlag = true
      this.addMarketFlagSubject.next(true)
    } else {
      this.addMarketFlag = false
      this.addMarketFlagSubject.next(false)
    }
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public fetchMarket(marketId: string): any {
    let marketDocument: AngularFirestoreDocument<Market> = this.angularFirestore.doc('users/'+this.userService.getUser().getUserId()+'/markets/'+marketId)
    marketDocument.valueChanges().subscribe(market => {
      this.setMarket(market)
    })
  }

  public fetchMarkets(): void {
    console.log('fetchMarkets')
      this.marketCollection = this.angularFirestore.collection('users/'+this.userService.getUser().getUserId()+'/markets')
      this.marketCollection.valueChanges().subscribe(markets => {
        let m: Market[] = []
        markets.forEach(market => {
          m.push(new Market(market.marketId, market.name, market.category))
        })
        console.log('________________________________________________?')
        console.log(m)
        this.marketsSubject.next(m) 
        this.setMarkets(m)
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
    this.angularFirestore.doc('users/'+this.userService.getUser().getUserId()+'/markets/'+market.getMarketId()).delete()
    this.router.navigate(['/markets']);
  }

  /////////////
  // Getters //
  /////////////
  public getMarket(marketId: string): Market {
    console.log('getMarket?')
    console.log('________________________________________________?')
    console.log(marketId)
    if (this.market.name == '') {
      this.fetchMarket(marketId)
      return this.market
    } else {
      console.log(this.market)
      return this.market
    }
  }

  public getMarkets(): Market[] {
    console.log('getMarkets?')

    if (this.markets == []) {
      this.fetchMarkets()
      return this.markets
    } else {
      return this.markets
    }
  }


  /////////////
  // Setters //
  /////////////
  public setMarket(market: Market): void {
    this.market = market
    console.log(market)
    this.marketSubject.next(market)
  }

  public setMarkets(markets: Market[]): void {
    this.markets = markets
    this.marketsSubject.next(markets)
    console.log(markets)
  }

  public setAddMarketFlag(addMarketFlag: boolean): void {
    this.addMarketFlag = addMarketFlag
    this.addMarketFlagSubject.next(addMarketFlag)
  }
}

