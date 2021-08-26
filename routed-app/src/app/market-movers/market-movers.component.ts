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
        
        sleep(2000).then(()=>{
        const httpCalls = [];
        for (var i = 0; i < this.gainersList.length;i++){
         
          this.paramObj={stock:this.gainersList[i]}
         
          httpCalls.push(this.marketmoversService.getStockSummary(this.paramObj).pipe(map((response:any)=>response)));
          }
          forkJoin(httpCalls).subscribe(res=>{
            //console.log(res)
            res.forEach(stock =>this.gainerPercents.push(stock.price.regularMarketChangePercent.fmt) )
            
          })
        });
          sleep(6000).then(()=>{
            const httpCalls = [];
        
            for (var i = 0; i < this.losersList.length;i++){
             
              this.paramObj={stock:this.losersList[i]}
             
              httpCalls.push(this.marketmoversService.getStockSummary(this.paramObj).pipe(map((response:any)=>response)));
              }
              forkJoin(httpCalls).subscribe(res=>{
                //console.log(res)
                res.forEach(stock =>this.loserPercents.push(stock.price.regularMarketChangePercent.fmt) )
               
              })
          });

        });
      
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
        console.log(this.accountList[i])
        let paramObjAccount = {stock:this.accountList[i]}
    
        httpCalls.push(this.marketmoversService.getStockSummary(paramObjAccount).pipe(map((response:any)=>response)));
      }
      forkJoin(httpCalls).subscribe(res=>{
        console.log(res)
        res.forEach(stock =>this.accountPercents.push(stock.price.regularMarketChangePercent.fmt) )
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
