// Angular Components
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { APP_BASE_HREF } from '@angular/common'

// Angular Material
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Custom Components
import { AppComponent } from './app.component'

// Custom Modules
import { ConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { MenuModule } from './menu/menu.module'
import { QuoteModule } from './quote/quote.module'
import { AssetModule } from './asset/asset.module'
import { MarketModule } from './market/market.module'
import { CategoryModule } from './category/category.module'
import { StatsModule } from './stats/stats.module'
import { ProfileModule } from './profile/profile.module'

@NgModule({
  
  declarations: [
    AppComponent,
  ], imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ConfigModule,
    UserModule,
    MenuModule,
    QuoteModule,
    MarketModule,
    AssetModule,
    CategoryModule,
    StatsModule,
    ProfileModule,
  ], providers: [
    {provide: APP_BASE_HREF, useValue : '/' }
  ], bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
