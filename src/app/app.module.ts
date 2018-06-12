// Angular Components
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { APP_BASE_HREF } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

// Angular Material
import { MaterialModule } from './config/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


// Custom Components
import { AppComponent } from './app.component'

// Custom Modules
import { ConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module'

import { LandingModule } from './landing/landing.module'
import { AssetModule } from './asset/asset.module'
import { MarketModule } from './market/market.module'
import { PortfolioModule } from './portfolio/portfolio.module'
import { PortfolioMemberModule } from './portfolio-member/portfolio-member.module'
import { MomentumModule } from './momentum/momentum.module'
import { FooterModule } from './footer/footer.module'
import { ApiModule } from './api/api.module'

// Directives
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { Ng2GoogleChartsModule } from 'ng2-google-charts'


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
    PortfolioModule,
    PortfolioMemberModule,
    MomentumModule,
    FooterModule,
    ApiModule

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ], bootstrap: [
  
    AppComponent
  
  ]
})
export class AppModule { }
