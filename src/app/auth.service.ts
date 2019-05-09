import { Injectable } from '@angular/core';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserComponent } from './user/user.component';
import { Http, HttpModule } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  authState: any;

//.......Actually the AuthService not required after the authguard function is changed......
  
constructor(private afAuth: AngularFireAuth,
    private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      console.log(auth,'authState firebase');
      this.authState = auth;
    });

  }
   getAuthenticated(){
    return this.authState !== null;
  }
  
}
