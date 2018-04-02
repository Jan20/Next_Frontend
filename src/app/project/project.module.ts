import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modules
import { CategoryModule } from '../category/category.module'
import { TaskModule } from '../task/task.module'

// Components
import { ProjectAddComponent } from './project-add/project-add.component'
import { ProjectOverviewComponent } from './project-overview/project-overview.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'

// Services
import { ProjectService } from './project-service/project.service'

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryModule,
    TaskModule

  ], declarations: [
    
    ProjectAddComponent, 
    ProjectOverviewComponent, 
    ProjectDetailsComponent
  
  ], providers: [

    ProjectService

  ]


})
export class ProjectModule { }
