import {
  Component,
  OnInit,
  SystemJsNgModuleLoader,
  QueryList,
  Query,
  Input
} from "@angular/core";
import { Activity } from "/home/pk/ToDo/src/app/activity";
import { Activities } from "/home/pk/ToDo/src/activities";
import { splitClasses } from "@angular/compiler";
import { AbstractWebDriver } from "protractor/built/browser";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  Form,
  ControlContainer
} from "@angular/forms";
import { timingSafeEqual } from "crypto";
import { controlNameBinding } from "@angular/forms/src/directives/reactive_directives/form_control_name";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { isError } from "util";
//import { hourValidatorDirective } from '../shared/hourValidatorDirective';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { FirebaseAuth } from "@angular/fire";
import { UserComponent } from "../user/user.component";
import { auth } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { useAnimation } from "@angular/animations";
import { Subject } from "rxjs";
import { switchMap } from "rxjs/operator/switchMap";
import { user } from "../user/user";
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})

export class ActivityComponent implements OnInit {
  @Input() username: string;

  activityMap = []; //used to get all the activities that are stored in FireBase activities collection...
  deleteMap = []; //used to get all the activities that are moved to doneActivities collection....
  myform: FormGroup;
  allActivities = Activities; //assigning all the activities(which are stored in that array) to allActivities...
  doneActs: Activity[];
  findIndex: number;
  timelap = new Date();
  t: number[] = [];
  systemMinute = this.timelap.getMinutes();
  systemHour = this.timelap.getHours();
  item: any;
  activities: any;
  usersCustomerId: string;
  auth: any;
  authID: string;
  final: any;
  loadingData: boolean = false;
  errorCatch: any;
  constructor(private toastr: ToastrService, private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {



  }


  ngOnInit() {

    console.log("current userId:", this.usersCustomerId);
    this.loadingData = false;

    //...............To get uId of the user......................

    this.afAuth.authState.subscribe(auth => {

      if (auth) {
        this.usersCustomerId = auth.uid;
        console.log("uID is:", auth.uid);

        //..................To fetch data of specific user based on the uID...............

        this.db
          .collection("activities", ref => ref.where("uid", "==", auth.uid))
          .get()
          .subscribe(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.loadingData = false;
              console.log(
                "activityId is:",
                `${doc.id} => ${doc.data()}`,
                doc.data()
              )

              this.activityMap.push({
                id: doc.id,
                Name: doc.data().Name,
                Time: doc.data().Time
              });
            });
            console.log("aMap value is:", this.activityMap);

            this.db
              .collection("doneActivities", ref => ref.where("uid", "==", auth.uid))
              .get()
              .subscribe(querySnapshot => {
                querySnapshot.forEach(deleteMap => {
                  this.loadingData = true;
                  console.log(
                    "deleteActivityId is:",
                    `${deleteMap.id} => ${deleteMap.data()}`,
                    deleteMap.data()
                  );
                  this.deleteMap.push({
                    id: deleteMap.id,
                    Name: deleteMap.data().Name,
                    Time: deleteMap.data().Time
                  });
                  console.log("deleteMap value is:", this.deleteMap);
                });

              });
            this.loadingData = true;
          });
        ;
      }


      console.log('after the loading', this.loadingData);
    });


    //.................add-Activity-Form Validation part.......................

    this.myform = new FormGroup({
      name: new FormControl("", Validators.required),
      time: new FormControl("", [Validators.required, this.hourValidator])
    });

    // {   Validtion function which was used when the input was taken from an array stored locally......
    //   this.findIndex = this.activityMap.findIndex(
    //     obj => obj.Time.hour < this.systemHour
    //   );
    //   while (this.findIndex !== -1) {
    //     this.activityMap.splice(this.findIndex, 1);
    //     this.findIndex = this.activityMap.findIndex(
    //       obj => obj.Time.hour < this.systemHour
    //     );
    //     console.log(this.findIndex);
    //   }
    // }
  }

  //.............To Validate that user cant input past time in ngTimePikcer in Form...................

  hourValidator(control: FormControl) {
    const val = control.value;
    var j = new Date().getHours();
    console.log("current time value is :", val);
    if (control.value) {
      if (j > val.hour) {
        return { isError: false };

        console.log("cant be proceed further.");
      } else {
        console.log("Hurry Up!");
      }
    }
    return null;
  }


  onClick(x: any, i: number): void {
    console.log("selected index:", i);
    console.log("x is:", x);

    //...........To remove the activity by clicking on it.........

    this.doneActs = this.activityMap.splice(i, 1);
    console.log(typeof this.doneActs);
    this.deleteMap.push({
      id: x.id,
      Name: x.Name,
      Time: { hour: x.Time.hour, minute: x.Time.minute },
      uid: this.usersCustomerId
    });

    //...........To delete the document from the activities collection.............

    this.db
      .collection("activities")
      .doc(x.id)
      .delete()
      .then(function () {
        console.log(
          "Document successfully deleted from activities collection!"
        );
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    //.............Moving deleted document to doneActivities collection.................

    this.db.collection("doneActivities").add({
      Name: x.Name,
      Time: x.Time,
      uid: this.usersCustomerId
    });
  }
  //................To delete the activity compeletly from the list..................

  delItems(y: any, e: number) {
    //........To delete document from the doneActivities collection in FireBase.........

    this.db
      .collection("doneActivities")
      .doc(y.id)
      .delete()
      .then(function () {
        console.log(
          "Document successfully deleted from doneActivities collection!"
        );
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    //...........To delete the selected item from HTML page..............

    this.deleteMap.splice(e, 1);
  }

  //..............To add activities in the list....................

  apendAct() {
    this.afAuth.authState.subscribe(auth => {
      // this.usersCustomerId = auth.uid;
    });

    this.activityMap.push({
      Name: this.myform.value.name,
      Time: {
        hour: this.myform.value.time.hour,
        minute: this.myform.value.time.minute
      }
    });
    console.log(this.myform.value);

    //............To Add new activiteis to FireBase in activities collectoin...............

    this.db.collection("activities").add({
      Name: this.myform.value.name,
      Time: this.myform.value.time,
      uid: this.usersCustomerId
    });
    this.toastr.info('New activity is added');
    console.log('new activity has been added to the activities collection...');

    //...............After getting input the form will be reset...............

    this.myform.reset();
  }

  //...............Just doing Logout thing................
  doLogout() {
    this.afAuth.auth.signOut();
    this.toastr.success('LoggedOut Succesfullly');
    this.router.navigate(["/login"]);
  }
}
