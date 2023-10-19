import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { SearchService } from '../_services/search.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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




  steamIDForm: FormGroup;
  constructor( private route:ActivatedRoute, private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){



    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });



 

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
  
    });


  }
}



