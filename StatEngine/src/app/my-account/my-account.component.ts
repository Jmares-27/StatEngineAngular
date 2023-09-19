import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  userId: number
  userName: string = null;
  kills: number;
  deaths: number;
  kd: number;
  Map: string;
  displayedColumns: string[] = ['map','kills','deaths','KD'];
  dataSource = playerStats;
  steamIDForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService){
    this.steamIDForm = this.fb.group({
      steamID: ["", Validators.required]
    });
  }
  onIDSubmit(){
    console.log(this.steamIDForm.value.steamID)
    this.http.updateSteamID(this.steamIDForm.value.steamID).subscribe((data)=>{
      console.log(data)
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


