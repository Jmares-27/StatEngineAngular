import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites = [
    // { id: 1, name: 'Hippo', introduction:"Say something about yourself", kills: 10, deaths: 5, KD:0, karmaRatio:0, likes: 5, dislikes: 1 , img_url: 'assets/images/Hippo.png' },
    // { id: 2, name: 'Hippo the Smurf', introduction:"Definitely not a smurf", kills: 8, deaths: 3, KD:0, karmaRatio:0, likes: 1,  dislikes: 20, img_url: 'assets/images/Hippo_the_smurf.png' },
    // Add more favorites here
  ];



  constructor (private formBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    // Round the kills and deaths properties to 2 decimal places
    for (const favorite of this.favorites) {
      favorite.KD = Math.round(favorite.kills/favorite.deaths * 10) / 10; // Rounds to 2 decimal places
      favorite.karmaRatio = favorite.likes/favorite.dislikes;
    }

  }


  
  favorite(searchStringID:any) {
    this.http.searchUser(searchStringID ).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if (data == "No user exist!" ) {
          // console.log("inside no data") //used for testing
          console.log ("There is no such player exist")
          // this.message = "There is no such player exist"
        }
        else{
          //datafound?

          var dataString = JSON.stringify(data);
          var dataJson = JSON.parse(dataString);


          const userdata = {
            username: dataJson.data.username,
            email: dataJson.data.email,
            password: dataJson.data.password,
            steamID: dataJson.data.steamID,
            kills: 0,
            deaths: 0,
            KD: dataJson.data.KD,
            likes: dataJson.data.likes,
            dislikes: dataJson.data.dislike,
            karmaRatio: dataJson.data.karmaRatio,
            profile_img_url: dataJson.data.profile_img_url,
            friend_list: dataJson.data.friendlist,
          };

          this.favorites.push(userdata)
          // console.log (userdata)


        

        }
      },
      error => console.log(error)
    )
  }


  unfavorite(searchStringID: any) {
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].id === searchStringID) {
        this.favorites.splice(i, 1); // Remove one item at index i
        break; // Exit the loop since the item has been removed
      }
    }
  }
  
  // like(favorite: any) {
  //   favorite.likes++;
  // }

  // dislike(favorite: any) {
  //   favorite.dislikes++;
  // }

}
