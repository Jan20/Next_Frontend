import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetModule } from '../asset/asset.module';
import { MaterialModule } from '../config/material.module';
import { SharedModule } from '../shared/shared.module';
import { MarketAddComponent } from './market-add/market-add.component';
import { MarketAdminDetailsComponent } from './market-admin-details/market-admin-details.component';
import { MarketAdminComponent } from './market-admin/market-admin.component';
import { MarketOverviewComponent } from './market-overview/market-overview.component';
import { MarketService } from './market-service/market.service';
import { MarketSettingsComponent } from './market-settings/market-settings.component';
import { MarketStatsComponent } from './market-stats/market-stats.component';
import { MarketUpdateComponent } from './market-update/market-update.component';
import { MomentumModule } from '../momentum/momentum.module'

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AssetModule,
    MomentumModule,

  ], declarations: [
    
    MarketOverviewComponent, 
    MarketAddComponent,
    MarketSettingsComponent,
    MarketStatsComponent,
    MarketAdminComponent,
    MarketAdminDetailsComponent,
    MarketUpdateComponent,

  ], providers: [
  
    MarketService
  
  ], exports : [


  ]
})
export class MarketModule { }
