import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { UserLoginComponent } from './../user/user-login/user-login.component'
import { QuoteOverviewComponent } from '../quote/quote-overview/quote-overview.component'
import { QuoteDetailsComponent } from '../quote/quote-details/quote-details.component'
import { TaskOverviewComponent } from './../task/task-overview/task-overview.component'
import { ProjectOverviewComponent } from './../project/project-overview/project-overview.component'
import { ProjectDetailsComponent } from './../project/project-details/project-details.component'
import { ProfileOverviewComponent } from './../profile/profile-overview/profile-overview.component'
import { StatsOverviewComponent } from './../stats/stats-overview/stats-overview.component'

// Auth Guard
import { TaskDetailsComponent } from '../task/task-details/task-details.component';

// Routing
export const ROUTES: Routes = [
  { path: '', component: ProjectOverviewComponent},
  { path: 'quotes', component: QuoteOverviewComponent},  
  { path: 'quotes/:quoteId', component: QuoteDetailsComponent},
  { path: 'projects', component: ProjectOverviewComponent},
  { path: 'projects/:projectId', component: ProjectDetailsComponent},
  { path: 'projects/:projectId/tasks', component: TaskOverviewComponent},
  { path: 'projects/:projectId/tasks/:taskId', component: TaskDetailsComponent},
  { path: 'profile', component: ProfileOverviewComponent},
  { path: 'stats', component: StatsOverviewComponent},
  { path: 'login', component: UserLoginComponent },
]