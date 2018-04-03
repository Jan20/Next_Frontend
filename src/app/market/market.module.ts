import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modules
import { AssetModule } from '../asset/asset.module'

// Components
import { MarketOverviewComponent } from './market-overview/market-overview.component'
import { MarketDetailsComponent } from './market-details/market-details.component'
import { MarketAddComponent } from './market-add/market-add.component'

// Services
import { MarketService } from './market-service/market.service'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AssetModule
  ], declarations: [
    MarketOverviewComponent, 
    MarketDetailsComponent,
    MarketAddComponent, 
  ], providers: [
    MarketService
  ]
})
export class MarketModule { }
