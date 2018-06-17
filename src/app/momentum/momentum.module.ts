import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'

// Modules
import { SharedModule } from '../shared/shared.module'

// Components
import { MomentumOverviewComponent } from './momentum-overview/momentum-overview.component'
import { MomentumDetailsComponent } from './momentum-details/momentum-details.component'

// Serivces
import { MomentumService } from './momentum-service/momentum.service'
import { MomentumPerformanceComponent } from './momentum-performance/momentum-performance.component'

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule,
    SharedModule,

  ],
  declarations: [
    
    MomentumOverviewComponent, 
    MomentumDetailsComponent, 
    MomentumPerformanceComponent, 
  
  ],
  providers: [

    MomentumService

  ]
})
export class MomentumModule { }
