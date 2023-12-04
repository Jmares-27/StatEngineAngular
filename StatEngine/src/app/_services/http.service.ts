import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseURL = 'http://localhost:3026'
  // public baseURL = 'http://statengines.org:3026'
  private bool = false;
  hasLoggedIn : boolean = false

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  
  createUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/createUser`,user);
  }

  //passes a user object to the [server url]/api/login to check if this user exists
  checkUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/login`,user);
  }

  getAuthentication() {
    // var userDataString = localStorage.getItem("userToken");
    // var userDataString = JSON.stringify (userData);
    // console.log ("userData", userDataString);
    if (localStorage.getItem("userData")){
      const token = JSON.parse(localStorage.getItem("userData"))["token"];
      // console.log ("This is token", token);
      return token;  

    }
    else {
      // console.log ("No data");
      // this.snackBar.open("You have not logged in!","",{duration:2000});
      return null;
    }
  
  }
  
  
  isLoggedIn(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthentication()}`,
    });

    const headersData = { headers: headers };


    this.http.get<boolean>(`${this.baseURL}/api/authenticate`, headersData).subscribe(
      data =>{
        var dataString = JSON.stringify(data);
        var dataJson = JSON.parse(dataString);
        this.bool = dataJson["value"]
      }
    )
    return this.bool;
  }

  logOut(){
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData");
    this.hasLoggedIn = false
    this.router.navigate(['login'])
    window.location.reload();
  }
  // searchUser(username:Object):Observable<Object>{
    
  //   // let queryParams = new HttpParams(); 
  //   // queryParams = queryParams.set("username", this.username);

  //   //console.log("HTTP SERVICE:",username);

  //   return this.http.get(`${this.baseURL}/api/searchuser/${username}`);

  // }

  // updatePassword(userData:JSON):Observable<Object>{
  //   return this.http.post(`${this.baseURL}/api/resetpassword`,userData);
  // }

  deleteAccount(token:string, userid:string):Observable<Object>{
    const params = new HttpParams()
    .set('token', token)
    .set('userid', userid);
    return this.http.delete(`${this.baseURL}/api/deleteAccount`, {params});

  }

  updatePassword(username:Object, token:Object, userid:Object, oldpass:Object,  newPa:Object):Observable<Object>{

    return this.http.put(`${this.baseURL}/api/updatePassword/${username}`, {token, userid, oldpass, newPa});
  }

  resetPassword(username:Object, password:Object):Observable<Object>{

    return this.http.post(`${this.baseURL}/api/resetpassword`, {username,password});
  }


  bugReport(bugReportDetail:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/bugReport`,bugReportDetail);
  }

  updateSteamID(steamID:string, userid:string):Observable<any>{
    // console.log("HTTP SERVICE:",steamID,userid)
    return this.http.post(`${this.baseURL}/api/setSteamID`, {steamID,userid});
  }

  // getStats(username:Object):Observable<Object>{
  //   return this.http.post(`${this.baseURL}/api/getStats/${username}`, {username});
  // }

  getStats(id:string):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/getStats/${id}`, {id});
  }

  getInventory(id:string):Observable<Object>{
    console.log("HTTP SERVICE:",id);
    return this.http.post(`${this.baseURL}/api/getInventory/${id}`, {id});
  }

  getUserid(userid:string):Observable<Object>{
    console.log("HTTP SERVICE:",userid);
    return this.http.post(`${this.baseURL}/api/help/bssteam`,{userid});
  }


  authenticateWithSteam() {
    const apiUrl = 'http://localhost:3026/api/auth/steam/return';

    // Append the userid as a query parameter
    const userid = JSON.parse(localStorage.getItem("userData"))["userid"]
    const urlWithParams = `${apiUrl}?userid=${userid}`;

    window.location.href = urlWithParams;

    // // Make the GET request
    // this.http.get(urlWithParams).subscribe(
    //   (response) => {
    //     console.log('Authentication successful:', response);
    //   },
    //   (error) => {
    //     console.error('Authentication failed:', error);
    //   }
    // );
  }

  getSteamId(): Observable<any> {
        const redirectUrl = "http://localhost:3026/api/auth/steam/";

    // const url = 'http://localhost:3026/api/auth/steam/';
    return this.http.get<any>(redirectUrl);
  }
}



