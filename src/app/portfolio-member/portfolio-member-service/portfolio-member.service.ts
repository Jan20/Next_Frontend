import { Injectable } from '@angular/core'
import { User } from '../../user/user-model/user'
import { Portfolio } from '../../portfolio/portfolio-model/portfolio'
import { PortfolioMember } from './../portfolio-member-model/portfolio-member'
import { Subject } from 'rxjs'
import { UserService } from '../../user/user-service/user.service'
import { AngularFirestore } from 'angularfire2/firestore'
import { AssetService } from '../../asset/asset-service/asset.service'
import { Asset } from '../../asset/asset-model/asset';
import { GenericService } from '../../config/generic-service'

@Injectable()
export class PortfolioMemberService extends GenericService{

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolio: Portfolio
  private portfolioMember: PortfolioMember
  private portfolioMembers: PortfolioMember[]
  private existingPortfolioMembers: PortfolioMember[]

  //////////////
  // Subjects //
  //////////////
  public portfolioMemberSubject: Subject<PortfolioMember> = new Subject<PortfolioMember>()
  public portfolioMembersSubject: Subject<PortfolioMember[]> = new Subject<PortfolioMember[]>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private assetService: AssetService
  
  ) { super() }
  
  ///////////////
  // Functions //
  ///////////////
  public async openPosition(portfolioId: string, asset: Asset): Promise<void>  {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, assetId: asset.assetId, marketId: asset.marketId, market: asset.market, positionOpend: new Date().toDateString(), positionClosed: '', status: 'open'}
    const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members`)
    
    portfolioMembersCollection.valueChanges().subscribe(existingPortfolioMembers => {
      console.log('______________________________________')
      console.log(existingPortfolioMembers)

      if(existingPortfolioMembers.length === 0){

        portfolioMembersCollection.add(portfolioMember)
        console.log('HE')
        portfolioMembersCollection.ref.where('name', '==', name).get().then( portfolioMembers => portfolioMembers.docs.forEach(portfolioMember => portfolioMembersCollection.doc(portfolioMember.id).update({ portfolioMemberId: portfolioMember.id })))

      }

      let flag = false

      existingPortfolioMembers.forEach(existingPortfolioMember => {

        console.log('______________________________________')
        console.log(existingPortfolioMember.assetId)
        console.log(portfolioMember.assetId)
        

        if (existingPortfolioMember.assetId === portfolioMember.assetId) {

          flag = false

        }

      })

      if (flag) {

        portfolioMembersCollection.add(portfolioMember)
        portfolioMembersCollection.ref.where('name', '==', name).get().then( portfolioMembers => portfolioMembers.docs.forEach(portfolioMember => portfolioMembersCollection.doc(portfolioMember.id).update({ portfolioMemberId: portfolioMember.id })))

      }



    })
    
  }

  public async closePosition(portfolioId: string, portfolioMemberId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMembersDocument = this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolios/${portfolioId}/portfolio_members/${portfolioMemberId}`)
    portfolioMembersDocument.update({ status: 'closed', positionClosed: new Date().toDateString()})

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

}
