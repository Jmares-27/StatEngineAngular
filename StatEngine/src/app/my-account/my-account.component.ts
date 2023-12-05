import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  userId: string
  userName: string = JSON.parse(localStorage.getItem("userData"))["username"];
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;
  displayedColumns: string[] = ['map','kills','deaths','KD'];

  // steamIDForm: FormGroup;
  currentSteamID: string = JSON.parse(localStorage.getItem("userData"))["steamID"];
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){
    this.userName = JSON.parse(localStorage.getItem("userData"))["username"];

    this.currentSteamID = JSON.parse(localStorage.getItem("userData"))["steamID"];
    //this.steamIDForm = this.fb.group({
    //  steamID: ["", Validators.required]
    
    // console.log(JSON.parse(localStorage.getItem("userData"))["steamID"])
    // console.log("current steam id for:" + this.userName + " "+this.currentSteamID)
    // console.log(this.currentSteamID.length)

    this.getStatfunction()
    
  }

  

  getStatfunction (){
    this.userId = JSON.parse(localStorage.getItem("userData"))["userid"];
    this.http.getStats(this.userId).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      // console.log(body)
      var last_match = body["last_match"]
      var overall = body["overall"]
      this.lm_result = last_match["last_match_result"]
      this.lm_kd = Math.round(parseFloat(last_match["last_match_kd"])*100)/100
      this.lm_adr = Math.round(parseFloat(last_match["last_match_adr"])*100)/100
      this.oa_kd = Math.round(parseFloat(overall["overall_kd"])*100)/100
      this.oa_adr = Math.round(parseFloat(overall["overall_adr"])*100)/100
      this.oa_hsp = Math.round(parseFloat(overall["overall_hsp"])*10000)/100

    },
    (error) => {
      if (error.status === 500) {
        // Handle the 500 error
        console.error('Server error (500):', error.error);
        // You can also display an error message to the user
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    })
  
  }
  Steamlogin() {
    window.location.href = "http://localhost:4200/auth/steam";
  }
  
  ngOnInit(){
    document.getElementById("searchbar1").style.display="block";

  }

}
