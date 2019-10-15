import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{
  
  intercept(req, next) {
    let token = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }

  constructor(private injector: Injector) { }
}
