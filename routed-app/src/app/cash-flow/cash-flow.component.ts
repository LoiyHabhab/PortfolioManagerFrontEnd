import { SafeMethodCall } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { YFinanceService } from 'src/services/yfinance.service';
import { TypicodeService } from 'src/services/typicode.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CurrentstocksService } from 'src/services/currentstocks.service';
import {Chart, ChartItem, registerables} from 'chart.js';

enum CheckBoxAction { withdrawalCash, depositCash, NONE };


@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  accountId:number = 1;
  reportData:any = []
  randoData:any = []
  checkBoxAction = CheckBoxAction
  currentlyChecked?:CheckBoxAction
  myChart:Chart = new Chart('doughnut',this.reportData);
  //stocksChart:Chart = new Chart('doughnut', this.randoData);
  
  

  currentStocks: Array<{
    id:number,
    account_id:number,
    stock_name:string,
    shares:number,
    price:number,
  }> = []

  updateCash = {
    id: 1, 
    action: "",
    amount: 0,
  }
  newAccountInfo:any = {}

  constructor(
    private yFinanceService:YFinanceService,
    private typicodeService:TypicodeService,
    private currentStockService:CurrentstocksService,
    ) { 
      Chart.register(...registerables);
    }

  @Input() AccountBalance:number = 0
  @Input() NetWorth:number = 0
  @Input() TotalInvestments:number = 1200
  


  ngOnInit(): void {
    this.getAccountBalances()
    this.populateCurrentStocks()
    console.log(this.accountId)
    setTimeout(() => this.createCashChart(), 500);
    //setTimeout(() => this.createStocksChart(), 500);
    //this.createChart()
    
  }
  createCashChart() {
    if (this.myChart){this.myChart.destroy();}

    let netWorthData = {
      labels: [
        'Cash',
        'Investments',
      ],
      datasets: [{
        label: 'NetWorthData',
        data: [this.AccountBalance, this.TotalInvestments],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
  
    }

    this.myChart = new Chart('myCanvasId',{
      type:'doughnut',
      data: netWorthData,
      options:{
        "responsive": true,
      "maintainAspectRatio": false
    }
    })
  }
  // createStocksChart() {
  //   if (this.stocksChart){this.stocksChart.destroy();}

  //   let labels:string[] = []
  //   let data:number[] = []

  //   this.currentStocks.forEach(stock => {
  //     labels.push(stock.stock_name)
  //     data.push(stock.shares * stock.price)

  //   });

  //   let StockData = {
  //     labels: labels,
  //     datasets: [{
  //       data: data,
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //       ],
  //       hoverOffset: 4
  //     }]
  
  //   }

  //   this.stocksChart = new Chart('StockChart',{
  //     type:'doughnut',
  //     data: StockData,
  //     options:{
  //       "responsive": true,
  //     "maintainAspectRatio": false
  //   }
  //   })
  // }

  getAccountBalances() {
    this.typicodeService.getLatestAccountDataById({id: this.accountId})
      .subscribe( (data:any) => {
        this.AccountBalance = data["cash"]
        this.NetWorth = data["networth"]
      })
  }
  updateCashCall() {
    this.typicodeService.updateCash({
      action: this.updateCash.action, 
      accountInfo: {accountId: this.accountId, cash: this.updateCash.amount} 
    }).subscribe( (data:any) => {
      this.ngOnInit();
    })
  }
  updateUserId() {
    this.ngOnInit();
  }

  selectCheckBox(targetType: CheckBoxAction) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxAction.NONE;
      return;
    }
    this.currentlyChecked = targetType;
    this.currentlyChecked == 0? this.updateCash.action = "withdrawalCash": this.updateCash.action = "depositCash"

  }

  populateCurrentStocks(): void{
    this.currentStockService.getCurrentStocks(this.updateCash.id)
      .subscribe( (data:any)=>{
        this.currentStocks = []
        for(const value in data){
          this.currentStocks.push(data[value])
        }
      })
    
  }
  handleStockPricesEvent(Object:any) {
    this.TotalInvestments += Object['totalValue']
    this.currentStocks[Object['index']].price = Object['price']

   console.log(this.currentStocks)
  }


}
