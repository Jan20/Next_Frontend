import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'
import { Ng2GoogleChartsModule } from 'ng2-google-charts'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// Modules
import { PortfolioMemberModule } from './../portfolio-member/portfolio-member.module'
// Components
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component'
import { PortfolioCashComponent } from './portfolio-cash/portfolio-cash.component'
import { PortfolioPredictionsComponent } from './portfolio-predictions/portfolio-predictions.component'
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component'
// Serivces
import { PortfolioService } from './portfolio-service/portfolio.service';

@NgModule({
  imports: [
  
    CommonModule,
    Ng2GoogleChartsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PortfolioMemberModule
  
  ],
  declarations: [

    PortfolioOverviewComponent, 
    PortfolioPredictionsComponent, 
    PortfolioAddComponent, 
    PortfolioCashComponent,
  
  ],
  providers: [
  
    PortfolioService,
  
  ]
})
export class PortfolioModule { }
