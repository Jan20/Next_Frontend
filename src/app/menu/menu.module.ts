import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routes
import { ROUTES } from './../config/routing.config';
import { RouterModule, Routes } from '@angular/router';

// Menu
import { MenuComponent } from './menu/menu.component';

import { QuoteModule } from '../quote/quote.module';
import { MenuService } from './menu-service/menu.service';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';

@NgModule({
  imports: [

    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { enableTracing: true }),
    
  ],declarations: [
    
    MenuComponent,
    MenuSidenavComponent,

  ], providers: [

    MenuService

  ], exports: [

    MenuComponent,
    RouterModule,
    MenuSidenavComponent,
    
  ]
})
export class MenuModule { }
