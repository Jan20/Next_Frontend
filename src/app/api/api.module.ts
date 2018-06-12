import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'

// Components
import { ApiOverviewComponent } from './api-overview/api-overview.component'

// Services
import { ApiService } from './api-service/api.service';
import { ApiSeriesComponent } from './api-series/api-series.component' 

@NgModule({
  imports: [

    CommonModule,
    MaterialModule
  ],
  declarations: [
    
    ApiOverviewComponent,
    ApiSeriesComponent
  
  ],
  providers: [

    ApiService

  ],
  exports: [

    ApiOverviewComponent

  ],
})
export class ApiModule { }
