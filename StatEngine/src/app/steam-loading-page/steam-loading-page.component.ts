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

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar, private router: Router){
    this.userName = JSON.parse(localStorage.getItem("userData"))["username"];
    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });
  }

  onIDSubmit(){
    console.log(this.steamIDForm.value.steamID)
    console.log(JSON.parse(localStorage.getItem("userData"))["username"])
    this.http.updateSteamID(this.steamIDForm.value.steamID, this.userName).subscribe((data)=>{
      this.snackBar.open("Steam ID Updated!","",{duration:2000});
    })
    window.location.href="http://localhost:3026/api/auth/steam/return"
  }

}


