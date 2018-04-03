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
  private marketCollection: AngularFirestoreCollection<Market> = this.angularFirestore.collection('users/'+this.userService.getUser().getUserId()+'/markets')
  public addMarketFlag: boolean = false
  public addMarketFlagSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {}

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

  public setAddMarketFlag(addMarketFlag: boolean): void {
    this.addMarketFlag = addMarketFlag
    this.addMarketFlagSubject.next(addMarketFlag)
  }

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public getMarket(marketId: string): any {
    let marketDocument: AngularFirestoreDocument<Market> = this.angularFirestore.doc('users/'+this.userService.getUser().getUserId()+'/markets/'+marketId)
    marketDocument.valueChanges().subscribe(market => {return market})
  }

  public getMarkets(): any {
    let markets: Market[] = []
    this.marketCollection.valueChanges().subscribe(markets => {
      markets.forEach(market => {
        markets.push(new Market(market.marketId, market.getName(), market.getCategory()))
      })
      return markets
    })
  }

  public addMarket(name: string, category: string): void {
  
    const market: any = { name: name, category: category }
    this.marketCollection.add(market)
    this.marketCollection.valueChanges().subscribe( markets => {
      markets.forEach(market => { 
        this.marketCollection.ref.where('name', '==', market.name).get().then( m => {
          m.docs.forEach(m => {
            this.marketCollection.doc(m.id).update({ id: m.id })  
          })
        })
      })
    })
  }

  public deleteMarket(market: Market): void {
    this.angularFirestore.doc('users/'+this.userService.getUser().getUserId()+'/markets/'+market.getMarketId()).delete()
    this.router.navigate(['/markets']);
  }
}
