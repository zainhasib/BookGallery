import { UserService } from './../../services/user.service';
import { GlobalsService } from './../../services/globals.service';
import { Question } from './../../models/question';
import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { ToastmessageComponent } from '../toastmessage/toastmessage.component';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-tastepopup',
  templateUrl: './tastepopup.component.html',
  styleUrls: ['./tastepopup.component.css']
})
export class TastepopupComponent implements OnInit {

  @Output() hidePopup = new EventEmitter<boolean>();
  @Output() tasteCalculated = new EventEmitter();
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('content') content: ElementRef;
  selectedOption: number;
  isLoading = true;
  questions: Question[];
  i = 0;
  options: Element;
  answers: string[] = [];
  finish = false;
  showToast = false;
  toast: Toast;

  constructor(private globals: GlobalsService, private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.questions = [
        // tslint:disable-next-line:max-line-length
        new Question('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque sunt, provident repellendus soluta voluptatum saepe odio qui. Animi, deserunt illo?', 'Action', 'Comedy', 'Adventure', 'Horror'),
        // tslint:disable-next-line:max-line-length
        new Question('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque sunt, provident repellendus soluta voluptatum saepe odio qui. Animi, deserunt illo?', 'Horror', 'Fantasy', 'Adventure', 'Horror'),
        // tslint:disable-next-line:max-line-length
        new Question('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque sunt, provident repellendus soluta voluptatum saepe odio qui. Animi, deserunt illo?', 'Horror', 'Fantasy', 'Heroes', 'Horror'),
      ]
      setTimeout(() => {
        this.content.nativeElement.classList.toggle('fade');
      }, 10);
    }, 1000);
  }

  clickedOutside(e: Event) {
    if (!this.wrapper.nativeElement.contains(e.target)) {
      this.hidePopup.emit(true);
    }
  }

  selectOption(e: Event) {
    this.selectedOption = parseInt((e.target as HTMLDivElement ).id, 10);
  }

  getOptionFromSelection(): string {
    switch(this.selectedOption) {
      case 1:
        return this.questions[this.i].option1.toLowerCase();
      case 2:
        return this.questions[this.i].option2.toLowerCase();
      case 3:
        return this.questions[this.i].option3.toLowerCase();
      case 4:
        return this.questions[this.i].option4.toLowerCase();
      default:
        return null;
    }
  }

  clickedNext(e: Event) {
    const optionVal = this.getOptionFromSelection();
    if(this.finish) {
      if(optionVal !== null) {
        const opt = this.getOptionFromSelection();
        if (opt != null) {
          this.answers = [...this.answers, opt];
        }
      }
      this.selectedOption = null;
      console.log(this.answers);
      this.globals.setTasteCalc(true);
      this.userService.updateTaste(this.answers, this.globals.getUser().id).subscribe(res => {
        if (res) {
          this.globals.setLikedGenre(this.answers);
          this.tasteCalculated.emit();
        } else {
          console.log('Taste Failed');
        }
       })
      setTimeout(() => {
        this.hidePopup.emit(true);
      }, 400);
    }
    if(optionVal !== null) {
      const opt = this.getOptionFromSelection();
      if (opt != null) {
        this.answers = [...this.answers, opt];
      }
    }
    this.content.nativeElement.classList.remove('fade');
    this.selectedOption = null;
    setTimeout(() => {
      if(this.questions.length === this.i+2) {
        (e.target as HTMLDivElement).innerText = "Finish";
        this.finish = true;
      }
      this.content.nativeElement.classList.add('fade');
      this.i += 1;
    }, 500);
  }
}
