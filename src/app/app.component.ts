import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserAuthorized: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isUserAuthorized = false;
    console.log('logged out');
    this.router.navigate(['login']);
  }
}
