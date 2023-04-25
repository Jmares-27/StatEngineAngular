import { Component } from '@angular/core';
import { BackendTest } from '../backend-services/backend-test';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

    constructor(private backendTest: BackendTest) {}

    ngOnInit(): void {
      this.backendTest.getData();
    }
}
