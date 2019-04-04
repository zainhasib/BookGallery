import { Book } from './../../models/book';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FetchDataService } from './../../services/fetch-data.service';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})

export class BookslistComponent implements OnInit {

  books: Book[];
  isLoading = true;
  page = 1;
  totalPages: number;
  pageBefore: number[] = [];
  pageAfter: number[] = [];
  pageMiddle: number[] = [];
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(private fetchData: FetchDataService) { }

  ngOnInit() {
    this.pageBefore.push(1);
    this.pageMiddle = [];
    this.isLoading = true;
    this.fetchData.getBooksList(1).subscribe(res => {
      setTimeout(() => {
        this.books = res.data;
        this.isLoading = false;
        this.totalPages = res.pages;
        this.showPages(this.page);
        window.scroll(0, 0);
      }, 0);
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }

  showPages(page: number) {
    this.pageAfter = [];
    this.pageBefore = [];
    this.pageMiddle = [];
    if(page < 3) {
      this.pageBefore.push(1);
      this.pageBefore.push(2);
      this.pageBefore.push(3);
      this.pageMiddle.push(Math.floor(this.totalPages/2));
      this.pageAfter.push(this.totalPages);
    }else if(page > this.totalPages - 2) {
      this.pageBefore.push(1);
      this.pageMiddle.push(Math.floor(this.totalPages/2));
      this.pageAfter.push(this.totalPages-2);
      this.pageAfter.push(this.totalPages-1);
      this.pageAfter.push(this.totalPages);
    }else {
      this.pageBefore.push(1);
      this.pageMiddle.push(page - 1);
      this.pageMiddle.push(page);
      this.pageMiddle.push(page + 1);
      this.pageAfter.push(this.totalPages - 1);
      this.pageAfter.push(this.totalPages);
    }
  }

  handlePageChange(e: Event) {
    this.page = parseInt((e.target as HTMLScriptElement).innerText);
    this.isLoading = true;
    this.fetchData.getBooksList(this.page).subscribe(res => {
      setTimeout(() => {
        this.books = res.data;
        this.isLoading = false;
        this.totalPages = res.pages;
        this.showPages(this.page);
        window.scroll(0,0);
      }, 0);
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }

  handlePrev(e: Event) {
    this.page = this.page - 1;
    if(this.page > 0) {
      this.pageAfter = [];
      this.pageBefore = [];
      this.pageMiddle = [];
      this.isLoading = true;
      this.fetchData.getBooksList(this.page).subscribe(res => {
        setTimeout(() => {
          this.books = res.data;
          this.isLoading = false;
          this.totalPages = res.pages;
          this.showPages(this.page);
          window.scroll(0, 0);
        }, 0);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

  handleNext(e: Event) {
    this.page = this.page + 1;
    if(this.page <= this.totalPages) {
      this.pageAfter = [];
      this.pageBefore = [];
      this.pageMiddle = [];
      this.isLoading = true;
      this.fetchData.getBooksList(this.page).subscribe(res => {
        setTimeout(() => {
          this.books = res.data;
          this.isLoading = false;
          this.totalPages = res.pages;
          this.showPages(this.page);
          window.scroll(0, 0);
        }, 0);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

}
