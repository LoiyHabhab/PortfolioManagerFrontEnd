import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.css']
})
export class NetWorthComponent implements OnInit {

  // declare model data for this component
  total = 0
  codes = [
    {code:'AMZN'},
    {code:'NFLX'},
    {code:'GOOGL'},
    {code:'FB'},
    {code:'AAPL'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  // we can declare methods of this class here
  modifyParent(value:number){
    this.total += value
  }

}
