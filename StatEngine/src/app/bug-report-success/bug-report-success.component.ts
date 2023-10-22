import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bug-report-success',
  templateUrl: './bug-report-success.component.html',
  styleUrls: ['./bug-report-success.component.css']
})
export class BugReportSuccessComponent {
  constructor( private router:Router){}
  onClickReturnToMyAccount () {
    this.router.navigate(['myaccount']);
  }
}
