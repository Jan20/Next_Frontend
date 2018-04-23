import { Injectable } from '@angular/core';
import { User } from '../../user/user-model/user';
import { UserService } from '../../user/user-service/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AssetService } from '../../asset/asset-service/asset.service';
import { PortfolioMember } from '../../portfolio/portfolio-model/portfolio-member'
import { Subject } from 'rxjs/Subject';
import { Portfolio } from '../portfolio-model/portfolio' 
import { Asset } from '../../asset/asset-model/asset';

@Injectable()
export class PortfolioService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolioMember: PortfolioMember = new PortfolioMember('', '', '', '', '', '', null, '', '', '')
  private portfolioMembers: PortfolioMember[] = []
  private portfolio: Portfolio
  public inAddMode: boolean = false
  

  //////////////
  // Subjects //
  //////////////
  public portfolioMemberSubject: Subject<PortfolioMember> = new Subject<PortfolioMember>()
  public portfolioMembersSubject: Subject<PortfolioMember[]> = new Subject<PortfolioMember[]>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public portfolioSubject: Subject<Portfolio> = new Subject<Portfolio>()


  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private assetService: AssetService
  
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
  public async fetchPortfolio(): Promise<void> {

    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Portfolio>(`users/${this.user.userId}/portfolio`).valueChanges().subscribe(portfolio => this.portfolio = portfolio)

  }


  public async updatePortfolio(cash: number): Promise<void> {

    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Portfolio>(`users/${this.user.userId}/portfolio`).update({

      cash: cash

    })

  }

  ///////////////////////
  // Portfolio Members //
  ///////////////////////
  public async fetchPortfolioMember(portfolioMemberId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    
    this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolio/${portfolioMemberId}`).valueChanges().subscribe( 
      
      portfolioMember => this.setPortfolioMember(portfolioMember)
    
    )
  
  }
  

  public async fetchPortfolioMembers(): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolio`).valueChanges().subscribe( portfolioMembers => this.setPortfolioMembers(portfolioMembers))
  
  }


  public async addPortfolioMember(asset: Asset, quantity: number): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, assetId: asset.assetId, marketId: asset.marketId, market: asset.market, quantity: quantity, buyDate: new Date().toDateString(), sellDate: '', status: 'active'}
    const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolio`)
    portfolioMembersCollection.add(portfolioMember)
    portfolioMembersCollection.valueChanges().subscribe( portfolioMembers => {
      portfolioMembers.forEach(portfolioMember => { 
        portfolioMembersCollection.ref.where('name', '==', portfolioMember.name).get().then( portfolioMembersToUpdate => {
          portfolioMembersToUpdate.docs.forEach(portfolioMemberToUpdate => {
            portfolioMembersCollection.doc(portfolioMemberToUpdate.id).update({ portfolioMemberId: portfolioMemberToUpdate.id })  
          })
        })
      this.setInAddMode(false)
      })   
    })
    
  }


  public async buyAsset(asset: Asset, quantity: number): Promise<void> {
  
    console.log('First Quantity')
    console.log(quantity)
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, assetId: asset.assetId, marketId: asset.marketId, market: asset.market, quantity: quantity, buyDate: new Date().toDateString(), sellDate: '', status: 'active'}
    const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolio`)
    portfolioMembersCollection.valueChanges().subscribe(portfolioMembers => this.portfolioMembers = portfolioMembers)
  
    let existingPortfolioMember: PortfolioMember = null
    
    this.portfolioMembers.forEach( pM => {

      pM.assetId === portfolioMember.assetId ? existingPortfolioMember = pM : null
    
    })

    if (existingPortfolioMember !== null) {

      const newQuantity = existingPortfolioMember.quantity + quantity
      console.log('existingPortfolioMember.portfolioMemberId')
      console.log(existingPortfolioMember.quantity)
      console.log(quantity)
      console.log(newQuantity)
      console.log(existingPortfolioMember.portfolioMemberId)
      this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolio/${existingPortfolioMember.portfolioMemberId}`).update({

        'quantity' : newQuantity

      })
      this.setInAddMode(false)
      console.log('existing portfolio member was updated.')

    }  else {

      portfolioMembersCollection.add(portfolioMember)
      portfolioMembersCollection.valueChanges().subscribe( portfolioMembers => {
        portfolioMembers.forEach(portfolioMember => { 
          portfolioMembersCollection.ref.where('name', '==', portfolioMember.name).get().then( portfolioMembersToUpdate => {
            portfolioMembersToUpdate.docs.forEach(portfolioMemberToUpdate => {
              portfolioMembersCollection.doc(portfolioMemberToUpdate.id).update({ portfolioMemberId: portfolioMemberToUpdate.id })  
            })
          })
        this.setInAddMode(false)
        })   
      })
      console.log('a new portfolio member was created.')

    }

  }

  
  public async deletePortfolioMember(portfolioMemberId): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc(`users/${this.user.userId}/portfolio/portfolioMembers/${portfolioMemberId}`).delete()
  
  }

  /////////////
  // Getters //
  /////////////
  public getPortfolioMember(): PortfolioMember {
  
    return this.portfolioMember
  
  }

  public getPortfolioMembers(): PortfolioMember[] {
  
    return this.portfolioMembers
  
  }

  public getInAddMode(): boolean {
  
    return this.inAddMode
  
  }

  public getPortfolio(): Portfolio {

    return this.portfolio

  }
  
  /////////////
  // Setters //
  /////////////
  public setPortfolioMember(portfolioMember: PortfolioMember): void {
  
    this.portfolioMember = portfolioMember
    this.portfolioMemberSubject.next(portfolioMember)
  
  }

  public setPortfolioMembers(portfolioMembers: PortfolioMember[]): void {
  
    this.portfolioMembers = portfolioMembers
    this.portfolioMembersSubject.next(portfolioMembers)
  
  }

  public setInAddMode(inAddMode: boolean): void {
  
    this.inAddMode = inAddMode
    this.inAddModeSubject.next(inAddMode)
  
  }

  public setPortfolio(portfolio: Portfolio): void {

    this.portfolio  = portfolio

  }
 

}
