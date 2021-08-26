import { Component, OnInit } from '@angular/core';
import { MarketmoversService } from 'src/services/marketmovers.service';
import { CurrentstocksService} from 'src/services/currentstocks.service';
import {map} from 'rxjs/operators'
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.css']
})
export class MarketMoversComponent implements OnInit {

  constructor(private marketmoversService:MarketmoversService, private currentstocksService: CurrentstocksService) { }
  // we can declare data models for use within this component
  moversData:any = []
  gainersData: any=[]
  losersData: any=[]
  gainersList: string[] =[]
  gainerPercents: any= []
  losersList: string[] =[]
  loserPercents: string[] = []
  paramObj = {stock:'BLFS'}
  paramObj2 = {id:1}
  accountid :any
  accountStockData: any=[]
  accountList: string[] = []
  accountPercents: string[] = []
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
  

  makeServiceCall(){
    console.log(this.paramObj2.id)
    this.currentstocksService.getCurrentStocks(this.paramObj2.id).subscribe((data:any)=>{
      this.accountStockData = data;
      console.log(this.paramObj2.id)
      this.accountList = []
      this.accountPercents = []
      for (var i = 0; i < this.accountStockData.length;i++){
        
        this.accountList[i] = this.accountStockData[i].stock_name;
        console.log(this.accountList[i])
      } 
      const httpCalls = [];

      for (var i = 0; i < this.accountList.length;i++){
      //sleep(200).then(()=>{
        console.log(this.accountList[i])
        let paramObjAccount = {stock:this.accountList[i]}
        // this.marketmoversService.getStockSummary(paramObjAccount).subscribe((data:any)=>{
        //   this.stockData = data;
          
        //   //console.log(this.stockData.price.regularMarketChangePercent.fmt)
        //   this.accountPercents.push(this.stockData.price.regularMarketChangePercent.fmt)
        //   console.log(this.accountPercents[i])
        // })
      //});
      httpCalls.push(this.marketmoversService.getStockSummary(paramObjAccount).pipe(map((response:any)=>response)));
      }
      forkJoin(httpCalls).subscribe(res=>{
        console.log(res)
        res.forEach(stock =>this.accountPercents.push(stock.price.regularMarketChangePercent.fmt) )
        // this.stockData = res;
          
        // console.log(this.stockData.price.regularMarketChangePercent.fmt)
        // this.accountPercents.push(this.stockData.price.regularMarketChangePercent.fmt)
        //console.log(this.accountPercents[i])
      })
      console.log(this.accountPercents)
      
    })
   
  }

  getColor(percent:string) : string{
    if (percent.charAt(0)=='-'){
      return 'red'
    }
    else{
      return 'green'
    }
  }


}
