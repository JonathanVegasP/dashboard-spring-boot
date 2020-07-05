import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import {
  faSignOutAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public signOut$: IconDefinition = faSignOutAlt;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {}

  public logOut(): void {
    this.userService.logOut();
  }
}
