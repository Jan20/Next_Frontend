import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '../config/material.module'

// Components
import { MomentumOverviewComponent } from './momentum-overview/momentum-overview.component';
import { MomentumDetailsComponent } from './momentum-details/momentum-details.component';

// Serivces
import { MomentumService } from './momentum-service/momentum.service';

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule
    
  ],
  declarations: [
    
    MomentumOverviewComponent, 
    MomentumDetailsComponent
  
  ],
  providers: [

    MomentumService

  ]
})
export class MomentumModule { }
