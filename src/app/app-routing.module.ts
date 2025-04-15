import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

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
