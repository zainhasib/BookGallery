import { Component, OnInit, DoCheck } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { FetchDataService } from '../../services/fetch-data.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, DoCheck {

  recommended = 'Recommended Books';
  trending = 'Trending Books';
  loggedIn: boolean;
  tasteCalculated: boolean;
  trendingLoading = true;
  recommendLoading = true;
  trendingBooks: Book[];
  recommendBooks: Book[];

  constructor(private globals: GlobalsService, private fetchData: FetchDataService) { }

  ngOnInit() {
    this.loggedIn = this.globals.getLoggedIn();
    this.tasteCalculated = this.globals.getTasteCalc();
    this.recommendLoading = true;
    this.trendingLoading = true;
    this.fetchData.getBooks().subscribe(data => {
      setTimeout(() => {
        this.trendingLoading = false;
        this.trendingBooks = data;
      }, 0);
    });
    if (this.loggedIn && this.tasteCalculated) {
      this.tasteCalculated = true;
      const ans = {
        answers: this.globals.getLikedGenre()
      };
      this.fetchData.getRecommendationFromGenre(ans).subscribe(data => {
        setTimeout(() => {
          this.recommendLoading = false;
          this.recommendBooks = data;
        }, 0);
      });
    }
  }

  ngDoCheck() {
    this.loggedIn = this.globals.getLoggedIn();
    this.tasteCalculated = this.globals.getTasteCalc();
  }

  handleTaste() {
    const ans = {
      answers: this.globals.getLikedGenre()
    };
    if (this.loggedIn) {
      this.fetchData.getRecommendationFromGenre(ans).subscribe(data => {
        setTimeout(() => {
          console.log(data);
          this.recommendLoading = false;
          this.recommendBooks = data;
        }, 0);
      });
    }
  }

}
