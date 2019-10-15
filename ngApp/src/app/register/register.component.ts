import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public User = new User('', '', '');

  constructor(private router: Router, 
              private authService: AuthService,
              private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmitForm(user) {
    console.log(user);
    this.authService.registerUser(user)
      .subscribe(
        res => {
          console.log(res); 
          this.dataService.sendData(res.result);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special-events']);
        }, 
        err => console.log(err)
      );
  }
}
