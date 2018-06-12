import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingOverviewComponent } from './landing-overview/landing-overview.component'
import { LandingService } from './landing-service/landing.service';
import { LandingParticlesComponent } from './landing-particles/landing-particles.component'
import { ParticlesModule } from 'angular-particle';
import { LandingBenefitsComponent } from './landing-benefits/landing-benefits.component';
import { MaterialModule } from '../config/material.module';
import { LandingStartComponent } from './landing-start/landing-start.component';

@NgModule({
  imports: [

    CommonModule,
    ParticlesModule,
    MaterialModule

  ],
  declarations: [
    
    LandingOverviewComponent,
    LandingParticlesComponent,
    LandingBenefitsComponent,
    LandingStartComponent
  
  ],
  providers: [

    LandingService

  ],
  exports: [


  ]
})
export class LandingModule { }
