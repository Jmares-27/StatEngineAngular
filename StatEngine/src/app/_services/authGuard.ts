import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HttpService} from './http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // public baseURL = 'http://localhost:3026'
    // private baseURL = 'http://statengines.org:3026'
    private baseURL = this.httpS.baseURL

    private tokenCheckInterval: any;
    constructor(public dialog:MatDialog,  private httpC: HttpClient, private router: Router, private httpS: HttpService, private snackBar: MatSnackBar){
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

    openDialogTokenExpired(): void {
      const dialogRef = this.dialog.open(TokenExpiredDialog, {
        disableClose: true, // Prevent closing by clicking outside the dialog
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // user clicked relogin
          this.httpS.logOut();
          window.location.reload();
        } else {
          // User clicked "Cancel" or closed the dialog

        }
      });
    }

    openDialogTokenError(): void {
      const dialogRef = this.dialog.open(TokenErrorDialog, {
        disableClose: true, // Prevent closing by clicking outside the dialog
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User clicked "relogin"
          this.httpS.logOut();
          window.location.reload();
        } else {
          // User clicked "Cancel" or closed the dialog

        }
      });
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

                    this.openDialogTokenExpired()
                    return false
                } else {
                    this.openDialogTokenError()
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

@Component({
  selector: 'token-expired-popup',
  templateUrl: 'token-expired-popup.html',
  standalone:true,
  imports: [MatDialogModule, MatButtonModule]
})
export class TokenExpiredDialog {
  constructor(
    public dialogRef: MatDialogRef<TokenExpiredDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

@Component({
  selector: 'token-error-popup',
  templateUrl: 'token-error-popup.html',
  standalone:true,
  imports: [MatDialogModule, MatButtonModule]
})
export class TokenErrorDialog {
  constructor(
    public dialogRef: MatDialogRef<TokenErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}