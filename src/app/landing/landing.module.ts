import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Modules
import { SharedModule } from '../shared/shared.module'

// Components
import { LandingOverviewComponent } from './landing-overview/landing-overview.component'

// Services
import { LandingService } from './landing-service/landing.service'
import { ParticlesModule } from 'angular-particle'
import { LandingBenefitsComponent } from './landing-benefits/landing-benefits.component'
import { MaterialModule } from '../config/material.module'
import { LandingStartComponent } from './landing-start/landing-start.component'

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
    LandingStartComponent
  
  ],
  providers: [

    LandingService

  ],
  exports: [


  ]
})
export class LandingModule { }
