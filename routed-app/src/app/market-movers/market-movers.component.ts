import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {forkJoin} from 'rxjs';
import { MarketmoversService } from 'src/services/marketmovers.service';
import {of, concat} from 'rxjs';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.css']
})
export class MarketMoversComponent implements OnInit {

  constructor(private marketmoversService:MarketmoversService) { }
  // we can declare data models for use within this component
  moversData:any = []
  gainersData: any=[]
  losersData: any=[]
  gainersList: string[] =[]
  gainerPercents: any= []
  losersList: string[] =[]
  loserPercents: string[] = []
  paramObj = {stock:'BLFS'}
  stockData: any =[]
  ngOnInit(): void {
    
    this.marketmoversService.getMovers().subscribe((data:any)=>{
        this.moversData = data;
      
        this.gainersData = data.finance.result[0].quotes;
        this.losersData = data.finance.result[1].quotes;
        for (var i = 0; i < this.gainersData.length;i++){
        
          this.gainersList[i] = this.gainersData[i].symbol;
          this.losersList[i] = this.losersData[i].symbol;
        } 
        
        sleep(3000).then(()=>{
          for (let g of this.gainersList){
              this.paramObj={stock:g}
               this.marketmoversService.getStockSummary(this.paramObj).subscribe((data:any)=>{
                  this.stockData = data;
                  
                  //console.log(this.stockData.price.regularMarketChangePercent.fmt)
                  this.gainerPercents.push(this.stockData.price.regularMarketChangePercent.fmt)
                })
            }
        });
        sleep(5500).then(()=>{
        for (let l of this.losersList){
          this.paramObj={stock:l}
           this.marketmoversService.getStockSummary(this.paramObj).subscribe((data:any)=>{
              this.stockData = data;
              
              //console.log(this.stockData.price.regularMarketChangePercent.fmt)
              this.loserPercents.push(this.stockData.price.regularMarketChangePercent.fmt)
            })
        }
      }) });

      
    function sleep(ms: number){
      return new Promise(resolve=>setTimeout(resolve,ms));
    }
  }


}
