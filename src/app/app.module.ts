import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AppComponent } from './app.component';
import { AssetModule } from './asset/asset.module';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { LandingModule } from './landing/landing.module';
import { MarketModule } from './market/market.module';
import { MenuModule } from './menu/menu.module';
import { MomentumModule } from './momentum/momentum.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  
  declarations: [
    
    AppComponent,
  
  ], imports: [
    
    MaterialModule,
    BrowserModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfigModule,
    UserModule,
    MenuModule,
    LandingModule,
    MarketModule,
    AssetModule,
    SharedModule,
    MomentumModule,

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ], bootstrap: [
  
    AppComponent
  
  ]
})
export class AppModule { }
