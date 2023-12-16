import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

export interface GameStats {
  date: string
  map: string;
  kills: number;
  deaths: number;
}

const EXAMPLE_DATA: GameStats[] = [
  {date: '05/07/2023', map: 'Anubis', kills: 32, deaths: 9},
  {date: '05/06/2023', map: 'Dust 2', kills: 21, deaths: 12},
  {date: '05/06/2023', map: 'Cobblestone', kills: 25, deaths: 23},
  {date: '05/03/2023', map: 'Nuke', kills: 8, deaths: 11},
  {date: '04/30/2023', map: 'Vertigo', kills: 12, deaths: 23},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
displayedColumns: string[] = ['date', 'map', 'kills', 'deaths'];
  dataSource = EXAMPLE_DATA;

  constructor(private router: Router, private appComponent: AppComponent){}

  onClickToSignUp(){
    this.router.navigate(['register']);
  }

  ngOnInit(){
    if(this.appComponent.viewportState == 'laptopOrDesktop')
    document.getElementById("searchbar1").style.display="none";
  }
}
