import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Backend service for testing purposes

@Injectable({
  providedIn: 'root',
})

export class BackendService {
  private API_URL = 'http://localhost:3000/backend-test';

  constructor(private http: HttpClient) {}

  // Example of a GET request to fetch data from the backend
  getData(): Observable<any> {
    return this.http.get<string>(this.API_URL);
  }

  // Add other methods for PUT and DELETE requests
}
