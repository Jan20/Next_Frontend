import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { UserLoginComponent } from './../user/user-login/user-login.component'
import { AssetOverviewComponent } from './../asset/asset-overview/asset-overview.component'
import { AssetDetailsComponent } from './../asset/asset-details/asset-details.component'
import { MarketOverviewComponent } from './../market/market-overview/market-overview.component'
import { MarketDetailsComponent } from './../market/market-details/market-details.component'
import { MarketSettingsComponent } from './../market/market-settings/market-settings.component'
import { PortfolioOverviewComponent } from './../portfolio/portfolio-overview/portfolio-overview.component'
import { PortfolioAddComponent } from './../portfolio/portfolio-add/portfolio-add.component'

// Routing
export const ROUTES: Routes = [
  { path: '', component: MarketOverviewComponent},
  { path: 'markets', component: MarketOverviewComponent},
  { path: 'markets/:marketId', component: MarketDetailsComponent},
  { path: 'markets/:marketId/settings', component: MarketSettingsComponent},
  { path: 'markets/:marketId/assets/:assetId', component: AssetDetailsComponent},
  { path: 'portfolio', component: PortfolioOverviewComponent},
  { path: 'portfolio/add/market/:marketId/asset/:assetId', component: PortfolioAddComponent},
  { path: 'user', component: UserLoginComponent },
]