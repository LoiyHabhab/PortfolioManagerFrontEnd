import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-view',
  templateUrl: './asset-view.component.html',
  styleUrls: ['./asset-view.component.css']
})
export class AssetViewComponent implements OnInit {
  // declare data-models for this component
  // if we intend to inject values, the data-model MUST be an @Input
  @Input() price:number = 0
  @Input() code:string = ''
  count:number = 0

  constructor() { }

  ngOnInit(): void {
  }
  // here are the ethods of this component
  buyStock(){
    // increment the count
    this.count += 1
  }

}
