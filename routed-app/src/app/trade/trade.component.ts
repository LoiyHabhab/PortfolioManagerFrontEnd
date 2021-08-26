import { Component, OnInit } from '@angular/core';
import { CurrentstocksService } from 'src/services/currentstocks.service';
import { TypicodeService } from 'src/services/typicode.service';

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
    'NFLX', 
    'GOOGL',
    'FB',
    'AAPL',
    'TSLA',
    'MSFT'
  ]

  searchValue = ''
  readyToSearch = 0
  constructor(private currentStockService:CurrentstocksService, private typicodeService:TypicodeService) { }

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
    let x = -1
      this.currentStocks.forEach((element, index)=>{
        if(element.stock_name==code){
          console.log("owned")
          x = index
        }
      })
    return x
  }

  handleBuyEvent(values:any){
    console.log(values)
    this.currentData.cash-=values.price*values.shares
    console.log("bought")
    this.populateCurrentStocks()
    let x = this.checkIfStockOwned(values.stock_name)
    if(x==-1){
      this.currentStockService.addCurrentStock({account_id:this.accountID,stock_name:values.stock_name,shares:values.shares}).subscribe()
    }else{
      console.log(this.currentStocks)
      console.log(x)
      console.log(this.currentStocks[x].shares)
      this.currentStocks[x].shares += values.shares
      this.currentStockService.deleteCurrentStock(this.currentStocks[x].id).subscribe()
      this.currentStockService.addCurrentStock({account_id:this.accountID,stock_name:values.stock_name,shares:this.currentStocks[x].shares}).subscribe()
      
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayD = mm + '/' + dd + '/' + yyyy;
    //this.currentStockService.addTransaction({account_id:this.accountID,b_or_s:'b',date:todayD,price_per_share:values.price,shares:values.shares,stock_name:values.stock_name}).subscribe()
    //this.populateCurrentStocks()

    
    this.typicodeService.updateCash({
        action: "withdrawalCash", 
        accountInfo: {accountId: this.accountID, cash: values.price*values.shares} 
      }).subscribe( (data:any) => {
        this.ngOnInit();
      })
    


    // setTimeout(function() {
    //   //code to be executed after 0.5 second
    //   //location.reload()
    // }, 500);
    

  }

  handleSellEvent(values:any){
    this.currentData.cash+=values.price*values.shares
    let x = this.checkIfStockOwned(values.stock_name)
    if(x==-1){
      this.currentStockService.addCurrentStock({account_id:this.accountID,stock_name:values.stock_name,shares:values.shares}).subscribe()
    }else{
      console.log(this.currentStocks)
      console.log(x)
      console.log(this.currentStocks[x].shares)
      this.currentStocks[x].shares -= values.shares
      this.currentStockService.deleteCurrentStock(this.currentStocks[x].id).subscribe()
      if(this.currentStocks[x].shares>0){
        this.currentStockService.addCurrentStock({account_id:this.accountID,stock_name:values.stock_name,shares:this.currentStocks[x].shares}).subscribe()
      } 
    }
    //this.populateCurrentStocks()
    this.typicodeService.updateCash({
      action: "depositCash", 
      accountInfo: {accountId: this.accountID, cash: values.price*values.shares} 
    }).subscribe( (data:any) => {
      this.ngOnInit();
    })
    // setTimeout(function() {
    //   //code to be executed after 0.5 second
    //   //location.reload()
    // }, 500);
    
    //console.log("sold")
  }

  handleBalanceChange(value:number){
    this.cashBalance+=value
  }


  searchStock(){
    this.readyToSearch = 1
  }

  

}
