import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteItem } from '../models/favoriteItem.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseURL = 'http://localhost:3026'
  // public baseURL = 'http://statengines.org:3026'
  private bool = false;
  hasLoggedIn : boolean = false
  favorite_list :string[] = []



  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { 
    if (localStorage.getItem("userData")){
      const userid = JSON.parse(localStorage.getItem("userData"))["userid"]
      this.getFavoriteList(userid).subscribe(
        (response:any)=>{
        if (response.data == "No favorite"){
          //favorite_list is empty
        }
        else{
          const userData = JSON.parse(localStorage.getItem("userData"))
          userData.favorite_list = response.data;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        },
        error => {
          if (error.status == 500 ){
            if (error.error.error == "Cannot find the user data in the database") {
              this.snackBar.open("Error in finding user data","",{duration:2000});
            }
            // else if (error.error.error == "TokenExpiredError"){
            //   this.http.logOut()
            //   this.snackBar.open("Token has expired","",{duration:Infinity});
            // }
            // else if (error.error.error == "invalid token") {
            //   this.http.logOut()
            //   this.snackBar.open("Invalid token","Login",{duration:Infinity});
            // }
            else {
              console.log ("An error occured:",error.error.error)
            }
          }
          else {
            console.log("An error occured:", error);
          }
        })

    }
      
  }

  
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

  getUserInventory(steamID:string){
    return this.http.get(`${this.baseURL}/api/getUserInventory/${steamID}`);
  }
  
  // getFavoriteDataService(){
  //   // this.getFavoriteList()
  //   // console.log (this.http.favorite_list)
  //   const user_favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]  
  //   for (const favorite_userid of user_favorite_list) {
  //     this.getStats(favorite_userid);//update the stats of the current userid
  //     this.getFavoriteData(favorite_userid).subscribe(
  //       (response:any)=>{
  
  
  //           const newFavorite: FavoriteItem = response.data
  //           // console.log ("Updated favorite list: ", response.data)
  //           this.favorites.push(newFavorite)
          
  
  //       },
  //       error => {
  //         if (error.status == 500 ){
  //           if (error.error.error == "Cannot find the user data in the database") {
  //             this.snackBar.open("Error in finding user data","",{duration:2000});
  //           }
  //           // else if (error.error.error == "TokenExpiredError"){
  //           //   this.http.logOut()
  //           //   this.snackBar.open("Token has expired","",{duration:Infinity});
  //           // }
  //           // else if (error.error.error == "invalid token") {
  //           //   this.http.logOut()
  //           //   this.snackBar.open("Invalid token","Login",{duration:Infinity});
  //           // }
  //           else {
  //             console.log ("An error occured:",error.error.error)
  //           }
  //         }
  //         else {
  //           console.log("An error occured:", error);
  //         }
  //       })
  
  //   }
  // }

// getFavoriteListService (){
//   const userid = JSON.parse(localStorage.getItem("userData"))["userid"]    
//   this.getFavoriteList(userid).subscribe(
//     (response:any)=>{
//     // if (response.data == []){
//     //   //favorite_list is empty
//     //   const userData = JSON.parse(localStorage.getItem("userData"))
//     //   userData.favorite_list = response.data;
//     //   localStorage.setItem("userData", JSON.stringify(userData));
//     // }
//     // else{
//       this.favorite_list = response.data //response can be an empty array (ex. []) or an array that contain favorited userids
//       const userData = JSON.parse(localStorage.getItem("userData"))
//       userData.favorite_list = response.data;
//       localStorage.setItem("userData", JSON.stringify(userData));
//       // console.log (this.http.favorite_list)
//     // }
//     },
//     error => {
//       if (error.status == 500 ){
//         if (error.error.error == "Cannot find the user data in the database") {
//           this.snackBar.open("Error in finding user data","",{duration:2000});
//         }
//         // else if (error.error.error == "TokenExpiredError"){
//         //   this.http.logOut()
//         //   this.snackBar.open("Token has expired","",{duration:Infinity});
//         // }
//         // else if (error.error.error == "invalid token") {
//         //   this.http.logOut()
//         //   this.snackBar.open("Invalid token","Login",{duration:Infinity});
//         // }
//         else {
//           console.log ("An error occured:",error.error.error)
//         }
//       }
//       else {
//         console.log("An error occured:", error);
//       }
//     })

  
// }
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

  favorite(userid: string) { 
    // console.log ("favorite function from http service was called")
    this.favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]
    if (userid ==  JSON.parse(localStorage.getItem("userData"))["userid"]){
      //you can't favorite yourself! thats weird!
    }
    else{
      if (this.favorite_list.length == 0) {
        this.favorite_list.push(userid)
      }
      else {
        if (this.favorite_list.includes(userid)) {
          
          //this user has been favorited

        } else {
          // console.log ("current user favorite list: ", this.favorite_list)
          this.favorite_list.push(userid);
          //add this selected userid to the favorite list

        }
      }

    }
    const currentUserID = JSON.parse(localStorage.getItem("userData"))["userid"]
    const currentUserToken = JSON.parse(localStorage.getItem("userData"))["token"]
    this.updateFavoriteList(currentUserID, currentUserToken, this.favorite_list).subscribe(
      (response:any)=>{
        if (response.message ==  "Favorite list updated!") {
          this.snackBar.open("User favorited successfully","",{duration:2000});
        }
    },error => {
      if (error.status == 500 ){
        if (error.error.error == "Cannot find the user data in the database") {
          this.snackBar.open("Error in finding user data","",{duration:2000});
        }
        else if (error.error.error == "TokenExpiredError"){
          this.logOut()
          this.snackBar.open("Token has expired","",{duration:Infinity});
        }
        else if (error.error.error == "invalid token") {
          this.logOut()
          this.snackBar.open("Invalid token","Login",{duration:Infinity});
        }
        else {
          console.log ("An error occured:",error.error.error)
        }
      }
      else {
        console.log("An error occured:", error);
      }
    })
  }

  unfavorite(userid: any) {
    this.favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]
    console.log ("sent userid from http.service ", userid)
    if (userid ==  JSON.parse(localStorage.getItem("userData"))["userid"]){
      //you can't unfavorite yourself! thats weird!
    }
    else{
      if (this.favorite_list.length == 0) {
        //there is no one here to unfavorite
      }
      else {
        if (this.favorite_list.includes(userid)) {
          const index = this.favorite_list.indexOf(userid);
          if (index !== -1) {
            this.favorite_list.splice(index, 1);
          }
          //this user has been unfavorited from this favorite list. We now need to update the favorite_list in the database

        } else {
  
          //userid does not exist in the favorite list

        }
      }

    }
    const currentUserID = JSON.parse(localStorage.getItem("userData"))["userid"]
    const currentUserToken = JSON.parse(localStorage.getItem("userData"))["token"]
    this.updateFavoriteList(currentUserID, currentUserToken, this.favorite_list).subscribe(
      (response:any)=>{
        if (response.message ==  "Favorite list updated!") {
          this.snackBar.open("User unfavorited successfully","",{duration:2000});
        }
    },error => {
      if (error.status == 500 ){
        if (error.error.error == "Cannot find the user data in the database") {
          this.snackBar.open("Error in finding user data","",{duration:2000});
        }
        else if (error.error.error == "TokenExpiredError"){
          this.logOut()
          this.snackBar.open("Token has expired","",{duration:Infinity});
        }
        else if (error.error.error == "invalid token") {
          this.logOut()
          this.snackBar.open("Invalid token","Login",{duration:Infinity});
        }
        else {
          console.log ("An error occured:",error.error.error)
        }
      }
      else {
        console.log("An error occured:", error);
      }
    })
  }

  deleteAccount(token:string, userid:string):Observable<Object>{
    const params = new HttpParams()
    .set('token', token)
    .set('userid', userid);
    return this.http.delete(`${this.baseURL}/api/deleteAccount`, {params});

  }

  updatePassword(username:Object, token:Object, userid:Object, oldpass:Object,  newpass:Object):Observable<Object>{

    return this.http.put(`${this.baseURL}/api/updatePassword/${username}`, {token, userid, oldpass, newpass});
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


  getFavoriteList(userid: string):Observable<Object>{
    return this.http.get(`${this.baseURL}/api/getFavoriteList/${userid}`);
  }

  updateFavoriteList (userid:string, token:string, favorite_list:Array<string> ):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/updateFavoriteList`, {userid, token, favorite_list});
  }

  getFavoriteData(userid: string):Observable<Object>{
    return this.http.get(`${this.baseURL}/api/getFavoriteData/${userid}`);
  }

  getSteamAvatarUrl(id:string):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/getSteamProfileUrl/${id}`, {});
  }

  setSteamAvatarUrl(userid:Object, token:Object, profile_img_url:string):Observable<Object>{
    return this.http.post(`${this.baseURL}/api/setSteamProfileUrl`, {userid, token, profile_img_url});
  }

  getUserSteamID(Obj_id:string):Observable<Object>{
    // console.log(Obj_id)
    return this.http.get(`${this.baseURL}/api/getUserSteamID/${Obj_id}`, {});
  }

  getMarketData():Observable<Object>{
    return this.http.get(`${this.baseURL}/api/getMarketData/`, {});
  }

  getMarketDataPreview():Observable<Object>{
    return this.http.get(`${this.baseURL}/api/getMarketDataPreview/`, {});
  }


}