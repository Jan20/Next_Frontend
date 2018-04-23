import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../config/material.module'
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// Components
import { AssetModule } from '../asset/asset.module';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PortfolioMembersComponent } from './portfolio-members/portfolio-members.component';
import { PortfolioCashComponent } from './portfolio-cash/portfolio-cash.component';
import { PortfolioPredictionsComponent } from './portfolio-predictions/portfolio-predictions.component';
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component';
// Serivces
import { PortfolioService } from './portfolio-service/portfolio.service'
import { PortfolioMemberService } from './portfolio-member-service/portfolio-member.service'

@NgModule({
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PortfolioOverviewComponent, 
    PortfolioPredictionsComponent, 
    PortfolioAddComponent, 
    PortfolioMembersComponent, PortfolioCashComponent,
  ],
  providers: [
    PortfolioService,
    PortfolioMemberService
  ]
})
export class PortfolioModule { }
