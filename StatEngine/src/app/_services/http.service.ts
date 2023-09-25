import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://3.144.231.224:3026'
  private bool = false;
  constructor(private http: HttpClient, private router: Router) { }

  
  createUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/createUser`,user);
  }

  //passes a user object to the [server url]/api/login to check if this user exists
  checkUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/login`,user);
  }

  getAuthentication() {
    var userDataString = localStorage.getItem("userData");
    // var userDataString = JSON.stringify (userData);
    // console.log ("userData", userDataString);
    if (userDataString){
      var userData = JSON.parse(userDataString);
      // console.log ("This is token", userData.token);
      return userData.token;  

    }
    else {
      console.log ("No data");
      return null;
    }
  
  }
  
  isLoggedIn(){
    this.http.get<boolean>(`${this.baseURL}/api/authenticate`).subscribe(
      data =>{
        var dataString = JSON.stringify(data);
        var dataJson = JSON.parse(dataString);
        this.bool = dataJson["value"]
      }
    )
    return this.bool;
  }

  logOut(){
    localStorage.removeItem("userData");
    this.router.navigate(['home'])
    window.location.reload();
  }
  searchUser(username:Object):Observable<Object>{
    
    // let queryParams = new HttpParams(); 
    // queryParams = queryParams.set("username", this.username);

    //console.log("HTTP SERVICE:",username);

    return this.http.get(`${this.baseURL}/api/searchuser/${username}`);

  }

  // updatePassword(userData:JSON):Observable<Object>{
  //   return this.http.post(`${this.baseURL}/api/resetpassword`,userData);
  // }

  deleteAccount(username:Object):Observable<Object>{

    return this.http.delete(`${this.baseURL}/api/deleteAccount/${username}`);

  }

  updatePassword(username:Object, newPa:Object):Observable<Object>{

    return this.http.put(`${this.baseURL}/api/updatePassword/${username}/${newPa}`, {username,newPa});
  }

  resetPassword(username:Object, password:Object):Observable<Object>{

    return this.http.post(`${this.baseURL}/api/resetpassword`, {username,password});
  }


  bugReport(bugReportDetail:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/bugReport`,bugReportDetail);
  }

  updateSteamID(steamID:Object, username:Object):Observable<Object>{
    console.log("HTTP SERVICE:",steamID,username)
    return this.http.post(`${this.baseURL}/api/setSteamID`, {steamID,username});
  }

  getStats(username:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/getStats/${username}`, {username});
  }

}



