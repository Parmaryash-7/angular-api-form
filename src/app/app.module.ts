import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterForFormComponent } from './master-for-form/master-for-form.component';
import { UserFormDetailsComponent } from './user-form-details/user-form-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UsersTableComponent,
    CreateUserFormComponent,
    PageNotFoundComponent,
    AngularFormsComponent,
    MasterForFormComponent,
    UserFormDetailsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
