import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PortfolioService } from './portfolio-service/portfolio.service'
import { MaterialModule } from '../config/material.module'

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PortfolioPredictionsComponent } from './portfolio-predictions/portfolio-predictions.component';
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modules
import { AssetModule } from '../asset/asset.module'


@NgModule({
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PortfolioOverviewComponent, 
    PortfolioPredictionsComponent, PortfolioAddComponent
  ],
  providers: [
    PortfolioService
  ]
})
export class PortfolioModule { }
