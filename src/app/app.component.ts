import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserAuthorized: boolean = false;

  constructor(private router: Router) { 
    if(localStorage.getItem('authToken')){
      this.isUserAuthorized = true;
    }
  }

  ngOnInit() {
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isUserAuthorized = false;
    console.log('logged out');
    this.router.navigate(['login']);
  }
}
