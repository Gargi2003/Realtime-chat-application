import { Injectable } from '@angular/core';
import { AlertType } from '../enums/alert-type';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { User } from '../classes/user';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser : Observable<User | null>;

  constructor(private router: Router, private alert: AlertService) { 
    this.currentUser= of(null);
  }

  public signUp(firstName:string,lastName:string, email:string,password:string):Observable<boolean>{
    return of(true);
  }
  public login(email:string,password:string):Observable<boolean>{
    return of(true);
  }

  public logout():void{
    this.router.navigate(['/login']);
    this.alert.alerts.next(new Alert('You have been signed out'));
  }
}
