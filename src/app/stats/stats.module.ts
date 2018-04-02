import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryModule } from '../category/category.module'

// Components
import { StatsOverviewComponent } from './stats-overview/stats-overview.component'
import { StatsDetailsComponent } from './stats-details/stats-details.component'

// Services
import { StatsService } from './stats-service/stats.service'


@NgModule({
  imports: [

    CommonModule,
    CategoryModule

  ], declarations: [
    
    StatsOverviewComponent, 
    StatsDetailsComponent
  
  ]
})
export class StatsModule { }
