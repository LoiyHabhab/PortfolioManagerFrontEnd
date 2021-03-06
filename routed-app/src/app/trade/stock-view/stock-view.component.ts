import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentstocksService } from 'src/services/currentstocks.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})

export class StockViewComponent implements OnInit {
  @Input() id:number = 0
  @Input() account_id?:number
  @Input() shares?:number
  @Input() stock_name:string = ''
  @Input() index?:number // ? means it might not exist
  @Input() cash:number = 0
  buycount:number = 0
  sellcount:number = 0
  @Input() price:number = 100

  @Output() buyEvent:EventEmitter<object> = new EventEmitter()
  @Output() sellEvent:EventEmitter<object> = new EventEmitter()



  constructor(private currentStockService:CurrentstocksService) { 
    //this.getStockPrice()
  }

  ngOnInit(): void {
    function sleep(ms: number){
      return new Promise(resolve=>setTimeout(resolve,ms));
    }
    let rand = Math.floor(Math.random() * 6000) + 500
    sleep(rand).then(()=>{
      this.getStockPrice()
    })
    
  }

  

  getMaxBuy(){
    return Math.floor(this.cash/this.price)
  }

  buyStock(){
    this.buyEvent.emit({stock_name:this.stock_name,price:this.price,shares:this.buycount}) // we can send complex data as an object
  }

  sellStock(){
    console.log("sell here")
    this.sellEvent.emit({stock_name:this.stock_name,price:this.price,shares:this.sellcount})
  }

  getStockPrice(){
      this.currentStockService.getStockPrice(this.stock_name)
    .subscribe((data:any)=>{
      this.price = data["chart"]["result"][0]["meta"]["chartPreviousClose"]
    })
    
    
  }

}
