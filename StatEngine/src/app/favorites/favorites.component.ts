import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteItem } from '../models/favoriteItem.model';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})



export class FavoritesComponent {

  
  // favorites: FavoriteItem[] = [
  //   // { id: 1, name: 'Hippo', introduction:"Say something about yourself", kills: 10, deaths: 5, KD:0, karmaRatio:0, likes: 5, dislikes: 1 , img_url: 'assets/images/Hippo.png' },
  //   // { id: 2, name: 'Hippo the Smurf', introduction:"Definitely not a smurf", kills: 8, deaths: 3, KD:0, karmaRatio:0, likes: 1,  dislikes: 20, img_url: 'assets/images/Hippo_the_smurf.png' },
  //   // Add more favorites here
  // ];


  favorites: FavoriteItem[] = [
    // { id: 1, name: 'Hippo', introduction:"Say something about yourself", kills: 10, deaths: 5, KD:0, karmaRatio:0, likes: 5, dislikes: 1 , img_url: 'assets/images/Hippo.png' },
    // { id: 2, name: 'Hippo the Smurf', introduction:"Definitely not a smurf", kills: 8, deaths: 3, KD:0, karmaRatio:0, likes: 1,  dislikes: 20, img_url: 'assets/images/Hippo_the_smurf.png' },
    // Add more favorites here
  ];
  userBeenFavorited : boolean = true;

  constructor (private router:Router, private formBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {

    //called the getfavoritelist http request to get the most current favorite list in the database and store it in the local storage
    this.getFavoriteList(); 

    //called the getStats in the backend (through steam) to get the most current stats
    this.getFavoriteData(); 

  }

  isUserFavorited(userid: string): boolean {
    // const favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]  
    // return favorite_list.includes(userid); 

    return this.favorites.some(user => user.userid === userid);
  }

getFavoriteList (){
  const userid = JSON.parse(localStorage.getItem("userData"))["userid"]    
  this.http.getFavoriteList(userid).subscribe(
    (response:any)=>{
    // if (response.data == []){
    //   //favorite_list is empty
    //   const userData = JSON.parse(localStorage.getItem("userData"))
    //   userData.favorite_list = response.data;
    //   localStorage.setItem("userData", JSON.stringify(userData));
    // }
    // else{
      this.http.favorite_list = response.data //response can be an empty array (ex. []) or an array that contain favorited userids
      const userData = JSON.parse(localStorage.getItem("userData"))
      userData.favorite_list = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      // console.log (this.http.favorite_list)
    // }
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
  
getFavoriteData(){
  // this.getFavoriteList()
  // console.log (this.http.favorite_list)
  const user_favorite_list = JSON.parse(localStorage.getItem("userData"))["favorite_list"]  
  for (const favorite_userid of user_favorite_list) {
    this.http.getStats(favorite_userid);//update the stats of the current userid
    this.http.getFavoriteData(favorite_userid).subscribe(
      (response:any)=>{


          const newFavorite: FavoriteItem = response.data
          // console.log ("Updated favorite list: ", response.data)
          this.favorites.push(newFavorite)
        

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

userPageRedirect(selectedUserID){
  this.router.navigate(['user', selectedUserID])
}


favorite(selectedUserID){

  this.http.favorite(selectedUserID)

  // console.log ("now favorite")
  this.userBeenFavorited = true
  // this.getFavoriteList();
  // this.getFavoriteData();

}

unfavorite(selectedUserID){
  this.http.unfavorite(selectedUserID)

// console.log ("no longer favorite")
this.userBeenFavorited = false
// this.getFavoriteList();


// this.getFavoriteData();
}

toggleFavorite(selectedUserID) {

  if (this.userBeenFavorited) {
    this.unfavorite(selectedUserID); // Call unfavorite() when user is already favorited
  } else {
    this.favorite(selectedUserID); // Call favorite() when user is not favorited
  }
  // this.userBeenFavorited = !this.userBeenFavorited; // Toggle the favorite status

  window.location.reload();
  // this.ngOnInit();
;
}
  
  
  // like(favorite: any) {
  //   favorite.likes++;
  // }

  // dislike(favorite: any) {
  //   favorite.dislikes++;
  // }

}

// interface FavoriteItem {
//   userid: number;
//   username: string;
//   introduction: "Say something about yourself";
//   kills: number;
//   deaths: number;
//   KD: number;
//   karmaRatio: number;
//   likes: number;
//   dislikes: number;
//   profile_img_url: string;
// }