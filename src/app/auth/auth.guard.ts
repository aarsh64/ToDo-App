import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '/home/pk/ToDo/src/app/auth.service';
import {UserComponent} from '/home/pk/ToDo/src/app/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private afAuth:AngularFireAuth) {}
    

  canActivate(
   
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
       if (this.auth.authenticated) { return true; }

     // window.alert('Cant get access');
      console.log('access denied!');
      this.router.navigate(['/login-logout']);
      return false;


  }
}

