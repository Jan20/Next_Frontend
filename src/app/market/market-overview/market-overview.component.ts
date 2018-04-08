import { Component, OnInit, ViewChild } from '@angular/core'
import { Market } from '../market-model/market';
import { MarketService } from '../market-service/market.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Markets'
  public markets: Market[] = this.marketService.getMarkets()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private router: Router,
    private marketService: MarketService,
  ) {}

  ngOnInit() {
    this.marketService.marketsSubject.subscribe(markets => {
      this.markets = markets
    })
    this.markets = this.marketService.getMarkets()
    this.marketService.fetchMarkets()
  }

  ///////////////
  // Functions //
  ///////////////
  public showMarketDetails(market: Market): void {
    this.marketService.setMarket(market)
    this.router.navigate(['/markets', market.getMarketId()]);
  }
} 