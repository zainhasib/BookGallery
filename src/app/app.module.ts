import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { HorizontalscrollerComponent } from './components/horizontalscroller/horizontalscroller.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TrendingComponent } from './components/trending/trending.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalculateComponent,
    HorizontalscrollerComponent,
    FooterComponent,
    SidebarComponent,
    TrendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
