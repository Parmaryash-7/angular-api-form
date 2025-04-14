import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { MasterForFormComponent } from './master-for-form/master-for-form.component';
import { UserFormDetailsComponent } from './user-form-details/user-form-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-table',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login' },
  },
  {
    path: 'user-table',
    component: UsersTableComponent,
    data: { title: 'User Data Table' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create-user',
    component: CreateUserFormComponent,
    data: { title: 'Register User' },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit_user/:id',
    component: CreateUserFormComponent,
    data: { title: 'Edit User' },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'angular-forms',
  //   component: MasterForFormComponent,
  //   data: { title: 'Angular Forms' },
  //   children: [
  //     {path: 'user-info', component: UserFormDetailsComponent},
  //     {path: '', component: AngularFormsComponent}
  //   ]
  // },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Page Not Found' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
