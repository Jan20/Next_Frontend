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
  public async fetchMarket(marketId: string): Promise<Market> {
    await this.userService.getUser().then(user => this.user = user)
    return new Promise<Market>(resolve => this.angularFirestore.doc<Market>(`users/${this.user.userId}/markets/${marketId}`).valueChanges().subscribe(market => resolve(market)))
  }

  public async fetchMarkets(): Promise<Market[]> {
    await this.userService.getUser().then(user => this.user = user)
    return new Promise<Market[]>(resolve => this.angularFirestore.collection<Market>(`users/${this.user.userId}/markets`).valueChanges().subscribe(markets => resolve(markets)))
  }

  public async addMarket(name: string, category: string): Promise<void> {
    const marketCollection = this.angularFirestore.collection<Market>(`users/${this.user.userId}/markets`)
    await this.userService.getUser().then(user => this.user = user)
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
  public getInAddMode(): boolean {
    return this.inAddMode
  }

  // public getMarkets(): Market[] {
  //   return this.markets
  // }

  /////////////
  // Setters //
  /////////////
  public setInAddMode(inAddMode: boolean): void {
    this.inAddMode = inAddMode
    this.inAddModeSubject.next(inAddMode)
  }

  // public setMarkets(markets: Market[]): void {
  //   this.markets = this.markets
  //   this.marketsSubject.next(markets)
  // }

}

