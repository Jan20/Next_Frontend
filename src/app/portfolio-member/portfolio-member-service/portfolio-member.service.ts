import { Injectable } from '@angular/core'
import { User } from '../../user/user-model/user'
import { Portfolio } from '../../portfolio/portfolio-model/portfolio'
import { PortfolioMember } from './../portfolio-member-model/portfolio-member'
import { Subject } from 'rxjs/Subject'
import { UserService } from '../../user/user-service/user.service'
import { AngularFirestore } from 'angularfire2/firestore'
import { AssetService } from '../../asset/asset-service/asset.service'
import { Asset } from '../../asset/asset-model/asset';


@Injectable()
export class PortfolioMemberService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolio: Portfolio
  private portfolioMember: PortfolioMember
  private portfolioMembers: PortfolioMember[]
  public inAddMode: boolean = false
  

  //////////////
  // Subjects //
  //////////////
  public portfolioMemberSubject: Subject<PortfolioMember> = new Subject<PortfolioMember>()
  public portfolioMembersSubject: Subject<PortfolioMember[]> = new Subject<PortfolioMember[]>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()


  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private assetService: AssetService
  
  ) {}

  
  ///////////////
  // Functions //
  ///////////////
  public toggleInAddMode(): void {
  
    this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  
  }

  
  ////////////////////////
  // Database Functions //
  ////////////////////////
  public async fetchPortfolioMember(portfolioId: string, portfolioMemberId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${portfolioMemberId}`).valueChanges().subscribe( portfolioMember => this.setPortfolioMember(portfolioMember))
  
  }
  

  public async fetchPortfolioMembers(portfolioId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members`).valueChanges().subscribe(portfolioMembers => this.setPortfolioMembers(portfolioMembers))
  
  }


  public async buyAsset(portfolioId: string, asset: Asset, quantity: number): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, assetId: asset.assetId, marketId: asset.marketId, market: asset.market, quantity: quantity, buyDate: new Date().toDateString(), sellDate: '', status: 'active'}
    const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members`)
    portfolioMembersCollection.valueChanges().subscribe(portfolioMembers => this.portfolioMembers = portfolioMembers)
  
    let existingPortfolioMember: PortfolioMember
    
    this.portfolioMembers.forEach( pM => {

      existingPortfolioMember = pM.assetId === portfolioMember.assetId ? pM : null
    
    })

    if (existingPortfolioMember !== undefined && existingPortfolioMember !== null) {

      console.log('existingPortfolioMember')
      console.log(existingPortfolioMember)
      const newQuantity = +existingPortfolioMember.quantity + +quantity

      console.log(newQuantity)

      this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${existingPortfolioMember.portfolioMemberId}`).update({

        'quantity' : newQuantity

      })
      this.setInAddMode(false)
      console.log('existing portfolio member was updated.')

    }  else {

      portfolioMembersCollection.add(portfolioMember)
      portfolioMembersCollection.ref.where('name', '==', portfolioMember.name).get().then( portfolioMembersToUpdate => {
        portfolioMembersToUpdate.docs.forEach(portfolioMemberToUpdate => {
          portfolioMembersCollection.doc(portfolioMemberToUpdate.id).update( { portfolioMemberId: portfolioMemberToUpdate.id } )  
      })
      this.setInAddMode(false)
      })
      console.log('a new portfolio member was created.')

    }

  }


  public async sellAsset(portfolioId: string, portfolioMemberId: string, quantity: number): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMembersDocument = this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${portfolioMemberId}`)
    portfolioMembersDocument.valueChanges().subscribe(portfolioMember => {
      
      if (portfolioMember.quantity < 0 ) {
        return new Promise<void>(resolve => resolve(null))

      }

      const newQuantity = (+portfolioMember.quantity) - (+quantity)

      console.log(newQuantity)

      if (newQuantity === 0) {

        portfolioMembersDocument.update({ quantity: newQuantity, status: 'sold', sellDate: new Date().toDateString()})
        return new Promise<void>(resolve => resolve(null))

      }

      if (newQuantity > 0) {

        portfolioMembersDocument.update( { quantity: newQuantity } )
        return new Promise<void>(resolve => resolve(null))

      } 

      if (newQuantity < 0) {

        portfolioMembersDocument.update({ quantity: newQuantity, status: 'sold', sellDate: new Date().toDateString()})
        return new Promise<void>(resolve => resolve(null))

      }

    
    })

  }
  
  public async deletePortfolioMember(portfolioId: string, portfolioMemberId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${portfolioMemberId}`).delete()
  
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

}
