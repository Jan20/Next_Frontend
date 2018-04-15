// Angular Components
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { APP_BASE_HREF } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MaterialModule } from './config/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


// Custom Components
import { AppComponent } from './app.component'

// Custom Modules
import { ConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module'
import { AssetModule } from './asset/asset.module'
import { MarketModule } from './market/market.module'

// Directives
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  
  declarations: [
    AppComponent,
  ], imports: [
    MaterialModule,
    BrowserModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfigModule,
    UserModule,
    MenuModule,
    MarketModule,
    AssetModule,
  ], providers: [
    {provide: APP_BASE_HREF, useValue : '/' }
  ], bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
