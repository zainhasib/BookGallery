import { GlobalsService } from 'src/app/services/globals.service';
import { Router } from '@angular/router';
import { Book } from './../../models/book';
import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-recommendedlist',
  templateUrl: './recommendedlist.component.html',
  styleUrls: ['./recommendedlist.component.css']
})

export class RecommendedlistComponent implements OnInit {

  books: Book[];
  isLoading = true;
  page = 1;
  totalPages: number;
  pageBefore: number[] = [];
  pageAfter: number[] = [];
  pageMiddle: number[] = [];
  @Input('q') q: string;

  constructor(private fetchData: FetchDataService, private router: Router, private globals: GlobalsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.fetchData.getLongRecommendationFromGenre(this.globals.getLikedGenre()).subscribe(data => {
      this.isLoading = false;
      this.books = data;
      this.totalPages = 30;
      this.showPages(1);
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
