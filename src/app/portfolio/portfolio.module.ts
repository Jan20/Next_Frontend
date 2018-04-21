import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PortfolioService } from './portfolio-service/portfolio.service'
import { MaterialModule } from '../config/material.module'

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PortfolioPredictionsComponent } from './portfolio-predictions/portfolio-predictions.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    MaterialModule,
  ],
  declarations: [
    PortfolioOverviewComponent, 
    PortfolioPredictionsComponent
  ],
  providers: [
    PortfolioService
  ]
})
export class PortfolioModule { }
