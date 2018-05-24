import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market-service/market.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-market-settings',
  templateUrl: './market-settings.component.html',
  styleUrls: ['./market-settings.component.scss']
})
export class MarketSettingsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Market Settings'

  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,

  ) { }

  ngOnInit() {}


  ///////////////
  // Functions //
  ///////////////
  public deleteMarket(): void {
    
    this.activatedRoute.params.subscribe(params => {
    
      this.marketService.deleteMarket(params['marketId'])
      this.router.navigate([`/markets`])
    
    })
  }

  public cleanMarketData(): void {

    this.activatedRoute.params.subscribe(params => {

      this.marketService.cleanMarketData(params['marketId'])
      this.router.navigate([`/markets/${params['marketId']}`])

    })

  }


}
