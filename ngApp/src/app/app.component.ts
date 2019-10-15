import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngApp';

  constructor(private authService: AuthService, private dataService: DataService) {
    
  }

  username;

  ngOnInit(){
    this.dataService.dataValue.subscribe((data: User) => {
      this.username = data.Username;
    })
  }

}
