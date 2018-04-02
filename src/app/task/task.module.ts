import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material/material.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'

// Custom Components
import { TaskOverviewComponent } from './task-overview/task-overview.component'
import { TaskDetailsComponent } from './task-details/task-details.component'
import { TaskAddComponent } from './task-add/task-add.component'

// Custom Services
import { TaskService } from './task-service/task.service'
import { ProjectService } from '../project/project-service/project.service';

@NgModule({
  imports: [
    
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,  
    MatAutocompleteModule,
    FormsModule,
    MatSidenavModule,
  
  ], declarations: [
    
    TaskOverviewComponent,
    TaskDetailsComponent,
    TaskAddComponent

  ], providers: [

    TaskService,
    ProjectService
   
  ], exports: [

    TaskOverviewComponent,
    TaskDetailsComponent,
    TaskAddComponent

  ]
})
export class TaskModule { }
