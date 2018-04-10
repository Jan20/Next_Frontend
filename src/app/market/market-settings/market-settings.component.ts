import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market-service/market.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-market-settings',
  templateUrl: './market-settings.component.html',
  styleUrls: ['./market-settings.component.scss']
})
export class MarketSettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private marketService: MarketService,
  ) { }

  ngOnInit() {


  }


  ///////////////
  // Functions //
  ///////////////
  public deleteMarket(): void {
    this.activatedRoute.params.subscribe(params => {
      const marketId = params['marketId']
      this.marketService.deleteMarket(marketId)
      this.router.navigate([`/markets`])
    })
  }


}
