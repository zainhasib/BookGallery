import { fadeAnimation } from './animation/route-animation';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fadeAnimation ]
})

export class AppComponent {
  loggedIn:boolean = false;
  isMobile:boolean = false;
  tasteCalculated:boolean = false;
  recommended:string = "Recommended Books";
  trending:string = "Trending Books";

  constructor() { }

  OnInit() {
  }

  signInBox(e: Event) {
    console.log("Clicked Sign In");
  }

  signUpBox(e: Event) {
    console.log("Clicked Sign Up");
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
