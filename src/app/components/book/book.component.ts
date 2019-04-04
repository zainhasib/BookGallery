import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: string;
  book: Book;
  bookName: string;
  isLoading = true;
  recommendLoading = true;
  recommendBooks: Book[];
  recommendTitle = 'Similar Books';
  liked: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fetchData: FetchDataService
  ) { }

  like() {
    this.liked = true;
  }

  dislike() {
    this.liked = false;
  }

  ngOnInit() {
    this.liked= null;
    window.scrollTo(0, 0);
    this.isLoading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchData.getBookById(this.id).subscribe(book => {
      this.isLoading = false;
      this.book = book[0];
      this.recommendLoading = true;
      this.fetchData.getBookRecommendation(this.id).subscribe(res => {
        this.recommendLoading = false;
        this.recommendBooks = res.splice(0, 6);
      });
    });
  }

}
