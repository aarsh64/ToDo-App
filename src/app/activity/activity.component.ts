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


@Component({
  selector: 'app-activity,',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {



  myform: FormGroup;
  activity = Activities;
  act1: Activity[];
  find1: number;
  doneActivity: Activity[] = [];
  timelap = new Date();
  t: number[] = [];
  z = this.timelap.getMinutes();
  y = this.timelap.getHours();

  constructor() { }
  ngOnInit() {

    //this.ListService.getActivities();
    
    


        //Form Validation.....
    
    this.myform = new FormGroup({
      Active: new FormControl('', Validators.required),
      time: new FormControl('', [Validators.required, this.hourValidator])
    })
    // console.log(this.myform.value.time.hours);


    this.find1 = this.activity.findIndex(obj => obj.tim.hours < this.y);
    while (this.find1 !== -1) {

      this.activity.splice(this.find1, 1);
      this.find1 = this.activity.findIndex(obj => obj.tim.hours < this.y);
      console.log(this.find1);
    }


  }


//To Validate that user cant input past time.
  
hourValidator(control: FormControl) {

    const val = control.value;
    var j = new Date().getHours();
    console.log('value is :', val);
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

//To remove the activities from the list.

  onClick(i: number, x: Activity): void {
    console.log("selected index:", i);

    this.act1 = this.activity.splice(i, 1);
    console.log(typeof this.act1);
    this.doneActivity.push({ act: x.act, tim: { hours: x.tim.hours, minutes: x.tim.minutes } });

    console.log(this.doneActivity.length);


  }

//To delete the activity compeletly from the list.

  delItems(y: Activity, e: number) {

    this.doneActivity.splice(e, 1);
  }



//To add activities in the list.


  apendAct() {
    this.activity.push({ act: this.myform.value.Active, tim: { hours: this.myform.value.time.hour, minutes: this.myform.value.time.minute } });
    console.log(this.myform.value);
    this.myform.reset();
  }
}








