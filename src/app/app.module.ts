import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    UserComponent,
    //AngularFirestoreModule,
    //AngularFireStorageModule,
    //AngularFireDatabaseModule
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
     NgxMaterialTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

