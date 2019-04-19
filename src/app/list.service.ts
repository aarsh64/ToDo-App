import { Injectable } from '@angular/core';
import { Activity } from './activity';
import { Activities } from '/home/pk/ToDo/src/activities';
import {Observable,of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }
  ngOnInit() {
    this.getActivities();
  }
  getActivities(): Observable<Activity[]> {
    return of (Activities);
  }

}
