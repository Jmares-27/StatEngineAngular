import { Component } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  
  userId: number = null;
  userName: string = null;
  
  
 
}
