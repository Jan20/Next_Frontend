import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { UserLoginComponent } from './../user/user-login/user-login.component'
import { AssetOverviewComponent } from './../asset/asset-overview/asset-overview.component'
import { AssetDetailsComponent } from './../asset/asset-details/asset-details.component'
import { MarketOverviewComponent } from './../market/market-overview/market-overview.component'
import { MarketDetailsComponent } from './../market/market-details/market-details.component'
import { MarketSettingsComponent } from './../market/market-settings/market-settings.component'
import { PortfolioOverviewComponent } from './../portfolio/portfolio-overview/portfolio-overview.component'
import { PortfolioMemberAddComponent } from './../portfolio-member/portfolio-member-add/portfolio-member-add.component'
import { PortfolioCashComponent } from './../portfolio/portfolio-cash/portfolio-cash.component'
import { PortfolioMemberBuyComponent } from './../portfolio-member/portfolio-member-buy/portfolio-member-buy.component'
import { PortfolioMemberSellComponent } from './../portfolio-member/portfolio-member-sell/portfolio-member-sell.component'

// Routing
export const ROUTES: Routes = [
  { path: '', component: PortfolioOverviewComponent},
  { path: 'markets', component: MarketOverviewComponent},
  { path: 'markets/:marketId', component: MarketDetailsComponent},
  { path: 'markets/:marketId/settings', component: MarketSettingsComponent},
  { path: 'markets/:marketId/assets/:assetId', component: AssetDetailsComponent},
  { path: 'portfolio', component: PortfolioOverviewComponent},
  { path: 'portfolio/buy/market/:marketId/assets/:assetId', component: PortfolioMemberBuyComponent},
  { path: 'portfolio/sell/:portfolioMemberId', component: PortfolioMemberSellComponent},
  { path: 'portfolio/cash', component: PortfolioCashComponent},
  { path: 'user', component: UserLoginComponent },
]