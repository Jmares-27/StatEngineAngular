import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Page {
  link: string;
  name: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})



export class SidemenuComponent implements OnInit {

  public pages: Page[] = [
    {name: 'Menu', link:'/'},
    {name: 'Home', link:'/'},
    {name: 'Sign Up', link:'/register'},
    {name: 'Login', link:'/login'},
    {name: 'Search', link:'/search'},
    {name: 'Delete Account', link:'/deleteAccount'},
  ]

  constructor(private router: Router) {

  }

  ngOnInit(){

  }

  redirect(){
    this.router.navigate(['/home']);
  }

}
