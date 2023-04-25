import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendTest {
  private API_URL = 'http://localhost:3000/api-test';

  constructor(private http: HttpClient) {}

  // Example of a GET request to fetch data from the backend
  getData(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // Example of a POST request to send data to the backend
  addData(data: any): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  // Add other methods for PUT and DELETE requests
}
