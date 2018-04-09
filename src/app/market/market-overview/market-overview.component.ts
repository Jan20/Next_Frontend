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
  public markets: Market[] = []

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private router: Router,
    private marketService: MarketService,
  ) {}

  ngOnInit() {
    this.marketService.fetchMarkets().then(markets => this.markets = markets)
  }

  ///////////////
  // Functions //
  ///////////////
  public showMarketDetails(market: Market): void {
    this.router.navigate(['/markets', market.marketId]);
  }
} 