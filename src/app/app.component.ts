import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireModule } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'To Do App';


  constructor(private authService: AuthService, public afAuth: AngularFireAuth,private router:Router) {
    console.log(this.authService.authState, 'uwuwuwuwuwuw')
  }

  
  doLogout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login-logout"]);
  }
}
  
  


