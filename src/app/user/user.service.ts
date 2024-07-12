import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  createUser(user: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.http
      .post('http://localhost:4000/api/user/createUser', user)
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
  }

  LoginUser(user: { email: string; password: string }) {
    this.http
      .post('http://localhost:4000/api/user/userLogin', user, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          if (res.user_role === 'admin') {
            this.cookieService.set('authenticated', 'true');
            this.cookieService.set('admin', res.user_id);
            localStorage.setItem('jwt', res.token);
            this.router.navigate(['/admin']);
          } else {
            this.cookieService.set('authenticated', 'true');
            this.cookieService.set('user', res.user_id);
            localStorage.setItem('jwt', res.token);
            this.router.navigate(['/user', this.cookieService.get('user')]);
          }
        },

        error: (error) => {
          console.log(error);
        },
      });
  }

  logout() {
    this.http
      .get('http://localhost:4000/api/user/userLogout', {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.cookieService.delete('jwt');
          this.cookieService.delete('authenticated');
          this.cookieService.delete('admin');
          this.cookieService.delete('user');
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        },
        error: (error) => console.log(error),
      });
  }
}
