import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(private userDataService: UserDataService, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

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
    this.userDataService.login(this.email, this.password).subscribe(
      (res) => {
        console.log('Login successful:', res.data.id);
        localStorage.setItem('authToken', res.data.id);
        this.router.navigate(['']);
      },
      (err) => {
        console.error('Login failed:', err);
        if (err.status == 0) {
          this.errMsg = "Something Went Wrong!😅";
        }
        if (err.status == 401) {
          this.errMsg = err.error.message
        }
        // this.errMsg = err
      }
    );
  }
}
