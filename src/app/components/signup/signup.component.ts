import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { GlobalsService } from 'src/app/services/globals.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  usernameClicked = false;
  passClicked = false;
  nameClicked = false;
  emailClicked = false;
  username: FormControl;
  password: FormControl;
  email: FormControl;
  name: FormControl;
  myForm: FormGroup;
  submitClicked = false;
  showToast = false;
  toast: Toast;

  constructor(private globals: GlobalsService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.globals.getLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.validateForm();
    this.myForm = new FormGroup({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  usrClicked(e: Event) {
    this.usernameClicked = true;
  }

  passwClicked(e: Event) {
    this.passClicked = true;
  }

  nmClicked(e: Event) {
    this.nameClicked = true;
  }

  mailClicked(e: Event) {
    this.emailClicked = true;
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.submitClicked = true;
      this.userService.registerUser(this.myForm.value).subscribe(res => {
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
    this.name = new FormControl('', Validators.required);
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('' , [
      Validators.required,
      Validators.pattern('[^@]+@[^@]+[.]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

}
