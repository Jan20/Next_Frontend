import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modules
import { SharedModule } from '../shared/shared.module'
import { AssetModule } from '../asset/asset.module'

// Components
import { MarketOverviewComponent } from './market-overview/market-overview.component'
import { MarketDetailsComponent } from './market-details/market-details.component'
import { MarketAddComponent } from './market-add/market-add.component'

// Services
import { MarketService } from './market-service/market.service'
import { MarketSettingsComponent } from './market-settings/market-settings.component';
import { MarketStatsComponent } from './market-stats/market-stats.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AssetModule,

  ], declarations: [
    
    MarketOverviewComponent, 
    MarketDetailsComponent,
    MarketAddComponent,
    MarketSettingsComponent,
    MarketStatsComponent,
  
  ], providers: [
  
    MarketService
  
  ], exports : [


  ]
})
export class MarketModule { }
