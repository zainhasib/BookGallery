import { Router } from '@angular/router';
import { GlobalsService } from './../../services/globals.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastmessageComponent } from '../toastmessage/toastmessage.component';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {

  showPopup = false;
  @Output() tasteCalculated = new EventEmitter<string[]>();
  isLoggedIn = false;
  showToast = false;
  toast: Toast;

  constructor(private globals: GlobalsService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.globals.getLoggedIn();
  }

  calcTaste(e: Event) {
    if(this.isLoggedIn) {
      this.showPopup = true;
    } else {
      this.showToast = true;
      const time = 1000;
      this.toast = new Toast('Login First!', time, 'danger');
      setTimeout(() => {
        this.showToast = false;
        this.router.navigate(['/login']);
      }, time);
    }
  }

  handleHidePopup(hidePopup) {
    this.showPopup = false;
  }

  handleTaste() {
    this.tasteCalculated.emit();
  }

}
