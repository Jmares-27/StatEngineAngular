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
  userId: number
  userName: string = JSON.parse(localStorage.getItem("userData"))["username"];
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;
  displayedColumns: string[] = ['map','kills','deaths','KD'];
  dataSource = playerStats;
  steamIDForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){
    this.userName = JSON.parse(localStorage.getItem("userData"))["username"];
    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });

    this.http.getStats(this.userName).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      console.log(body)
      var last_match = body["last_match"]
      var overall = body["overall"]
      this.lm_result = last_match["last_match_result"]
      this.lm_kd = Math.round(parseFloat(last_match["last_match_kd"])*100)/100
      this.lm_adr = Math.round(parseFloat(last_match["last_match_adr"])*100)/100
      this.oa_kd = Math.round(parseFloat(overall["overall_kd"])*100)/100
      this.oa_adr = Math.round(parseFloat(overall["overall_adr"])*100)/100
      this.oa_hsp = Math.round(parseFloat(overall["overall_hsp"])*10000)/100

      let results = document.getElementById("winloss")
      if (this.lm_result == "Win"){
        results.style.color = "green"
      }
      else{
        results.style.color = "red"
      }

      let lm_kd = document.getElementById("lm_kd")
      if (this.lm_kd > 1){
        lm_kd.style.color = "green"
      }
      else{
        lm_kd.style.color = "red"
      }

      let oa_kd = document.getElementById("oa_kd")
      if (this.oa_kd > 1){
        oa_kd.style.color = "green"
      }
      else{
        oa_kd.style.color = "red"
      }

      let oa_adr = document.getElementById("oa_adr")
      if (this.oa_adr > 80){
        oa_adr.style.color = "green"
      }
      else{
        oa_adr.style.color = "red"
      }

      let oa_hsp = document.getElementById("oa_hsp")
      if (this.oa_hsp > 30){
        oa_hsp.style.color = "green"
      }
      else{
        oa_hsp.style.color = "red"
      }

      let lm_adr = document.getElementById("lm_adr")
      if (this.lm_adr > 80){
        lm_adr.style.color = "green"
      }
      else{
        lm_adr.style.color = "red"
      }
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
  onIDSubmit(){
    console.log(this.steamIDForm.value.steamID)
    console.log(JSON.parse(localStorage.getItem("userData"))["username"])
    this.http.updateSteamID(this.steamIDForm.value.steamID, this.userName).subscribe((data)=>{
      this.snackBar.open("Steam ID Updated!","",{duration:2000});
    })
  }
  


}
export interface statData {
  kills: number;
  deaths: number;
  KD: number;
  map: string;

}

const playerStats: statData[] = [
  {map: "Anubis",kills: 23, deaths: 20, KD: 23/20},
  {map: "Anubis",kills: 2, deaths: 80, KD: 23/20},
  {map: "Anubis",kills: 12, deaths: 23, KD: 23/20},
  {map: "Anubis",kills: 54, deaths: 3, KD: 23/20}

]


