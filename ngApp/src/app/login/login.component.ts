import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private User = new User('', '', '');
  public loginFailureMessage;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitForm(user) {
    console.log(user);
    this.authService.loginUer(user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special-events']); 
          this.loginFailureMessage = null
        },
        err => this.loginFailureMessage = err.error.text
      );
  }

}
