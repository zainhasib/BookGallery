import { UserService } from './../../services/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ToastmessageComponent } from '../toastmessage/toastmessage.component';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameClicked = false;
  passwordClicked = false;
  username: FormControl;
  password: FormControl;
  myForm: FormGroup;
  submitClicked = false;
  showToast = false;
  toast: Toast;

  inputClicked(e: Event) {
    console.log('Clicked');
    this.usernameClicked = true;
  }

  psdClicked(e: Event) {
    this.passwordClicked = true;
  }

  constructor(private router: Router, private globals: GlobalsService, private userService: UserService) { }

  ngOnInit() {
    if (this.globals.getLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.validateForm();
    this.myForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.submitClicked = true;
      this.userService.authenticateUser(this.myForm.value).subscribe(res => {
        if (res.success) {
          this.submitClicked = false;
          this.globals.setLoggedIn(true);
          this.globals.setUser(res.data);
          this.globals.setTasteCalc(res.data.tasteCalculated);
          this.globals.setLikedGenre(res.data.likedGenre);
          this.showToast = true;
          const time = 1000;
          this.toast = new Toast(res.message, time, 'success');
          setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['/home']);
            this.myForm.reset();
          }, time);
        } else {
          this.submitClicked = false;
          this.showToast = true;
          const time = 3000;
          this.toast = new Toast(res.message, time, 'danger');
          setTimeout(() => {
            this.showToast = false;
          }, time);
        }
      });
    } else {
      this.showToast = true;
      const time = 3000;
      this.toast = new Toast('Form Invalid', time, 'danger');
      setTimeout(() => {
        this.showToast = false;
      }, time);
    }
  }

  validateForm() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

}
