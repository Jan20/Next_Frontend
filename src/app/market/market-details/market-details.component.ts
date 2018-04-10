import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,
  ) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.marketService.fetchMarket(params['marketId']).then( market => this.market = market))
  }
  
  ///////////////
  // Functions //
  ///////////////
  public test(): void {
    this.router.navigate([`/markets/JSarXOg0DPIfidrarzMz/settings`])
    console.log('HEY')
  }
  
  public showMarketSettings(): void {
    this.activatedRoute.params.subscribe(params => {
      const marketId = params['marketId']
      this.router.navigate([`/markets/${marketId}/settings`])
    })
  }



}
