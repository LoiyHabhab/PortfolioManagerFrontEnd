import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { InsightsComponent } from './insights/insights.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { TradeComponent } from './trade/trade.component';

// all routes are inspected in strict order until a match is found
const routes: Routes = [
  {path:'', redirectTo: '/cash-flow', pathMatch:'full'},
  {path:'cash-flow', component:CashFlowComponent},
  {path:'market-movers', component:MarketMoversComponent},
  {path:'insights', component:InsightsComponent},
  {path:'trade', component:TradeComponent},
  // we should catch any route that has not already been matched
  {path:'**', component:CashFlowComponent} // put this in only when the other routes work!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
