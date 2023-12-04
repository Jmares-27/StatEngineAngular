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
  
       
      },
      (error) => {
        if (error.status === 500) {
          // Handle the 500 error
          this.snackBar.open(`${error.error.message}`,"",{duration:5000});
          this.userName = error.error.username
          var last_match = null
          var overall = null
          this.lm_result = null
          this.lm_kd = null
          this.lm_adr = null
          this.oa_kd = null
          this.oa_adr = null
          this.oa_hsp = null

          // console.error('Server error (500):', error.error);
          // You can also display an error message to the user
        } else {
          // Handle other errors
          console.error('Error:', error);
        }
      })
  
    });


  }
}



