import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentstocksService } from 'src/services/currentstocks.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

@Input() id:number = 0
@Input() account_id?:number
@Input() shares:number = 0
@Input() stock_name:string = ''
@Input() index?:number // ? means it might not exist
@Input() cash:number = 0
@Input() price:number = 0

@Output() calculatePricesEvent:EventEmitter<number> = new EventEmitter()


constructor(private currentStockService:CurrentstocksService) {}

ngOnInit(): void {
  this.getStockPrice()
  setTimeout(() => this.calculatePricesHandler(), 2000);
  
}


getStockPrice(){
  this.currentStockService.getStockPrice(this.stock_name)
  .subscribe((data:any)=>{
    this.price = data["chart"]["result"][0]["meta"]["chartPreviousClose"]
  })
}

calculatePricesHandler(){
  let totalValue = 0 
  totalValue = this.price * this.shares
  this.calculatePricesEvent.emit(totalValue)
  console.log(totalValue)
}

}
