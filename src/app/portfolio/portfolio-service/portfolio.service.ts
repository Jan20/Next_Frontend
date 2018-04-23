import { Injectable } from '@angular/core';
import { User } from '../../user/user-model/user';
import { UserService } from '../../user/user-service/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AssetService } from '../../asset/asset-service/asset.service';
import { Subject } from 'rxjs/Subject';
import { Portfolio } from '../portfolio-model/portfolio' 
import { Asset } from '../../asset/asset-model/asset';

@Injectable()
export class PortfolioService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolio: Portfolio
  private portfolios: Portfolio[]
  public inAddMode: boolean = false
  

  //////////////
  // Subjects //
  //////////////
  public portfolioSubject: Subject<Portfolio> = new Subject<Portfolio>()
  public portfoliosSubject: Subject<Portfolio[]> = new Subject<Portfolio[]>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()


  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private angularFirestore: AngularFirestore,
    private userService: UserService,
  
  ) {}

  
  ///////////////
  // Functions //
  ///////////////
  public toggleInAddMode(): void {
  
    this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  
  }


  ////////////////////////
  // Portfolio Document //
  ////////////////////////
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


  public async updatePortfolio(portfolioId: string, cash: number): Promise<void> {
    console.log('hey')
    console.log(cash)
    console.log(portfolioId)
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Portfolio>(`users/${this.user.userId}/portfolios/${portfolioId}`).update({ cash: cash })

  }


  /////////////
  // Getters //
  /////////////
  public async getPortfolio(): Promise<any> {

    if (this.user) {
    
      return new Promise(resolve => resolve(this.user))
    
    } 
    
    return new Promise( resolve => {
  
      this.angularFirestore.collection<Portfolio>(`/users/${this.user.userId}/portfolios`).valueChanges().subscribe(portfolios => resolve(portfolios[0]))

    })

  }

  public getPortfolios(): Portfolio[] {

      return this.portfolios

  }
  
  public getInAddMode(): boolean {
  
    return this.inAddMode
  
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

  public setInAddMode(inAddMode: boolean): void {
  
    this.inAddMode = inAddMode
    this.inAddModeSubject.next(inAddMode)
  
  }
}
