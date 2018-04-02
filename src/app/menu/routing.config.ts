import { RouterModule, Routes } from '@angular/router'

// Custom Components
import { LoginComponent } from './../auth/login/login.component'
import { QuoteOverviewComponent } from '../quote/quote-overview/quote-overview.component'
import { QuoteDetailsComponent } from '../quote/quote-details/quote-details.component'
import { TaskOverviewComponent } from './../task/task-overview/task-overview.component'
import { ProjectOverviewComponent } from './../project/project-overview/project-overview.component'
import { ProjectDetailsComponent } from './../project/project-details/project-details.component'
import { ProfileOverviewComponent } from './../profile/profile-overview/profile-overview.component'
import { StatsOverviewComponent } from './../stats/stats-overview/stats-overview.component'

// Auth Guard
import { AuthGuard } from '../auth/auth/auth.guard'
import { TaskDetailsComponent } from '../task/task-details/task-details.component';

// Routing
export const ROUTES: Routes = [
  { path: '', component: ProjectOverviewComponent, canActivate: [AuthGuard] },
  { path: 'quotes', component: QuoteOverviewComponent, canActivate: [AuthGuard] },  
  { path: 'quotes/:quoteId', component: QuoteDetailsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectOverviewComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId/tasks', component: TaskOverviewComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId/tasks/:taskId', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileOverviewComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsOverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
]