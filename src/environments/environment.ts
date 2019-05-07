import { config } from 'rxjs';
import * as firebase from 'firebase/app';
//import { pureFunctionV } from '@angular/core/src/render3';


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBBPPAmr6iIIE18i-bzs6ZpuET_PYmVTUU",
    authDomain: 'todo-a5407.firebaseapp.com',
    databaseURL: 'https://todo-a5407.firebaseio.com',
    projectId: "todo-a5407",
    storageBucket: 'todo-a5407.appspot.com',
    messagingSenderId: '806162509925'
  }
};

// //to get refrence....
// var root=this.firebase.database().ref('todo-a5407');
// root.on('value',function(snapshot){
//   console.log('de',snapshot.val());
// })