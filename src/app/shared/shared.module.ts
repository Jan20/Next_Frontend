import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'angular-particle';

// Components
import { ParticlesComponent } from './components/particles/particles.component'

// Services
import { GenericService } from './services/generic-service'

@NgModule({
  imports: [

    CommonModule,
    ParticlesModule,

  ],
  declarations: [
    
    ParticlesComponent
  
  ], providers: [

    GenericService

  ], exports: [

    ParticlesComponent

  ]
})
export class SharedModule { }
