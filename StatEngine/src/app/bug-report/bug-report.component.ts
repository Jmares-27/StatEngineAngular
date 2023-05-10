import { Component } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.css']
})
export class BugReportComponent {
  bugReportForm: FormGroup;
  message = ""
  status_checker = false
  constructor(private formBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar){
    this.bugReportForm = this.formBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      reportedBy:['',[Validators.required]]
    })
  }


  onSubmit() {
    var newBugReport = {
      title: this.bugReportForm.value.title,
      description: this.bugReportForm.value.description,
      reportedBy:this.bugReportForm.value.reportedBy,
    }
    this.http.bugReport(newBugReport).subscribe(
      data=>{
        // console.log("HERE -->", data);
        if ( data == "Submitted" ) {
          // console.log("inside no data") //used for testing
          this.snackBar.open("Submitted!","",{duration:2000});
          console.log("Submitted to the backend")
        }
        else if  ( data == "Sign Up Success!" ) {

          console.log("Failed to submit bug report form")
          this.snackBar.open("Failed to submit, Try again","",{duration:2000});
        }
      },
    
    )
  }
}
