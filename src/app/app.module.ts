import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { HorizontalscrollerComponent } from './components/horizontalscroller/horizontalscroller.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';

import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookslistComponent } from './components/bookslist/bookslist.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BookComponent } from './components/book/book.component';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { TastepopupComponent } from './components/tastepopup/tastepopup.component';
import { GlobalsService } from './services/globals.service';
import { RecommendedlistComponent } from './components/recommendedlist/recommendedlist.component';
import { ToastmessageComponent } from './components/toastmessage/toastmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalculateComponent,
    HorizontalscrollerComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    BookslistComponent,
    RecommendationComponent,
    ExploreComponent,
    SearchComponent,
    LoadingComponent,
    BookComponent,
    SearchlistComponent,
    TastepopupComponent,
    RecommendedlistComponent,
    ToastmessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    GlobalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) { }
}
