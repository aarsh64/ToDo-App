import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '/home/pk/ToDo/src/app/auth.service';
import { UserComponent } from '/home/pk/ToDo/src/app/user/user.component';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {




  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.afAuth.authState.pipe(map(v => {
      if (v !== null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }))

  }
}

