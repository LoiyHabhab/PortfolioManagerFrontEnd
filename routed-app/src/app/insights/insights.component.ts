import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { TypicodeService } from 'src/services/typicode.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  reportData = {} // this is where our returned data from the API will go
  // we need access to the service
  constructor(private typicodeService:TypicodeService) { }

  ngOnInit(): void {
  }
  makeServiceCall(){
    // we call the service method by subscribing to it
    // remember the api call will be async so subscribing responds when it returns
    this.typicodeService.getApiData()
      .subscribe( (data)=>{
        this.reportData = data
      } )
  }

}
