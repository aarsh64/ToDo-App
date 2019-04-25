import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Activity } from '/home/pk/ToDo/src/app/activity';
import { Activities } from '/home/pk/ToDo/src/activities';
import { splitClasses } from '@angular/compiler';
import { AbstractWebDriver } from 'protractor/built/browser';
import { FormGroup, FormControl, Validators, AbstractControl, Form, ControlContainer } from '@angular/forms';
import { timingSafeEqual } from 'crypto';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { isError } from 'util';
//import { hourValidatorDirective } from '../shared/hourValidatorDirective';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { ConsoleReporter } from 'jasmine';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-activity,',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {



  activityMap = []; //used to get all the activities that are stored in FireBase activities collection... 
  deleteMap = [];   //used to get all the activities that are moved to doneActivities collection....
  myform: FormGroup;
  allActivities = Activities;   //assigning all the activities to allActivities...
  doneActs: Activity[];
  findIndex: number;
  timelap = new Date();
  t: number[] = [];
  systemMinute = this.timelap.getMinutes();
  systemHour = this.timelap.getHours();
  item: any;
  activities: any;
  f: [];
  
  private taskDoc: AngularFirestoreDocument;
  constructor(private db: AngularFirestore) {
    this.db.collection("activities").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('id is:', `${doc.id} => ${doc.data()}`, doc.data());
        this.activityMap.push({ id: doc.id, Name: doc.data().Name, Time: doc.data().Time });
        console.log('aMap value is:', this.activityMap);

      });
    });
  
    this.db.collection("doneActivities").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('id is:', `${doc.id} => ${doc.data()}`, doc.data());
        this.deleteMap.push({ id: doc.id, Name: doc.data().Name, Time: doc.data().Time });
        console.log('aMap value is:', this.deleteMap);
  
      });
    });
  
  
  
  }
  

  ngOnInit() {

    //.................Form Validation part.......................
    this.myform = new FormGroup({
      name: new FormControl('', Validators.required),
      time: new FormControl('', [Validators.required, this.hourValidator])
    })

    // console.log(this.myform.value.time.hours);

    {
      this.findIndex = this.activityMap.findIndex(obj => obj.Time.hour < this.systemHour);
      while (this.findIndex !== -1) {

        this.activityMap.splice(this.findIndex, 1);
        this.findIndex = this.activityMap.findIndex(obj => obj.Time.hour < this.systemHour);
        console.log(this.findIndex);

      }

    }




  }


  //.............To Validate that user cant input past time in ngTimePikcer in Form...................

  hourValidator(control: FormControl) {

    const val = control.value;
    var j = new Date().getHours();
    console.log('current time value is :', val);
    if (control.value) {
      if (j > val.hour) {
        return { isError: false }

        console.log('cant be proceed further.');

      }
      else {
        console.log('Hurry Up!');
      }
    }
    return null;
  }

  onClick(i: number, x: any): void {

    console.log("selected index:", i);
    console.log('x is:', x);
    //...........To remove the activity by clicking on it.........
    
    this.doneActs = this.activityMap.splice(i, 1);
    console.log(typeof this.doneActs);
    this.deleteMap.push({ id: x.id, Name: x.Name, Time: { hour: x.Time.hour, minute: x.Time.minute } });


    // this.db.collection("activities").get().subscribe((querySnapshot) => {
    //   querySnapshot.forEach((x) => {
    //     console.log('id is:', `${x.id} => ${x.data()}`, x.data());
    //     this.delMap.push(x.id, x.data, x.data);
    //     //console.log('delMap value is:', this.delMap);
    //   });
    // });    


    //...........To delete the document from the activities collection.............

    this.db.collection("activities").doc(x.id).delete().then(function () {
      console.log("Document successfully deleted from activities collection!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });

    //.............Moving deleted document to doneActivities collection.................

    this.db.collection('doneActivities').add({
      name: x.Name,
      Time: x.Time
    });


  }

  //................To delete the activity compeletly from the list..................

  delItems(y: any, e: number) {


   
    //   this.db.collection("doneActivities").get().subscribe((querySnapshot) => {
    //     querySnapshot.forEach((y) => {
    //       console.log('id is:', `${y.id} => ${y.data()}`, y.data());
    //       this.delMap.push({ id: y.id, Name: y.data().Name, Time: y.data().tim });
    //       //console.log('delMap value is:', this.delMap);

    //     });
    //   });
    //   //console.log('Lol:', this.delMap);



    //........To delete document from the doneActivities collection in FireBase.........

    this.db.collection("doneActivities").doc(y.id).delete().then(function () {
      console.log("Document successfully deleted from doneActivities collection!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });


    //...........To delete the selected item from HTML page..............

    this.deleteMap.splice(e, 1);


  }



  //..............To add activities in the list....................


  apendAct() {


    this.activityMap.push({ Name: this.myform.value.Name, Time: { hour: this.myform.value.time.hour, minutes: this.myform.value.time.minute } });
    console.log(this.myform.value);


    //............To Add new activiteis to FireBase in activities collectoin...............


    this.db.collection("activities").add({
      Name: this.myform.value.name,
      Time: this.myform.value.time
    });


    //...............After getting input the form will be reset...............
    this.myform.reset();
    
    
    
    // }
    // this.db.collection('activity').add({Name:this.myform.value.Activity,Time:{hours: this.myform.value.time.hour, minutes: this.myform.value.time.minute}});



  }






}