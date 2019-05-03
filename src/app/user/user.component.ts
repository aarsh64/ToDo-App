import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators, MinLengthValidator, AbstractControl } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { getInjectionTokens } from '@angular/core/src/render3/discovery_utils';
import { getTNode } from '@angular/core/src/render3/util';
import { getOrCreateCurrentQueries } from '@angular/core/src/render3/state';
import { useAnimation } from '@angular/animations';
import { user } from './user';
//import { ConsoleReporter } from 'jasmine';
import { AuthService } from '../auth.service';
//import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseAuth } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
 // email=this.userForm.value.email;
  usersCustomerId: string;
  constructor(private afAuth: AngularFireAuth,
    private router: Router, private authService: AuthService, private db: AngularFirestore) {

  }
  
  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  tryLogin() {

    // this.db.collection('users').add({
    //   Name: this.userForm.value.name,
    //   Time: this.userForm.value.time,
    //   uid: this.usersCustomerId
    // });


    this.afAuth.auth.signInWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password).then(
      (success) => {
        console.log('logged in successfullty.');
        this.router.navigate(['/userdata']);
        console.log('promise is accepted.');
      });
    this.userForm.reset();
  }

  signUp() {

      //Add Users Credentials to the 'users' database in FireBase....
    this.db.collection('users').add({
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    });

    return this.afAuth.auth.createUserWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password).then(
      (success) => {
        window.alert('New account has been created.');
      }
    );
    this.userForm.reset();
  }
  

}
