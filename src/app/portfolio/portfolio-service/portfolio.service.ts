import { Injectable } from '@angular/core';
import { User } from '../../user/user-model/user';
import { UserService } from '../../user/user-service/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AssetService } from '../../asset/asset-service/asset.service';
import { PortfolioMember } from '../../portfolio/portfolio-model/portfolio-member'
import { Subject } from 'rxjs/Subject';
import { Asset } from '../../asset/asset-model/asset';

@Injectable()
export class PortfolioService {

  ///////////////
  // Variables //
  ///////////////
  private user: User
  private portfolioMember: PortfolioMember = new PortfolioMember('', '', '', '', '', null, '', '')
  private portfolioMembers: PortfolioMember[] = []
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

  /////////////////////
  // CRUD Operations //
  /////////////////////
  public async fetchPortfolioMember(portfolioMemberId: string): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<PortfolioMember>(`users/${this.user.userId}/portfolio/portfolioMembers/${portfolioMemberId}`).valueChanges().subscribe( portfolioMember => this.setPortfolioMember(portfolioMember))
  
  }
  
  public async fetchPortfolioMembers(): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolio/portfolioMembers`).valueChanges().subscribe( portfolioMembers => this.setPortfolioMembers(portfolioMembers))
  
  }

  public async addPortfolioMember(asset: Asset, quantity: number): Promise<void> {
  
    await this.userService.getUser().then(user => this.user = user)
    const portfolioMember: any = { name: asset.name, symbol: asset.symbol, marketId: asset.marketId, market: asset.market, quantity: quantity, buyDate: new Date().toDateString(), sellDate: '' }
    console.log(portfolioMember)
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
