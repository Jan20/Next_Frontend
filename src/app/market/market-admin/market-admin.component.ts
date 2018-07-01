import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Market } from '../market-model/market';
import { MarketService } from '../market-service/market.service';

@Component({
  selector: 'app-market-admin',
  templateUrl: './market-admin.component.html',
  styleUrls: ['./market-admin.component.scss']
})
export class MarketAdminComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'In which market do you like to invest in?'
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
  public switchView(market: Market): void {

    this.router.navigate([`admin/markets/${market.market_id}`]);

  }
} 