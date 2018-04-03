import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { UserLoginComponent } from './../user/user-login/user-login.component'
import { QuoteOverviewComponent } from '../quote/quote-overview/quote-overview.component'
import { QuoteDetailsComponent } from '../quote/quote-details/quote-details.component'
// import { TaskOverviewComponent } from './../task/task-overview/task-overview.component'
import { MarketOverviewComponent } from './../market/market-overview/market-overview.component'
import { MarketDetailsComponent } from './../market/market-details/market-details.component'
import { ProfileOverviewComponent } from './../profile/profile-overview/profile-overview.component'
import { StatsOverviewComponent } from './../stats/stats-overview/stats-overview.component'

// Auth Guard
// import { TaskDetailsComponent } from '../task/task-details/task-details.component';

// Routing
export const ROUTES: Routes = [
  { path: '', component: MarketOverviewComponent},
  { path: 'quotes', component: QuoteOverviewComponent},  
  { path: 'quotes/:quoteId', component: QuoteDetailsComponent},
  { path: 'markets', component: MarketOverviewComponent},
  { path: 'markets/:marketId', component: MarketDetailsComponent},
  // { path: 'markets/:marketId/assets', component: TaskOverviewComponent},
  // { path: 'markets/:marketId/assets/:assetId', component: TaskDetailsComponent},
  { path: 'profile', component: ProfileOverviewComponent},
  { path: 'stats', component: StatsOverviewComponent},
  { path: 'user', component: UserLoginComponent },
]