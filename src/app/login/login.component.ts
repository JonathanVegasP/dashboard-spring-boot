import { Component } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public user: User = {
    email: '',
    id: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const subscribe = this.userService.loginIn(this.user).subscribe((_) => {
      subscribe.unsubscribe();
    });
  }
}
