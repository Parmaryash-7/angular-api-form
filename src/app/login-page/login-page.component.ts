import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  errMsg: string = '';
  showPassword: boolean = false;

  constructor(private alertShow: AlertService, private appComponent: AppComponent, private userDataService: UserDataService, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    const title = this.route.snapshot.data['title'];
    this.titleService.setTitle(title);
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // this.errMsg = '';
    this.userDataService.login(this.email, this.password).subscribe(
      (res) => {
        // console.log('Login successful:', res.data.id);
        localStorage.setItem('authToken', res.data.id);
        // this.toaster.error("Logged in success fully!", 'success');
        this.appComponent.isUserAuthorized = true;
        this.alertShow.success("Yay! Logged in");
        this.router.navigate(['']);
      },
      (err) => {
        // console.error('Login failed:', err);
        if (err.status == 0) {
          // this.errMsg = "Something Went Wrong!😅";
          this.alertShow.error("Something Went Wrong!😅");
          // this.toaster.error("Something Went Wrong!😅", 'error');
        }
        if (err.status == 401) {
          // this.errMsg = err.error.message;
          this.alertShow.error(err.error.message + '😵');
          // this.toaster.error(err.error.message, 'error');
        }
        // this.errMsg = err
      }
    );
  }
}