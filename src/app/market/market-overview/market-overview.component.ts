import { Component, OnInit, ViewChild } from '@angular/core'
import { Market } from '../market-model/market';
import { MarketService } from '../market-service/market.service';

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

  public ngOnInit() {}
} 