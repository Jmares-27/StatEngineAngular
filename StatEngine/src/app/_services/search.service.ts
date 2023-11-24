import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // private baseURL = 'http://localhost:3026'
  // private baseURL = 'http://statengines.org:3026'

  private baseURL = this.httpS.baseURL

  public userID: string
  public message = '';
  public display_user = false;
  public userData = {
    id: "",
    username: "",
    email: "",
    password: "",
    steamID: "",
    introduction:"",
    KD: 0,
    likes: 0,
    dislikes: 0,
    karmaRatio: 1,
    profile_img_url: "",
    friend_list: "",
  };

  constructor(private httpS:HttpService, private http:HttpClient,private router: Router) { 

  }


  setUserData(userData: Object): void{
    for (const value in userData) {
      this.userData[value] = userData[value]
    }
  }

  getUserData(): Object{
    return this.userData
  }

  searchUser(username:Object):Observable<Object>{
    return this.http.get(`${this.baseURL}/api/searchuser/${username}`)
  }
  
  
  getSuggestions(searchUsername:string):Observable<Object>{
    return this.http.get(`${this.baseURL}/api/suggestions/${searchUsername}`)
    
  }

}
