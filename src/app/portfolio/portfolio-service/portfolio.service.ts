import { Injectable } from '@angular/core'
import { User } from '../../user/user-model/user'
import { UserService } from '../../user/user-service/user.service'
import { AngularFirestore } from 'angularfire2/firestore'
import { AssetService } from '../../asset/asset-service/asset.service'
import { Subject } from 'rxjs/Subject'
import { Portfolio } from '../portfolio-model/portfolio' 
import { Asset } from '../../asset/asset-model/asset'
import { GenericService } from '../../config/generic-service'

@Injectable()
export class PortfolioService extends GenericService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolio: Portfolio
  private portfolios: Portfolio[]

  //////////////
  // Subjects //
  //////////////
  public portfolioSubject: Subject<Portfolio> = new Subject<Portfolio>()
  public portfoliosSubject: Subject<Portfolio[]> = new Subject<Portfolio[]>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private angularFirestore: AngularFirestore,
    private userService: UserService,
  
  ) { 
    
    super() 
  
  }

  
  ///////////////
  // Functions //
  ///////////////
  public async fetchPortfolio(portfolioId: string): Promise<void> {

    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Portfolio>(`users/${this.user.userId}/portfolios/${portfolioId}`).valueChanges().subscribe(portfolio => this.setPortfolio(portfolio))

  }

  
  public async fetchPortfolios(): Promise<void> {

    await this.userService.getUser().then( user => this.user = user)
    this.angularFirestore.collection<Portfolio>(`users/${this.user.userId}/portfolios`).valueChanges().subscribe(portfolios => this.setPortfolios(portfolios))

  }


  public async addPortfolio(name: string, cash: number): Promise<void> {
    
    await this.userService.getUser().then(user => this.user = user)
    const newPortfolio: any = {name: name, cash: cash, assets: 0}
    const portfolioCollection = this.angularFirestore.collection<Portfolio>(`/users/${this.user.userId}/portfolios`)
    portfolioCollection.add(newPortfolio)
    portfolioCollection.ref.where('name', '==', name).get().then( portfolios => portfolios.docs.forEach(portfolio => portfolioCollection.doc(portfolio.id).update({ portfolioId: portfolio.id })))
    this.setInAddMode(false)

  }


  public async updatePortfolio(portfolioId: string): Promise<void> {

    await this.userService.getUser().then(user => this.user = user)

  }


  /////////////
  // Getters //
  /////////////
  public getPortfolio(): Portfolio {

    return this.portfolio

  }

  public getPortfolios(): Portfolio[] {

    return this.portfolios

  }
  
  /////////////
  // Setters //
  /////////////
  public setPortfolio(portfolio: Portfolio): void {

    this.portfolio  = portfolio
    this.portfolioSubject.next(portfolio)

  }
 
  public setPortfolios(portfolios: Portfolio[]): void {

    this.portfolios = portfolios
    this.portfoliosSubject.next(portfolios)

  }

}
