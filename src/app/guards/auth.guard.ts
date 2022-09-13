import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser)=>!!currentUser),
      tap(loggedIn => {
        if(!loggedIn){
          this.alertService.alerts.next(new Alert('You need to login to access this page.',AlertType.Danger));
          this.route.navigate(['/login'],{queryParams:{returnUrl: state.url }});
        }
      })
    );
  }
  constructor(private route: Router, private alertService: AlertService, private auth: AuthService) { }

}
