import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

    authToken: any;
    user: any;

  constructor(private http: Http) { }

  //register the user to the backend database
  registerUser(user){
      let headers = new Headers();

      headers.append('content-type', 'application/json');
      //match the router in user.js
      return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());//get the data from backend
  }
//authenticate users
  authenticateUser(user){
      let headers = new Headers();

      headers.append('content-type', 'application/json');
      //match the router in user.js
      return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());//get the data from backend
  }

  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }


  //fetch the token from localStorage
 loadToken(){
     const token = localStorage.getItem('id_token');
     this.authToken = token;
 }
 //check the user is logged in or not
 loggedIn(){
     //return tokenNotExpired('id_token');
     return tokenNotExpired('id_token');
 }

 logout(){
     this.authToken = null;
     this.user = null;
     localStorage.clear();
 }

}
