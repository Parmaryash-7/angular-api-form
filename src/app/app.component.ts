import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserAuthorized: boolean = false;

  constructor(private router: Router, private alertShow: AlertService) {
    if (localStorage.getItem('authToken')) {
      this.isUserAuthorized = true;
    }
  }

  ngOnInit() {
  }

  logout(): void {
    this.alertShow.confirm('Want to log out? ☹').then((result) => {
      if (result.isConfirmed) {
        this.alertShow.info('See you later! 👋');
        localStorage.removeItem('authToken');
        this.isUserAuthorized = false;
        console.log('logged out');
        this.router.navigate(['login']);
      } else {
        this.alertShow.info('Welcome back! 😊');
      }
    })
  }
}
