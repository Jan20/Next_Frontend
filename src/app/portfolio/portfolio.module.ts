import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PortfolioAddAssetComponent } from './portfolio-add-asset/portfolio-add-asset.component';
import { PortfolioService } from './portfolio-service/portfolio.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PortfolioOverviewComponent, 
    PortfolioAddAssetComponent
  ],
  providers: [
    PortfolioService
  ]
})
export class PortfolioModule { }
