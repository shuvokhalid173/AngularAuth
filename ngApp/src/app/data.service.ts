import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject({}); 
  dataValue = this.dataSource.asObservable();

  constructor() { }

  sendData(user: User) {
    this.dataSource.next(user);
  }


}
