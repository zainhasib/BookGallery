import { GlobalsService } from './../../services/globals.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, DoCheck {

  isLoggedIn: boolean;

  constructor(private globals: GlobalsService) { 
  }

  ngOnInit() {
    this.isLoggedIn = this.globals.getLoggedIn();
  }

  ngDoCheck() {
    this.isLoggedIn = this.globals.getLoggedIn();
  }

}
