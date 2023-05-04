import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://localhost:3005'
  constructor(private http: HttpClient) { }

  createUser(user:Object):Observable<Object>{
    return this.http.post(`${this.baseURL}`,user);
  }


}
