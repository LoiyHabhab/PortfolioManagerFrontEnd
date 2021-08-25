import { Component, OnInit } from '@angular/core';
import { CurrentstocksService } from 'src/services/currentstocks.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})

export class TradeComponent implements OnInit {


  accountID = 1
  cashBalance = 0

  currentStocks: Array<{id:number,account_id:number,stock_name:string,shares:number}> = []
  currentData: {id:number,accountId:number,data:string,investment:number,cash:number,networth:number} =
      {id:0,accountId:0,data:'',investment:0,cash:0,networth:0}
  
  ownedCodes:Array<string> = []

  codes = [
    'AMZN',
    'NFLX', // member 1
    'GOOGL',
    'FB',
    'AAPL'
  ]
  constructor(private currentStockService:CurrentstocksService) { }

  ngOnInit(): void {
    this.populateCurrentStocks()
    this.updateCurrentData()
  }

  populateCurrentStocks(): void{
    this.currentStockService.getCurrentStocks(this.accountID)
      .subscribe( (data:any)=>{
        this.currentStocks = []
        for(const value in data){
          //console.log(value)
          this.currentStocks.push(data[value])
          //this.ownedCodes.push(data[])
        }
      })
      this.populateCodes()
     //console.log(this.currentStocks)
    
  }

  populateCodes():void{
    this.ownedCodes = []
    this.currentStocks.forEach(item=>this.ownedCodes.push(item.stock_name))
  }

  updateCurrentData(): void{
    this.currentStockService.getCashBalance(this.accountID)
      .subscribe((data:any)=>{
        //console.log(data.cash)
        //console.log(data)
        this.currentData = data
        //this.cashBalance = data.cash
        //console.log(this.cashBalance)
      })

  }

  checkIfStockOwned(code:string){

  }

  handleBuyEvent(values:any){
    console.log(values)
    this.currentData.cash-=values.price*values.shares

    this.currentStockService.addCurrentStock({account_id:this.accountID,stock_name:values.stock_name,shares:values.shares}).subscribe()
    console.log("added")
    // console.log(values.stock_name)
    // console.log(this.ownedCodes)
    // if(this.ownedCodes.includes(values.stock_name)){
    //   console.log("stock owned")
    // }else{
    //   console.log("not owned")
    // }

  }

  handleBalanceChange(value:number){
    this.cashBalance+=value
  }

  buyStock(){
    this.currentStocks[0].shares+=1
    this.cashBalance-=100
  }

}
