import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HttpService} from './http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private baseURL = this.httpS.baseURL
    //private baseURL = 'http://statengines.org:3026'


    private tokenCheckInterval: any;
    constructor(private httpC: HttpClient, private router: Router, private httpS: HttpService, private snackBar: MatSnackBar){
        // if (this.http.isLoggedIn()){
        //     // return true
        // } else {
        //     console.log ("checking token expiration")
        //     localStorage.removeItem("userToken")
        //     localStorage.removeItem("userData");
        //     this.router.navigate(['login'])
        //     this.snackBar.open("Your token has expired. Please Re-login","",{duration:60000});
        //     // return false;
        // }
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.httpS.getAuthentication()) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.httpS.getAuthentication()}`,
          });
          const headersData = { headers: headers };
    
          this.httpC.get<boolean>(`${this.baseURL}/api/authenticate`, headersData).subscribe(
            data => {
            //   console.log("THIS data ", data);
              var dataString = JSON.stringify(data);
              var dataJson = JSON.parse(dataString);
              if (dataJson['value']) {
                return true;
              } else {
                if (dataJson['error'] === 'TokenExpiredError') {
                    this.httpS.logOut();
                    // window.location.reload();
                    this.snackBar.open("Token has expired. Please Re-login","",{duration:5000});
                    return false
                } else {
                    this.httpS.logOut();
                    // window.location.reload();
                    this.snackBar.open("Invalid token. Please Re-login","",{duration:5000});
                    return false
                }
              }
            }
          );
          return true;
        } else {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          this.router.navigate(['login']);
        //   this.snackBar.open('', '', { duration: 5000 }); 
          return false;
        }
      }

}