import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserFormDialog } from './users/users.form.dialog';
import { FormsModule } from '@angular/forms';
import { RolesComponent } from './roles/roles.component';
import { RoleFormDialog } from './roles/roles.form.dialog';
import { ActionsComponent } from './actions/actions.component';
import { ActionFormDialog } from './actions/actions.form.dialog';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceFormDialog } from './resources/resources.form.dialog';
import { OrgsComponent } from './orgs/orgs.component';
import { OrgFormDialog } from './orgs/orgs.form.dialog';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UserFormDialog,
    RolesComponent,
    RoleFormDialog,
    ActionsComponent,
    ActionFormDialog,
    ResourcesComponent,
    ResourceFormDialog,
    OrgsComponent,
    OrgFormDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents: [
    UserFormDialog,
    RoleFormDialog,
    UserFormDialog,
    ActionFormDialog,
    ResourceFormDialog,
    OrgFormDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
