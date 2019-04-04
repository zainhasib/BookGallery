import { Book } from './../../models/book';
import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontalscroller',
  templateUrl: './horizontalscroller.component.html',
  styleUrls: ['./horizontalscroller.component.css']
})
export class HorizontalscrollerComponent implements OnInit {

  @Input('title') title: string;
  @Input('books') books: Book[];
  @ViewChild('content') content: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  leftPos = 0;

  handleLeft(event: Event) {
    this.content.nativeElement.style.transform = `translateX(0px)`;
    this.leftPos = 0;
  }

  handleRight(event: Event) {
    const move = this.content.nativeElement.scrollWidth - this.content.nativeElement.offsetWidth;
    this.content.nativeElement.style.transform = `translateX(-${move}px)`;
    this.leftPos = 1;
  }

  constructor(private rd: Renderer2, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  }

}
