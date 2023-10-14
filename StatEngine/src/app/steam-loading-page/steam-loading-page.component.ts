import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-steam-loading-page',
  templateUrl: './steam-loading-page.component.html',
  styleUrls: ['./steam-loading-page.component.css']
})
export class SteamLoadingPageComponent {

  userName: string = JSON.parse(localStorage.getItem("userData"))["username"];
  steamIDForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){
    this.userName = JSON.parse(localStorage.getItem("userData"))["username"];
    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });
  }

}
