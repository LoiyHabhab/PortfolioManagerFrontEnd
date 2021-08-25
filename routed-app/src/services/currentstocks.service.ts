import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentstocksService {

  constructor(private http:HttpClient) { }

  getCurrentStocks(accountID:number){
    return this.http.get(`http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/currentstocks/accountid/${accountID}`)
  }
  getCashBalance(accountID:number){
    return this.http.get(`http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/historicalaccountdata/${accountID}/current`)
  }

  addCurrentStock(obj:object){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post("http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/currentstocks",{account_id:1,shares:5,stock_name:"MMM"},httpOptions)
    // return this.http.post("http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/currentstocks",JSON.stringify(obj),httpOptions)
    //return this.http.post("http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/accounts",{email:"DSADASD",name:"dsadsad"},httpOptions)

  }

  getStockPrice(symbol:string) {
    const headers= new HttpHeaders()
      .set('x-rapidapi-host', 'apidojo-yahoo-finance-v1.p.rapidapi.com')
      .set('x-rapidapi-key', '9c3d958d8dmsh2ac330dd3090bcfp115a2ajsndb89619ef50c');

    return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=${symbol}&range=1d&region=US`, { 'headers': headers })

  }

}
