import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { GenericService } from './services/generic-service'

@NgModule({
  imports: [

    CommonModule,

  ],
  declarations: [
    
  
  ], providers: [

    GenericService

  ], exports: [


  ]
})
export class SharedModule { }
