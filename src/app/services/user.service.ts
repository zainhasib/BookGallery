import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private registerLink = 'http://localhost:5002/user/register';
  private authLink = 'http://localhost:5002/user/authenticate';
  private updateTasteLink = 'http://localhost:5002/user/update/taste';

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<UserResponse>(this.registerLink, user, options);
  }

  authenticateUser(user: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<UserResponse>(this.authLink, user, options);
  }

  updateTaste(genre: string[], userId: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<string>(`${this.updateTasteLink}/${userId}`, {
      likedGenre: genre
    }, options);
  }

}
