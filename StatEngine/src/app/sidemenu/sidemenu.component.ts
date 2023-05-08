import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})



export class SidemenuComponent {

  public pages: Page[] = [
    {name: 'Home', link:'/', icon: 'home'},
    {name: 'Sign Up', link:'/register', icon: 'info'},
    {name: 'Login', link:'/login', icon: 'person'},
    {name: 'Search', link:'/search', icon: 'search'},
    {name: 'Delete Account', link:'/deleteAccount', icon: 'help'},
  ]

  constructor(private router: Router) {

  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
  

}
