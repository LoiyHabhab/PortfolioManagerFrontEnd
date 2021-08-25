import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { InsightsComponent } from './insights/insights.component';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { AssetViewComponent } from './net-worth/asset-view/asset-view.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ChartModule} from 'angular2-chartjs';
import { TradeComponent } from './trade/trade.component';
import { StockViewComponent } from './trade/stock-view/stock-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketMoversComponent,
    CashFlowComponent,
    InsightsComponent,
    NetWorthComponent,
    AssetViewComponent,
    TradeComponent,
    StockViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // the FormsModule is needed for forms
    HttpClientModule,
    ChartModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
