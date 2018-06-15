import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ParticlesModule } from 'angular-particle';

// Modules
import { AssetModule } from '../asset/asset.module'

// Components
import { MarketOverviewComponent } from './market-overview/market-overview.component'
import { MarketDetailsComponent } from './market-details/market-details.component'
import { MarketAddComponent } from './market-add/market-add.component'

// Services
import { MarketService } from './market-service/market.service'
import { MarketSettingsComponent } from './market-settings/market-settings.component';
import { MarketStatsComponent } from './market-stats/market-stats.component';
import { MarketParticlesComponent } from './market-particles/market-particles.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AssetModule,
    ParticlesModule

  ], declarations: [
    
    MarketOverviewComponent, 
    MarketDetailsComponent,
    MarketAddComponent,
    MarketSettingsComponent,
    MarketStatsComponent,
    MarketParticlesComponent, 
  
  ], providers: [
    MarketService
  ]
})
export class MarketModule { }
