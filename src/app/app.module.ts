import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserComponent } from './user/user.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from '/home/pk/ToDo/src/app/auth.service';
const routes: Routes = [{ path: '', redirectTo: 'login-logout', pathMatch: 'full' },
                        { path: 'login-logout', component: UserComponent },
                        { path: 'userdata', canActivate: [AuthGuard], component: ActivityComponent }];


@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    UserComponent
    //  AngularFireAuthModule                     

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //hourValidatorDirective,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxMaterialTimepickerModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [AuthGuard, AuthService,UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

