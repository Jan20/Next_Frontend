import { Component, OnInit, ViewChild } from '@angular/core'
import { Market } from '../market-model/market';
import { MarketService } from '../market-service/market.service';
import { ActivatedRoute } from '@angular/router';

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
    public marketService: MarketService,
  ) {}

  public ngOnInit() {

    this.marketService.fetchMarkets()
    this.marketService.marketsSubject.subscribe(markets => {
      this.markets = markets
    })
  }
} 