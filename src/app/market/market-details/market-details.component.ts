import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Market } from '../market-model/market';
import { MarketService } from '../market-service/market.service';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.scss']
})
export class MarketDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public market: Market = new Market('', '', '')
  private marketId: string

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,
  ) {}

  async ngOnInit() {
    await this.activatedRoute.params.subscribe(params => this.marketService.fetchMarket(params['marketId']).then( market => this.market = market))
  }
}
