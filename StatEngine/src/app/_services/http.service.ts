import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://localhost:3026'
  private bool = false;
  constructor(private http: HttpClient, private router: Router) { }

  
  createUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/createUser`,user);
  }

  //passes a user object to the [server url]/api/login to check if this user exists
  checkUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/login`,user);
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
    localStorage.removeItem("token");
    this.router.navigate(['home'])
  }
  searchUser(username:Object):Observable<Object>{
    
    // let queryParams = new HttpParams(); 
    // queryParams = queryParams.set("username", this.username);

    //console.log("HTTP SERVICE:",username);

    return this.http.get(`${this.baseURL}/api/searchuser/${username}`);

  }

  updatePassword(userData:JSON):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/resetpassword`,userData);
  }

  deleteAccount(username:Object):Observable<Object>{

    return this.http.delete(`${this.baseURL}/api/deleteAccount/${username}`);

  }

}



