import { BookComponent } from './components/book/book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { SearchComponent } from './components/search/search.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recommendation',
    component: RecommendationComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'book/:id',
    component: BookComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
