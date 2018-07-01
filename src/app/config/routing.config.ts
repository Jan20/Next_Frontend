import { Routes } from '@angular/router';
import { AssetDetailsComponent } from './../asset/asset-details/asset-details.component';
import { LandingOverviewComponent } from './../landing/landing-overview/landing-overview.component';
import { MarketOverviewComponent } from './../market/market-overview/market-overview.component';
import { MomentumOverviewComponent } from './../momentum/momentum-overview/momentum-overview.component';
import { UserLoginComponent } from './../user/user-login/user-login.component';
import { MarketAdminComponent } from '../market/market-admin/market-admin.component';
import { MarketAdminDetailsComponent } from '../market/market-admin-details/market-admin-details.component';


// Routing
export const ROUTES: Routes = [

  { path: '', component: LandingOverviewComponent },
  { path: 'markets', component: MarketOverviewComponent },
  { path: 'markets/:marketId/assets', component: MomentumOverviewComponent },
  { path: 'markets/:marketId/assets/:assetId', component: AssetDetailsComponent },

  { path: 'admin/markets', component: MarketAdminComponent },
  { path: 'admin/markets/:marketId', component: MarketAdminDetailsComponent },


  { path: 'predictions', component: MomentumOverviewComponent },
  { path: 'user', component: UserLoginComponent },

]