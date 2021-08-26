import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MarketmoversService {

  constructor(private http:HttpClient) { }

  getMovers(){

    const headers= new HttpHeaders()
      .set('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com')
      .set('x-rapidapi-key', '2581059238msh0d97bb24b4a5877p17a53ejsn84e2379279b1');

    return this.http.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&count=5&start=0', { 'headers': headers })
  }

  getStockSummary(params={stock:'BLFS'}){

    const headers= new HttpHeaders()
      .set('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com')
      .set('x-rapidapi-key', '2581059238msh0d97bb24b4a5877p17a53ejsn84e2379279b1');
    return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${params.stock}&region=US`,{ 'headers': headers })
    
  }
}
