import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { SearchService } from '../_services/search.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userId: string
  userName: string;
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;

  // displayedColumns: string[] = ['map','kills','deaths','KD'];
  // dataSource = playerStats;
  steamIDForm: FormGroup;
  constructor(private UserService:UserService, private route:ActivatedRoute, private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){
    // this.userName = JSON.parse(localStorage.getItem("userData"))["username"];
    // this.userId = JSON.parse(localStorage.getItem("userData"))["_id"];

    this.userId = this.UserService.userId
    this.userName = this.UserService.userName;
    this.lm_result= this.UserService.lm_result;
    this.lm_kd = this.UserService.lm_kd;
    this.lm_adr=this.UserService.lm_adr
  
    this.oa_kd = this.UserService.oa_kd;
    this.oa_adr = this.UserService.oa_adr;
    this.oa_hsp = this.UserService.oa_hsp;

    this.route.params.subscribe((params) => {
      this.userId = params['userid'];
    });

    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });

    this.http.getStats(this.userId).subscribe((data)=>{

      
      var body = JSON.parse(JSON.stringify(data))
      console.log(body)
      this.userName = body["username"]
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
    // console.log(JSON.parse(localStorage.getItem("userData"))["username"])
    this.http.updateSteamID(this.steamIDForm.value.steamID, this.userName).subscribe((data)=>{
      this.snackBar.open("Steam ID Updated!","",{duration:2000});
    })
  }
  


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userid'];
    });
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
