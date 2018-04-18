import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Angular Material
import { MaterialModule } from '../config/material.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'

// Custom Components
import { AssetOverviewComponent } from './asset-overview/asset-overview.component'
import { AssetDetailsComponent } from './asset-details/asset-details.component'
import { AssetAddComponent } from './asset-add/asset-add.component'

// Custom Services
import { AssetService } from './asset-service/asset.service'

// Directives
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,  
    MatAutocompleteModule,
    FormsModule,
    MatSidenavModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
  ], declarations: [
    AssetOverviewComponent,
    AssetDetailsComponent,
    AssetAddComponent,
  ], providers: [
    AssetService,
  ], exports: [
    AssetOverviewComponent,
    AssetDetailsComponent,
    AssetAddComponent
  ]
})
export class AssetModule { }
