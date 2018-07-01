import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MaterialModule } from '../config/material.module';
import { SharedModule } from '../shared/shared.module';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetAdminComponent } from './asset-admin/asset-admin.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { AssetGraphComponent } from './asset-graph/asset-graph.component';
import { AssetOverviewComponent } from './asset-overview/asset-overview.component';
import { AssetService } from './asset-service/asset.service';
import { AssetUpdateComponent } from './asset-update/asset-update.component';

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
    AssetAdminComponent,
    AssetUpdateComponent,

  ], providers: [

    AssetService,

  ], exports: [

    AssetOverviewComponent,
    AssetDetailsComponent,
    AssetAddComponent,
    AssetAdminComponent

  ]
})
export class AssetModule { }
