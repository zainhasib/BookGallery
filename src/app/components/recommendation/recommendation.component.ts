import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  tasteCalc: boolean;

  constructor(private globals:GlobalsService) { }

  ngOnInit() {
    this.tasteCalc = this.globals.getTasteCalc();
  }

  ngDoCheck() {
    this.tasteCalc = this.globals.getTasteCalc();
  }

}
