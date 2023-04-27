import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password:string ):Observable<any>{
    return this.http.post('/api/login',{email, password})
  }

  logout():Observable<any>{
    return this.http.post('/api/logout',{})
  }

  register(username:string, email:string, password:string):Observable<any>{
    return this.http.post('/api/register',{username, email, password})
  }
}
