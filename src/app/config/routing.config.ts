import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { LandingOverviewComponent } from './../landing/landing-overview/landing-overview.component'
import { UserLoginComponent } from './../user/user-login/user-login.component'
import { AssetOverviewComponent } from './../asset/asset-overview/asset-overview.component'
import { AssetDetailsComponent } from './../asset/asset-details/asset-details.component'
import { MarketOverviewComponent } from './../market/market-overview/market-overview.component'
import { MarketDetailsComponent } from './../market/market-details/market-details.component'
import { MarketSettingsComponent } from './../market/market-settings/market-settings.component'
import { MomentumOverviewComponent } from './../momentum/momentum-overview/momentum-overview.component'

// Routing
export const ROUTES: Routes = [

  { path: '', component: LandingOverviewComponent },
  { path: 'markets', component: MarketOverviewComponent },
  { path: 'markets/:marketId', component: MarketDetailsComponent },
  { path: 'markets/:marketId/settings', component: MarketSettingsComponent },
  { path: 'markets/:marketId/assets/:assetId', component: AssetDetailsComponent },
  { path: 'markets/:marketId/predictions', component: MomentumOverviewComponent },
  { path: 'markets/:marketId/predictions/:assetId', component: AssetDetailsComponent },

  { path: 'predictions', component: MomentumOverviewComponent },
  { path: 'user', component: UserLoginComponent },

]