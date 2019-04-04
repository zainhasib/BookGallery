import { Toast } from './../models/toast';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable()
export class GlobalsService {

  likedGenres: string[];
  LOGGED = 'LOGGED';
  TASTE = 'TASTE';
  GENRE = 'GENRE';
  USER = 'USER';

  constructor() {
  }

  setUser(user: User) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUser(): User {
    const value = localStorage.getItem(this.USER);
    return JSON.parse(value);
  }

  setLikedGenre(genre: string[]) {
    localStorage.setItem(this.GENRE, JSON.stringify(genre));
  }

  getLikedGenre(): string[] {
    const value = localStorage.getItem(this.GENRE);
    return JSON.parse(value);
  }

  setLoggedIn(value: boolean) {
    localStorage.setItem(this.LOGGED, '' + value);
  }

  getLoggedIn(): boolean {
    const value =  localStorage.getItem(this.LOGGED);
    return JSON.parse(value)
  }


  setTasteCalc(value: boolean) {
    localStorage.setItem(this.TASTE, '' + value);
  }

  getTasteCalc(): boolean {
    const value = localStorage.getItem(this.TASTE);
    return JSON.parse(value);
  }

}
