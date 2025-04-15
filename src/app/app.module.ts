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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UsersTableComponent,
    CreateUserFormComponent,
    PageNotFoundComponent,
  ],
  imports: [
    // BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   timeOut: 3000,
    //   positionClass: 'toast-top-right',
    //   preventDuplicates: true,
    // }),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
