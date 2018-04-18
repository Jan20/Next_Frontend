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

  // ///////////////
  // // Variables //
  // ///////////////
  private user: User
  private portfolioMember: PortfolioMember = new PortfolioMember('', '', '', '', null, '', '')
  private portfolioMembers: PortfolioMember[] = []
  // private assetDocument: AngularFirestoreDocument<Asset>
  // private assetCollection: AngularFirestoreCollection<Asset>
  // private timeSeries: Entry[]
  // private seriesCollection: AngularFirestoreCollection<Entry>
  // private trainPredictions: Prediction[] = []
  // private trainPredictionsCollection: AngularFirestoreCollection<Prediction>
  // private testPredictions: Prediction[] = []
  // private testPredictionsCollection: AngularFirestoreCollection<Prediction>
  // private market: Market
  // private marketDocument: AngularFirestoreDocument<Market>
  public inAddMode: boolean = false

  // //////////////
  // // Subjects //
  // //////////////
  public portfolioMemberSubject: Subject<PortfolioMember> = new Subject<PortfolioMember>()
  public portfolioMembersSubject: Subject<PortfolioMember[]> = new Subject<PortfolioMember[]>()
  // public timeSeriesSubject: Subject<any> = new Subject<any>()
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  // public trainPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()
  // public testPredictionsSubject: Subject<Prediction[]> = new Subject<Prediction[]>()

  // //////////////////
  // // Constructors //
  // //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private assetService: AssetService
  ) {}

  // ///////////////
  // // Functions //
  // ///////////////
  // public toggleInAddMode(): void {
  //   this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
  // }

  // //////////////////////////
  // // Retrieve Predictions //
  // //////////////////////////
  // public async fetchTimeSeries(marketId: string, assetId: string): Promise<void> {
  //   await this.userService.getUser().then(user => this.user = user)
  //   this.seriesCollection = this.angularFirestore.collection(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/series`)
  //   this.seriesCollection.valueChanges().subscribe(entries => this.setTimeSeries(entries))
  // }

  // public async fetchTrainPredictions(marketId: string, assetId: string): Promise<void> {
  //   await this.userService.getUser().then(user => this.user = user)
  //   this.trainPredictionsCollection = this.angularFirestore.collection(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/train_predictions`)
  //   this.trainPredictionsCollection.valueChanges().subscribe(trainPredictions => {this.setTrainPredictions(trainPredictions)
  //   })
  // }

  // public async fetchTestPredictions(marketId: string, assetId: string): Promise<void> {
  //   await this.userService.getUser().then(user => this.user = user)
  //   this.testPredictionsCollection = this.angularFirestore.collection(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}/test_predictions`)
  //   this.testPredictionsCollection.valueChanges().subscribe(testPredictions => this.setTestPredictions(testPredictions))
  // }

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

  public async addPortfolioMember(marketId: string, assetId: string): Promise<void> {
    await this.userService.getUser().then(user => this.user = user)
    this.angularFirestore.doc<Asset>(`users/${this.user.userId}/markets/${marketId}/assets/${assetId}`).valueChanges().subscribe(asset => {
      const portfolioMember: any = { name: asset.name, symbol: asset.symbol, market: asset.market, series: asset.series, buyDate: new Date().toDateString(), sellDate: '' }
      const portfolioMembersCollection = this.angularFirestore.collection<PortfolioMember>(`users/${this.user.userId}/portfolio/portfolioMembers`)
      portfolioMembersCollection.add(portfolioMember)
      portfolioMembersCollection.valueChanges().subscribe( portfolioMembers => {
        portfolioMembers.forEach(portfolioMember => { 
          portfolioMembersCollection.ref.where('name', '==', portfolioMember.name).get().then( portfolioMembersToUpdate => {
            portfolioMembersToUpdate.docs.forEach(portfolioMemberToUpdate => {
              portfolioMembersCollection.doc(portfolioMemberToUpdate.id).update({ portfolioMemberId: portfolioMemberToUpdate.id })  
            })
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

  // public getTimeSeries(): Entry[] {
  //   return this.timeSeries
  // }

  // public getTrainPredictions(): Prediction[] {
  //   return this.trainPredictions
  // }

  // public getTestPredictions(): Prediction[] {
  //   return this.testPredictions
  // }

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
 
  // public setTimeSeries(timeSeries: Entry[]): void {
  //   this.timeSeries = timeSeries
  //   this.timeSeriesSubject.next(timeSeries)
  // }

  // public setTrainPredictions(trainPredictions: Prediction[]): void {
  //   this.trainPredictions = trainPredictions
  //   this.trainPredictionsSubject.next(trainPredictions)
  // }

  // public setTestPredictions(testPredictions: Prediction[]): void {
  //   this.testPredictions = testPredictions
  //   this.testPredictionsSubject.next(testPredictions)
  //   console.log(testPredictions)
  // }

}
