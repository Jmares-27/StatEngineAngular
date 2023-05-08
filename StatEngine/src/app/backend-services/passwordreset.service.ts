import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordresetService {

  constructor(private http:HttpClient) {}
  
    //Password reset service that sends the new password to the backend
    resetPassword(password: String):Observable<any>{
      return this.http.post('/api/resetpassword',{password})
    }
  
}
