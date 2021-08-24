import { Component, OnInit } from '@angular/core';
import { TypicodeService } from 'src/services/typicode.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  // we need access to the service
  constructor(private typicodeService:TypicodeService) { }

  ngOnInit(): void {
  }
  makeServiceCall(){
    // we call the service method by subscribing to it
    s

  }

}
