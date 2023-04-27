import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend-services/backend.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  title = "Home Page"
  data: any;

    constructor(private backendTest: BackendService) {}

    //Runs a basic loadData function when component is loaded
    ngOnInit(): void {
      this.getData();
    }

    //Loads data from the backend, test function for example
    getData() {
      console.log("Attempting to get data");
      this.data = this.backendTest.getData().subscribe(response => {
        this.data = response;
        console.log(this.data)
      }, error => {
        console.error('Error fetching data:', error);
      });
      console.log("Data retrieved: " + this.data);
    }
  } 
