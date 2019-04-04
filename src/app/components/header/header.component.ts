import { GlobalsService } from './../../services/globals.service';
import { Component, OnInit, Input, EventEmitter, Output, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  @Input() loggedIn: boolean;
  @Input() isMobile: boolean;
  @Output() signInClicked  = new EventEmitter<boolean>();
  @Output() signUpClicked  = new EventEmitter<boolean>();
  user: User;
  hideMenu = true;
  showDropdown = false;
  @ViewChild('dropdown') dropdown: ElementRef;

  logOut() {
    this.globals.setLoggedIn(false);
    this.globals.setTasteCalc(false);
    this.globals.setUser(null);
    this.showDropdown = false;
  }

  handleDropdown(e: Event) {
    this.showDropdown = !this.showDropdown;
  }

  public clickedOutsideDropdown(e: Event) {
    if (!this.dropdown.nativeElement.contains(e.target)) {
      this.showDropdown = false;
    }
  }

  signInClick() {
    this.signInClicked.emit(true);
  }

  signUpClick() {
    this.signUpClicked.emit(true);
  }

  constructor(private globals: GlobalsService) { }

  ngOnInit() {
    this.loggedIn = this.globals.getLoggedIn();
    this.user = this.globals.getUser();
  }

  ngDoCheck() {
    this.loggedIn = this.globals.getLoggedIn();
    this.user = this.globals.getUser();
  }

  toggleMenu(e: Event) {
    this.hideMenu = !this.hideMenu;
  }

}
