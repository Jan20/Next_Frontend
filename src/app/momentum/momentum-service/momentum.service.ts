import { Injectable } from '@angular/core'
import { GenericService } from '../../shared/services/generic-service'
import { Asset } from '../../asset/asset-model/asset';

@Injectable()
export class MomentumService extends GenericService{

  // ///////////////
  // // Variables //
  // ///////////////
  // private user: User
  // private sharpeRatio: SharpeRatio
  // private sharpeRatioSeries: SharpeRatio[]

  // //////////////
  // // Subjects //
  // //////////////
  // public portfolioSubject: Subject<Portfolio> = new Subject<Portfolio>()
  // public portfoliosSubject: Subject<Portfolio[]> = new Subject<Portfolio[]>()

  // //////////////////
  // // Constructors //
  // //////////////////
  constructor(
  
  
  ) { 
    
    super() 
  
  }

  
  // ///////////////
  // // Functions //
  // ///////////////
  // public async fetchSharpeRatio(portfolioId: string): Promise<void> {

  //   await this.userService.getUser().then(user => this.user = user)
  //   this.angularFirestore.doc<Portfolio>(`users/${this.user.userId}/portfolios/${portfolioId}`).valueChanges().subscribe(portfolio => this.setPortfolio(portfolio))

  // }

  
  // public async fetchPortfolios(): Promise<void> {

  //   await this.userService.getUser().then( user => this.user = user)
  //   this.angularFirestore.collection<Portfolio>(`users/${this.user.userId}/portfolios`).valueChanges().subscribe(portfolios => this.setPortfolios(portfolios))

  // }


  // public async addPortfolio(name: string, cash: number): Promise<void> {
    
  //   await this.userService.getUser().then(user => this.user = user)
  //   const newPortfolio: any = {name: name, cash: cash, assets: 0}
  //   const portfolioCollection = this.angularFirestore.collection<Portfolio>(`/users/${this.user.userId}/portfolios`)
  //   portfolioCollection.add(newPortfolio)
  //   portfolioCollection.ref.where('name', '==', name).get().then( portfolios => portfolios.docs.forEach(portfolio => portfolioCollection.doc(portfolio.id).update({ portfolioId: portfolio.id })))
  //   this.setInAddMode(false)

  // }


  // public async updatePortfolio(portfolioId: string): Promise<void> {

  //   await this.userService.getUser().then(user => this.user = user)

  // }


  // /////////////
  // // Getters //
  // /////////////
  // public getPortfolio(): Portfolio {

  //   return this.portfolio

  // }

  // public getPortfolios(): Portfolio[] {

  //   return this.portfolios

  // }
  
  // /////////////
  // // Setters //
  // /////////////
  // public setPortfolio(portfolio: Portfolio): void {

  //   this.portfolio  = portfolio
  //   this.portfolioSubject.next(portfolio)

  // }
 
  // public setPortfolios(portfolios: Portfolio[]): void {

  //   this.portfolios = portfolios
  //   this.portfoliosSubject.next(portfolios)

  // }


  // Split the array into halves and merge them recursively 
  public mergeSort(arr: Asset[]) {

    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return this.merge(
    
      this.mergeSort(left),
      this.mergeSort(right)
    
    )
  }

  // compare the arrays item by item and return the concatenated result
  private merge (left:Asset[], right:Asset[]) {
    
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
      
      if (left[indexLeft].longTermSharpeRatio > right[indexRight].longTermSharpeRatio) {
      
        result.push(left[indexLeft])
        indexLeft++
      
      } else {
      
        result.push(right[indexRight])
        indexRight++
      
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }

}
