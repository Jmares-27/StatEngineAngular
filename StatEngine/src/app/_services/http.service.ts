import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.put(`${this.baseURL}/api/login`,user);

  }

}
