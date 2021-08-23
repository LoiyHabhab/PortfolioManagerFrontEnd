import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketMoversComponent,
    CashFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
