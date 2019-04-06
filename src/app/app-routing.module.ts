import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ActionsComponent } from './actions/actions.component';
import { ResourcesComponent } from './resources/resources.component';
import { OrgsComponent } from './orgs/orgs.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'orgs', component: OrgsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
