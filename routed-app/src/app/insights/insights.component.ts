import { Component, OnInit } from '@angular/core';
import { TypicodeService } from 'src/services/typicode.service';
import {HistoricalDataService} from 'src/services/historical-data.service';
import {Chart, registerables} from 'chart.js';
import * as moment from 'moment';



@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})

//declare var myconfig:any;
export class InsightsComponent implements OnInit {
  // wee need data models for this component
   reportData:any = {} // this is where our returned data from the API will go
   myChart:Chart = new Chart('line',this.reportData);
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
      if (this.myChart){this.myChart.destroy();}
      var labeldata = [];

      var chrtdata = [];
      
      for(var i =0; i < this.reportData.length; i++)
      {
        labeldata.push(moment(this.reportData[i].date).format('MM/DD/YYYY'));
        chrtdata.push(this.reportData[i].networth);
      }
      // config
      var chartdata = {
        labels: labeldata,
        datasets: [{
            label: 'NetWorth',
            backgroundColor: '#b30000',
            borderColor: '#0082cd',
            data: chrtdata,
        }]
    };
    
      this.myChart = new Chart('canvas',{
        type:'line',
        data: chartdata,
        options:{
         scales:{
          //  y:{
          //    beginAtZero:true,
          //    ticks:{
          //      stepSize:5
          //    }
          //  }
         }
        }
      })
      console.log(chartdata)
     })
    
  }
}

