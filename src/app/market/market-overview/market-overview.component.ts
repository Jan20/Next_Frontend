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
  public title: string = 'In which markets do you intend to invest in?'
  public markets: Market[] = []

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    public marketService: MarketService,

  ) {}

  ngOnInit() {

    this.marketService.fetchMarkets()
    this.marketService.marketsSubject.subscribe(markets => this.markets = markets)

  }

  ///////////////
  // Functions //
  ///////////////
  public showMarketDetails(market: Market): void {

    this.router.navigate([`markets/${market.marketId}/predictions`]);

  }
} 