import { Component } from '@angular/core';
import { HttpClient , HttpEvent, HttpRequest} from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent {
  username = new FormControl ('', Validators.required);
  status_checker = false
  message = ""
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

      
  onSubmit() {

    console.log(this.username);


    this.http.post('http://localhost:3005/search', this.username)
    .subscribe(
      data => {
        console.log(data);
        // this.router.navigate(['/homepage']);
      },
      error => {
        console.log(error);
      }
    );

  }



}

