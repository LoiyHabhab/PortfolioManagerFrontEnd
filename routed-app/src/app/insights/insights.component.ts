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
   reportData:any = [] // this is where our returned data from the API will go
   formatedData: any= [];
   myChart:Chart = new Chart('line',this.reportData);
   paramObj = {timePeriod:'lastweek', id:1, currentDate:'2021-08-27'}
   valType ='networth'
   
  // we need access to the service
  constructor(private typicodeService:TypicodeService, private historicalDataService:HistoricalDataService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
          this.makeServiceCall();
         
  }

  
  makeServiceCall(){
  
    if (this.myChart){this.myChart.destroy();}
    this.historicalDataService.getDatabyDate(this.paramObj).subscribe((data:any)=>{
      this.reportData = data;
     this.formatedData = this.reportData
      for (var key in data){
        this.formatedData[key] = data[key];
        this.formatedData[key].date = moment(data[key].date).format('MM/DD/YYYY');
      }
      console.log(this.formatedData);
      console.log(this.reportData);
      
      var labeldata = [];

      var chrtdata = [];
      
      for(var i =0; i < this.reportData.length; i++)
      {
        labeldata.push(moment(this.reportData[i].date).format('MM/DD/YYYY'));
        //chrtdata.push(this.reportData[i].networth);
        chrtdata.push(this.reportData[i][this.valType]);
      }
      // config
      var chartdata = {
        labels: labeldata,
        datasets: [{
            label: this.valType,
            backgroundColor: '#F5497C',
            borderColor: '#F5497C',
            data: chrtdata,
        }]
    };
    
      this.myChart = new Chart('canvas',{
        type:'line',
        data: chartdata,
        options:{
          plugins:{
            legend:{
              labels:{
                color:'rgb(219, 219, 219)'
              }
            }
          },
          scales:{
            y:{
              ticks:{
                color:'rgb(219, 219, 219)'
              },
              grid:{
                color:'rgb(219, 219, 219)'
              }
            },
            x:{
              ticks:{
                color:'rgb(219, 219, 219)'
              },
              grid:{
                color:'rgb(219, 219, 219)'
              }
            }
          }
        }
      })
     })
    
  }


}

