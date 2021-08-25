import { Component, Input, OnInit } from '@angular/core';
import { YFinanceService } from 'src/services/yfinance.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  now = new Date()
  reportData = {}
  constructor(private yFinanceService:YFinanceService) { }

  @Input() AccountBalance:number = 0

  ngOnInit(): void {
    console.log('here I am!')

  }
  makeServiceCall() {
    this.yFinanceService.getStockInfo()
      .subscribe( (data:any) => {
        this.reportData = data
      })
  }

}
