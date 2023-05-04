import { Component } from '@angular/core';
import { AuthenticationService } from '../backend-services/authentication.service';
import { HttpClient , HttpEvent, HttpRequest} from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public signInForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, /*Validators.minLength(8)*/]]
    });
   }
  

  onSubmit() {
    const data = { username: this.signInForm.value.username, password: this.signInForm.value.password };
    
    // this.http.post('http://localhost:3005/login', data).subscribe(
    //   (response: any) => {
    //     // Store the JWT in localStorage
    //     console.log (data)
    //     console.log ("Got the token")
    //     localStorage.setItem('token', response.token);
    //   },
    //   (error) => {

    //     console.log("Failed to get token")
    //     console.log(data)
    //     console.error(error);
    //   }
    // );

    this.http.post('http://localhost:3005/login', data).subscribe(
      (response: any) =>{

        console.log("success!")
        console.log(data);
        // this.router.navigate(['/homepage']);
      },
      error => {
        console.log(error);
      }
    );


  }
}
