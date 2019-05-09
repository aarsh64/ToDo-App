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
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'process';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  //email=this.userForm.value.email;
  usersCustomerId: string;
  loadUser: boolean;
  constructor(private toastr: ToastrService, private authService: AuthService, private afAuth: AngularFireAuth,
    private router: Router, private db: AngularFirestore, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

  }


  ngOnInit() {
    //...........Log-In form validation...............
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });


  }


  tryLogin() {
    this.loadUser = true;
    console.log('Entered in Login');
    this.afAuth.auth.signInWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password).then(
      (success) => {
        console.log('logged in successfullty.');
        this.afAuth.authState.subscribe(v => console.log(v, 'auth state after login'))
        this.router.navigate(['/userdata']);
        this.toastr.success('Logged In Successfully!');
        console.log('promise is accepted.');
        this.loadUser=false;

      }, (error) => {
        this.toastr.error(error.message);
        this.loadUser=false;

       // this.router.navigate[('/login')];
      });
    console.log('just get out of it..');
    //this.userForm.reset();
  }


  signUp() {
    //Add Users Credentials to the 'users'-collection in FireBase....
    this.loadUser = true;
    this.db.collection('users').add({
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    });

    return this.afAuth.auth.createUserWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password).then(
      (success) => {
       
        // window.alert('New account has been created.');
        this.toastr.info('Account Successfully Created.');
        this.router.navigate(['/userdata']);
        this.db.collection("activities").add({
          Name: "Demo",
          Time:12 ,
          uid: this.usersCustomerId
        });
        this.db.collection("doneActivities").add({
          Name: "Demo",
          Time:12 ,
          uid: this.usersCustomerId
        });
        this.loadUser=false;
      }, (error) => {

        this.toastr.error(error.message);
        // window.alert('The account already exists...');
        console.log(error);
        //this.router.navigate(['/login']);
        this.loadUser=false;
      }
    );
   
    this.userForm.reset();
  }
  // login() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  //   this.router.navigate(['/userdata']);
  // }

}
