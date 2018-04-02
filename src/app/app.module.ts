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
import { AuthModule } from './auth/auth.module'
import { MenuModule } from './menu/menu.module'
import { QuoteModule } from './quote/quote.module'
import { TaskModule } from './task/task.module'
import { ProjectModule } from './project/project.module'
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
    AuthModule,
    MenuModule,
    QuoteModule,
    TaskModule,
    ProjectModule,
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
