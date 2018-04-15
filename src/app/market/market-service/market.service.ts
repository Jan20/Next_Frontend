import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Market } from '../market-model/market'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../user/user-service/user.service';
import { User } from '../../user/user-model/user';

@Injectable()
export class MarketService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private market: Market
  private markets: Market[]
  public inAddMode: boolean = false
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public marketSubject: Subject<Market> = new Subject<Market>()
  public marketsSubject: Subject<any> = new Subject<any>()

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
  public toggleInAddMode(): void {
    this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  }

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
    marketCollection.valueChanges().subscribe( markets => markets.forEach(market => 
      marketCollection.ref.where('name', '==', name).get().then( m =>
          m.docs.forEach(m => { marketCollection.doc(m.id).update({ marketId: m.id }) })
        )
      )
    )
    this.setInAddMode(false)
  }

  public async deleteMarket(marketId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc(`users/${this.user.userId}/markets/${marketId}`).delete()
  }

  /////////////
  // Getters //
  /////////////
  public getMarket(): Market { return this.market }
  public getMarkets(): Market[] { return this.markets }
  public getInAddMode(): boolean { return this.inAddMode }
  
  /////////////
  // Setters //
  /////////////
  public setMarket(market): void { this.market = market; this.marketSubject.next(market)}
  public setMarkets(markets: Market[]): void { this.markets = this.markets; this.marketsSubject.next(markets)}
  public setInAddMode(inAddMode: boolean): void {this.inAddMode = inAddMode; this.inAddModeSubject.next(inAddMode)}
}

