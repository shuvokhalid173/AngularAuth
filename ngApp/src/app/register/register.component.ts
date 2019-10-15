import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public User = new User('', '', '');

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitForm(user) {
    console.log(user);
    this.authService.registerUser(user)
      .subscribe(
        res => {
          console.log(res); 
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special-events']);
        }, 
        err => console.log(err)
      );
  }
}
