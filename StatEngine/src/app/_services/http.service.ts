import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://localhost:3026'
  constructor(private http: HttpClient) { }

  createUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/createUser`,user);
  }

  //passes a user object to the [server url]/api/login to check if this user exists
  checkUser(user:Object):Observable<Object>{
    console.log("HTTP SERVICE:",user);
    return this.http.post(`${this.baseURL}/api/login`,user);

  }

  searchUser(username:Object):Observable<Object>{
    
    // let queryParams = new HttpParams(); 
    // queryParams = queryParams.set("username", this.username);

    //console.log("HTTP SERVICE:",username);

    return this.http.get(`${this.baseURL}/api/searchuser/${username}`);

  }


  deleteAccount(username:Object):Observable<Object>{

    return this.http.delete(`${this.baseURL}/api/deleteAccount/${username}`);

  }

}



