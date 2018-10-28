import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticlesModule } from 'angular-particle';
import { MaterialModule } from '../config/material.module';
import { SharedModule } from '../shared/shared.module';
import { LandingBenefitsComponent } from './landing-benefits/landing-benefits.component';
import { LandingOverviewComponent } from './landing-overview/landing-overview.component';
import { LandingService } from './landing-service/landing.service';
import { LandingStartComponent } from './landing-start/landing-start.component';
import { LandingPortfolioComponent } from './landing-portfolio/landing-portfolio.component';
import { LandingPerformanceComponent } from './landing-performance/landing-performance.component';

@NgModule({
  imports: [

    CommonModule,
    ParticlesModule,
    MaterialModule,
    SharedModule

  ],
  declarations: [
    
    LandingOverviewComponent,
    LandingBenefitsComponent,
    LandingStartComponent,
    LandingPortfolioComponent,
    LandingPerformanceComponent
  
  ],
  providers: [

    LandingService

  ],
  exports: [


  ]
})
export class LandingModule { }
