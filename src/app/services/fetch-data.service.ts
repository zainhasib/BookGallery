import { BookPageResponse } from './../models/book-page-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  page = 1;

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>('http://127.0.0.1:5000/');
  }

  getBooksList(page: number) {
    this.page = page;
    return this.http.get<BookPageResponse>('http://127.0.0.1:5000/books', {
      params: new HttpParams().set('page', this.page.toString())
    });
  }

  getBookById(id: string) {
    return this.http.get<Book[]>(`http://127.0.0.1:5000/book/${id}`);
  }

  getBookRecommendation(id: string) {
    return this.http.get<Book[]>(`http://127.0.0.1:5001/book/${id}`);
  }

  getBookBySearch(title: string) {
    return this.http.get<Book[]>(`http://127.0.0.1:5001/book/search`, {
      params: new HttpParams().set('q', title)
    });
  }

  getRecommendationFromGenre(answersObj: any) {
    return this.http.post<Book[]>(`http://localhost:5001/book/recommend`, answersObj);
  }

  getLongRecommendationFromGenre(answersObj: any) {
    return this.http.post<Book[]>(`http://localhost:5001/book/recommend/list`, answersObj);
  }

}
