import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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
  displayedColumns: string[] = ['Map','Kills','Deaths','K/D'];
  dataSource = playerStats;
  
 
}
export interface statData {
  kills: number;
  deaths: number;
  KD: number;
  map: string;

}

const playerStats: statData[] = [
  {map: "boowo",kills: 23, deaths: 20, KD: Math.floor(23/40)}

]


