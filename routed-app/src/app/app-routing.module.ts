import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { InsightsComponent } from './insights/insights.component';
import { MarketMoversComponent } from './market-movers/market-movers.component';
import { NetWorthComponent } from './net-worth/net-worth.component';

const routes: Routes = [
  {path:'cash-flow', component:CashFlowComponent},
  {path:'market-movers', component:MarketMoversComponent},
  {path:'net-worth', component:NetWorthComponent},
  {path:'insights', component:InsightsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
