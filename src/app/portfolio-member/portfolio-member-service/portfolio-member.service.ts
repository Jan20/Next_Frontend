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
  private existingPortfolioMembers: PortfolioMember[]
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


  public async buyAsset(portfolioId: string, asset: Asset, quantity: number) {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, assetId: asset.assetId, marketId: asset.marketId, market: asset.market, quantity: quantity, buyDate: new Date().toDateString(), sellDate: '', status: 'active'}
    const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members`)
    
    portfolioMembersCollection.valueChanges().subscribe(existingPortfolioMembers => {
      
      this.existingPortfolioMembers = existingPortfolioMembers
      
      let oldPortfolioMember: PortfolioMember
      
      this.existingPortfolioMembers.forEach( existingPortfolioMember => {

        if( existingPortfolioMember.assetId === portfolioMember.assetId && existingPortfolioMember.status !== 'sold') {

          oldPortfolioMember = existingPortfolioMember

        }

      })

      console.log('____________________________________________________________________________________')
      console.log(oldPortfolioMember)
      if (oldPortfolioMember !== undefined && oldPortfolioMember !== null) {

        const oldQuantity = +this.portfolioMember.quantity
        const quantityChange = +quantity
        const newQuantity = oldQuantity + quantityChange

        this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${oldPortfolioMember.portfolioMemberId}`).update({

          'quantity' : newQuantity

        })

        this.setInAddMode(false)
        return

      }  else {

        portfolioMembersCollection.add(portfolioMember)
        portfolioMembersCollection.ref.where('name', '==', portfolioMember.name).get().then( portfolioMembersToUpdate => {
          portfolioMembersToUpdate.docs.forEach(portfolioMemberToUpdate => {
            portfolioMembersCollection.doc(portfolioMemberToUpdate.id).update( { portfolioMemberId: portfolioMemberToUpdate.id } )  
        })

        this.setInAddMode(false)
        })

      }
    
      return

    
    })
  }

  public async sellAsset(portfolioId: string, portfolioMemberId: string, quantity: number): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMembersDocument = this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${portfolioMemberId}`)
    await portfolioMembersDocument.valueChanges().subscribe(portfolioMember => this.portfolioMember = portfolioMember)
      
    const oldQuantity = +this.portfolioMember.quantity
    const quantityChange = +quantity
    let newQuantity = oldQuantity - quantityChange

    if (newQuantity < 0) {

      newQuantity = 0

    }

    console.log(newQuantity)

    if (newQuantity === 0) {

      portfolioMembersDocument.update({ quantity: newQuantity, status: 'sold', sellDate: new Date().toDateString()})
      return new Promise<void>(resolve => resolve(null))

    }

    if (newQuantity > 0) {

      portfolioMembersDocument.update( { quantity: newQuantity } )
      return new Promise<void>(resolve => resolve(null))

    }

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
