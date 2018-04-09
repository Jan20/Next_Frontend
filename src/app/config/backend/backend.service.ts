import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {

  ///////////////
  // Variables //
  ///////////////
  // private results: any[];
  // private seeds: Seed[];
  // private timeline: Timeline;
  // private stock: Stock;

  public constructor(

    public httpClient: HttpClient,
    // public angularFireDatabase: AngularFireDatabase,
    // public seedService: SeedService

  ) {
    // this.connectToBackend()
    // this.seeds = this.seedService.getDax();

  }

  ///////////////
  // Functions //
  ///////////////
  public connectToBackend(): void {
    console.log('______________________________________________________')
    console.log('connection request started')
    console.log('______________________________________________________')
    this.httpClient.get('https://us-central1-next-001.cloudfunctions.net/stocks').subscribe(res => {
      console.log('______________________________________________________')
      console.log(res)
      console.log('______________________________________________________')    })
    console.log('______________________________________________________')
    console.log('function has been executed')
    console.log('______________________________________________________')

  }


  // public getMarket(market: string): void {

  //   for (let i = 1; i < this.seeds.length; i++) {
        
  //     this.httpClient.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + this.seeds[i].getSymbol() +
  //     '&outputsize=compact&apikey=6404')
  //       .subscribe(data => {
  //         this.timeline = new Timeline();
  //         for (const key in data['Monthly Time Series']) {
            
  //           if (data['Monthly Time Series'].hasOwnProperty(key)) {

  //             this.stock = new Stock();
  //             this.stock.setName(this.seeds[i].getName());
  //             this.stock.setSymbol(data['Meta Data']['2. Symbol']);
  //             this.stock.setClose(data['Monthly Time Series'][key]['4. close']);
  //             this.stock.setDate(key);
  //             this.timeline.getStocks().push(this.stock);

  //           } else {

  //             alert('Market data could not have been fetched');
  //             return;

  //           }

  //         }
  //         console.log(this.timeline);
  //         for (let j = 0; j < 12; j++) {
            
  //           const stock = this.timeline.getStocks()[j];

  //           stock.setChange(
  //             (this.timeline.getStocks()[j].getClose() -
  //               this.timeline.getStocks()[j + 1].getClose() ) /
  //               this.timeline.getStocks()[j + 1].getClose()
  //             );
  //           this.angularFireDatabase.object('Dax' + '/' + this.seeds[i].getName() + '/' + stock.getDate()).set(stock);
  //         }
  //     });
  //   }

  // }

  // private execute(seed: Seed): void {

  // }

}
