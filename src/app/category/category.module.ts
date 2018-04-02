import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Components
import { CategoryAddComponent } from './category-add/category-add.component'

// Services
import { CategoryService } from './category-service/category.service'

// Models
import { Category } from './category-model/category'

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],declarations: [
    
    CategoryAddComponent
  
  ], providers: [
  
    CategoryService
  
  ], exports: [
    
    CategoryAddComponent,
  
  ]

})
export class CategoryModule { }
