import { Component, OnInit } from '@angular/core';
import { MarketmoversService } from 'src/services/marketmovers.service';

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
  losersList: string[] =[]
  paramObj = {stock:'BLFS'}
  stockData: any =[]
  ngOnInit(): void {
    this.marketmoversService.getMovers().subscribe((data:any)=>{
      this.moversData = data;
      console.log(this.moversData)
      this.gainersData = data.finance.result[0].quotes;
      this.losersData = data.finance.result[1].quotes;
      for (var i = 0; i < this.gainersData.length;i++){
      
        this.gainersList[i] = this.gainersData[i].symbol;
        this.losersList[i] = this.losersData[i].symbol;
      } 
    })

    this.marketmoversService.getStockSummary(this.paramObj).subscribe((data:any)=>{
      this.stockData = data;
      console.log(this.stockData.price.regularMarketChangePercent)
    })
  }

}
