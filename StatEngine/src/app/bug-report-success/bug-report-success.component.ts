import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-bug-report-success',
  templateUrl: './bug-report-success.component.html',
  styleUrls: ['./bug-report-success.component.css']
})
export class BugReportSuccessComponent {
  constructor(private appComponent: AppComponent){}
  onClickReturnToHomepage () {
    this.appComponent.homeRedirect();
  }
}
