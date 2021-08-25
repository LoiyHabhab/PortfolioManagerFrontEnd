import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  constructor(private http:HttpClient) { }

  getAllHistoricalData(){
    return this.http.get('http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/historicalaccountdata')
  }

  getDatabyDate(params={timePeriod:'date',id:1, currentDate:'2021-08-16'}){
    return this.http.get(`http://portfolio-manager-portfolio-manager.namdevops22.conygre.com/historicalaccountdata/${params.timePeriod}/${params.id}/${params.currentDate}`)

  }
}
