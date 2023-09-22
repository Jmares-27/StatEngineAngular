import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-friendlist',
  templateUrl: './view-friendlist.component.html',
  styleUrls: ['./view-friendlist.component.css']
})
export class ViewFriendlistComponent {
  friends = [
    { id: 1, name: 'Hippo', kills: 10, deaths: 5, likes: 0, dislikes: 0 , img_url: 'assets/images/Hippo.png' },
    { id: 2, name: 'Hippo the Smurf', kills: 8, deaths: 3, likes: 0, dislikes: 0, img_url: 'assets/images/Hippo_the_smurf.png' },
    // Add more friends here
  ];


  constructor (private formBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {}


  like(friend: any) {
    friend.likes++;
  }

  dislike(friend: any) {
    friend.dislikes++;
  }

}
