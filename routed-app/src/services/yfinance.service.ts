import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class YFinanceService {

  constructor(private http: HttpClient) { }
 
  getStockInfo() {
    const headers= new HttpHeaders()
      .set('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com')
      .set('x-rapidapi-key', '9c3d958d8dmsh2ac330dd3090bcfp115a2ajsndb89619ef50c');

    return this.http.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=AMRN&range=1d&region=US', { 'headers': headers })

  }
}

