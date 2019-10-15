import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private User = new User('', '', '');
  public loginFailureMessage;
  constructor(private router: Router, 
              private authService: AuthService,
              private dataServie: DataService) { }

  ngOnInit() {
  }

  onSubmitForm(user) {
    console.log(user);
    this.authService.loginUer(user)
      .subscribe(
        res => {
          console.log(res);
          this.dataServie.sendData(res.result);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special-events']); 
          this.loginFailureMessage = null
        },
        err => this.loginFailureMessage = err.error.text
      );
  }

}
