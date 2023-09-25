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
  friends = [
    { id: 1, name: 'Hippo', introduction:"Say something about yourself", kills: 10, deaths: 5, KD:0, karmaRatio:0, likes: 5, dislikes: 1 , img_url: 'assets/images/Hippo.png' },
    { id: 2, name: 'Hippo the Smurf', introduction:"Definitely not a smurf", kills: 8, deaths: 3, KD:0, karmaRatio:0, likes: 1,  dislikes: 20, img_url: 'assets/images/Hippo_the_smurf.png' },
    // Add more friends here
  ];



  constructor (private formBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    // Round the kills and deaths properties to 2 decimal places
    for (const friend of this.friends) {
      friend.KD = Math.round(friend.kills/friend.deaths * 10) / 10; // Rounds to 2 decimal places
      friend.karmaRatio = friend.likes/friend.dislikes;
    }

  }


  like(friend: any) {
    friend.likes++;
  }

  dislike(friend: any) {
    friend.dislikes++;
  }

}
