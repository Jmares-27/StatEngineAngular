import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string
  userName: string;
  lm_result: string;
  lm_kd: number;
  lm_adr: number;

  oa_kd: number;
  oa_adr: number;
  oa_hsp: number;
  displayedColumns: string[] = ['map','kills','deaths','KD'];
  dataSource = playerStats;
  steamIDForm: FormGroup;
  constructor() {}
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

