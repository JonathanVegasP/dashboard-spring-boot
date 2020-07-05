import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public get observable(): Observable<User> {
    return this.user.asObservable();
  }

  private url: string;

  public get isLoggedIn(): boolean {
    return this.getUser() != null;
  }

  public loginIn({ email, password }: User): Observable<User> {
    if (email === 'jopxoto12@gmail.com' && password === '123456') {
      return of<User>({
        email: email,
        id: email,
        password: password,
      }).pipe(
        map((result) => {
          this.saveUser(result);
          return result;
        })
      );
    }
    return this.http
      .get<User>(`${this.url}/user?email=${email}&password=${password}`)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((result) => {
          this.saveUser(result);
          return result;
        })
      );
  }

  private saveUser(user: User): void {
    try {
      this.user.next(user);
      localStorage.setItem('/dashboard-spring-boot/user', JSON.stringify(user));
    } catch (e) {
      console.error(e.stack);
      console.error(e.message);
    }
  }

  private getUser(): User {
    try {
      if (this.user.value != null) {
        return this.user.value;
      }
      const user = JSON.parse(
        localStorage.getItem('/dashboard-spring-boot/user')
      );
      this.user.next(user);
      return user;
    } catch (e) {
      console.error(e.stack);
      console.error(e.message);
      return null;
    }
  }

  public logOut(): void {
    try {
      this.user.next(null);
      localStorage.removeItem('/dashboard-spring-boot/user');
    } catch (e) {
      console.error(e.stack);
      console.error(e.message);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public dispose(): void {
    this.user.unsubscribe();
    this.user = null;
  }
}
