import { Component, OnInit } from '@angular/core';
import { TypicodeService } from 'src/services/typicode.service';
import {HistoricalDataService} from 'src/services/historical-data.service';
import {Chart, registerables} from 'chart.js';



@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})

//declare var myconfig:any;
export class InsightsComponent implements OnInit {
  // wee need data models for this component
   reportData:any = {} // this is where our returned data from the API will go
  
  //reportData = {name:'', id:1}
  // category:string = 'user'
  // id:number = 1
  //paramObj = {category:'user', id:1}
  paramObj = {timePeriod:'date', id:2, currentDate:'2021-08-16'}
  // we need access to the service
  constructor(private typicodeService:TypicodeService, private historicalDataService:HistoricalDataService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    const labels = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
          ];
          const data = {
              labels: labels,
              datasets: [{
                  label: 'My Data A',
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(99, 132, 255)',
                  // data: results['dataA'] //[0, 10, 5, 2, 20, 30, 45],
                  data: [0, 10, 5, 2, 20, 30, 45],
              }, {
                  label: 'My Data B',
                  backgroundColor: 'rgb(99, 132, 255)',
                  borderColor: 'rgb(255, 99, 132)',
                  // data: results['dataB'] // [10, 5, 2, 20, 30, 45, 0],
                  data: [10, 5, 2, 20, 30, 45, 0],
              }]
          };
          // config
          let config = {
              type: 'line',
              data,
              options: {}
          };
          let myChart = new Chart('canvas',{
            type:'line',
            data: data
          })
  }
  makeServiceCall(){
    // we call the service method by subscribing to it
    // remember the api call will be async so subscribing responds when it returns
    // this.typicodeService.getApiData({category:this.category, id:this.id})
    // this.typicodeService.getApiData(this.paramObj)
    //   .subscribe( (data:any)=>{
    //     this.reportData = data
    //   } )
    
    // this.historicalDataService.getAllHistoricalData().subscribe((data:any)=>{
    //  this.reportData = data;
    // })
    this.historicalDataService.getDatabyDate(this.paramObj).subscribe((data:any)=>{
      this.reportData = data;
     })

  }
}

