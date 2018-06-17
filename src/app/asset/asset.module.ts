import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../config/material.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AssetGraphComponent } from './asset-graph/asset-graph.component';

// Modules
import { SharedModule } from '../shared/shared.module'

// Components
import { AssetOverviewComponent } from './asset-overview/asset-overview.component'
import { AssetDetailsComponent } from './asset-details/asset-details.component'
import { AssetAddComponent } from './asset-add/asset-add.component'

// Services
import { AssetService } from './asset-service/asset.service'


@NgModule({
  imports: [

    CommonModule,
    MaterialModule,
    ReactiveFormsModule,  
    MatAutocompleteModule,
    FormsModule,
    MatSidenavModule,
    Ng2GoogleChartsModule,
    SharedModule,
    
  ], declarations: [

    AssetOverviewComponent,
    AssetDetailsComponent,
    AssetAddComponent,
    AssetGraphComponent,

  ], providers: [

    AssetService,

  ], exports: [

    AssetOverviewComponent,
    AssetDetailsComponent,
    AssetAddComponent

  ]
})
export class AssetModule { }
