import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'
import { Ng2GoogleChartsModule } from 'ng2-google-charts'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PortfolioMemberService } from './portfolio-member-service/portfolio-member.service'
import { PortfolioMemberAddComponent } from './portfolio-member-add/portfolio-member-add.component'
import { PortfolioMemberOverviewComponent } from './portfolio-member-overview/portfolio-members-overview.component'

@NgModule({
  imports: [

    CommonModule,
    MaterialModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    FormsModule,
  
  ],
  declarations: [

    PortfolioMemberOverviewComponent,
    PortfolioMemberAddComponent,
    
  ],
  providers: [

    PortfolioMemberService

  ],
  exports: [

    PortfolioMemberOverviewComponent,
  
  ]
})
export class PortfolioMemberModule { }
