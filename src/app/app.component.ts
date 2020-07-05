import { Component, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  isLoggedIn$: boolean = false;
  constructor(private user: UserService, private route: Router) {
    const { observable, isLoggedIn } = this.user;
    this.isLoggedIn$ = isLoggedIn;
    if (!isLoggedIn) {
      this.route.navigate(['login']);
    }
    observable.subscribe((_) => {
      const isLoggedIn = _ != null;
      this.isLoggedIn$ = isLoggedIn;
      if (isLoggedIn) {
        this.route.navigate(['home']);
      } else {
        this.route.navigate(['login']);
      }
    });
  }
  ngOnDestroy(): void {
    this.user.dispose();
  }
}
