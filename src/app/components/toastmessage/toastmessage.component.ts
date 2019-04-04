import { Toast } from './../../models/toast';
import { GlobalsService } from 'src/app/services/globals.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-toastmessage',
  templateUrl: './toastmessage.component.html',
  styleUrls: ['./toastmessage.component.css']
})
export class ToastmessageComponent implements OnInit, OnDestroy {

  danger = true;
  success = false;
  @Input() for = 3000;
  @Input() message: string;
  @Input() type: string;
  hide = true;
  toast: Toast;

  constructor() { }

  ngOnInit() {
    this.hide = true;
    this.hide = false;
    switch (this.type) {
      case 'danger':
        this.danger = true;
        this.success = false;
        break;
      case 'success':
        this.danger = false;
        this.success = true;
        break;
      default:
        this.danger = false;
        this.success = true;
    }
    setTimeout(() => {
      this.hide = true;
    }, this.for);
  }

  ngOnDestroy(): void {
    this.hide = true;
    console.log('Destroyed');
  }
}