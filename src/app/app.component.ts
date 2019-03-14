import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loggedIn:boolean = false;
  isMobile:boolean = false;

  constructor() { }

  OnInit() {
    if(window.matchMedia('(max-width: 767px)').matches) {
      this.isMobile = true;
    }
 }
}
