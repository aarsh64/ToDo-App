import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireModule } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'To Do App';


  constructor(public afAuth: AngularFireAuth) {
  }

  
  
  
}

