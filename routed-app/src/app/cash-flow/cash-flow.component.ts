import { SafeMethodCall } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { YFinanceService } from 'src/services/yfinance.service';
import { TypicodeService } from 'src/services/typicode.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CurrentstocksService } from 'src/services/currentstocks.service';

enum CheckBoxAction { withdrawalCash, depositCash, NONE };

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  reportData:any = {}
  checkBoxAction = CheckBoxAction
  currentlyChecked?:CheckBoxAction

  currentStocks: Array<{
    id:number,
    account_id:number,
    stock_name:string,
    shares:number
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
    ) { }

  @Input() AccountBalance:number = 0
  @Input() NetWorth:number = 0
  @Input() TotalInvestments:number = 0
  

  ngOnInit(): void {
    this.getAccountBalances()
    this.populateCurrentStocks()
    
  }

  getAccountBalances() {
    this.typicodeService.getLatestAccountDataById({id: this.updateCash.id})
      .subscribe( (data:any) => {
        this.AccountBalance = data["cash"]
        this.NetWorth = data["networth"]
      })
  }
  updateCashCall() {
    this.typicodeService.updateCash({
      action: this.updateCash.action, 
      accountInfo: {accountId: this.updateCash.id, cash: this.updateCash.amount} 
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
  handleStockPricesEvent(value:number) {
    this.TotalInvestments += value
   // console.log(this.TotalInvestments)
  }


}
