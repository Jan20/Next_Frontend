import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component'

// Services
import { ProfileService } from './profile-service/profile.service'

@NgModule({
  imports: [

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    
    ProfileOverviewComponent,
  
  ], providers: [

    ProfileService,

  ]
})
export class ProfileModule { }
