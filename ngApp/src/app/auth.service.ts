import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rurl = 'http://localhost:3000/user/register';
  private lurl = 'http://localhost:3000/user/login';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post(this.rurl, user);
  }

  loginUer(user) {
    return this.http.post(this.lurl, user);
  }

  isLogin() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }
}
