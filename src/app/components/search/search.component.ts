import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Book } from './../../models/Book';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query = '';
  searchTitle = "Search Result";
  searchBooks: Book[];
  searchClicked = false;
  inputWarning = false;
  searchSignal = false;
  @ViewChild('input') input: ElementRef;

  constructor(private fetchData: FetchDataService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.input.nativeElement.focus();
  }

  onKey(e: Event) {
    this.query = (e.target as HTMLInputElement).value;
  }

  search(e: Event = null) {
    this.searchSignal = false;
    setTimeout(() => {
      if(this.query === '') {
        this.inputWarning = true;
      }else {
        this.searchSignal = true;
        this.inputWarning = false;
        this.searchClicked = true;
      }
    }, 2);
  }

  onKeyDown(e: KeyboardEvent) {
    switch(e.keyCode) {
      case 13:
        this.search();
    }
  }

}
