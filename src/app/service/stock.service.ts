import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from "../model/Stock";
import { Filters } from '../model/Filters';

@Injectable()
export class StockService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/';
  equityEndPoint: string = 'options/';

  // Stock service...........!
  loadData() {
    return this.http.get<Stock[]>(this.baseUrl + 'stock/load-stock');
  }
  getStocksByFilter(startDate: any,endDate: any, filetr: Object) {
    let params = new HttpParams();
    params = params.append("endDate", endDate);
    params = params.append("startDate", startDate);
    //params = params.append("filter", filetr.toString());
    return this.http.post<Stock[]>(this.baseUrl + 'stock/search' ,filetr, {params: params});
  }
  getAllStocksDataList(startDate: any,endDate: any , filetr: Object) {
    let params = new HttpParams();
    params = params.append("endDate", endDate);
    params = params.append("startDate", startDate);
    //params = params.append("filter", filetr.toString());
    return this.http.post<Stock[]>(this.baseUrl + 'stock/get-all-stock-list' ,filetr , {params: params});
  }
  getFilters(type: string) {
    let params = new HttpParams();
    params = params.append("type", type);
    return this.http.get<Filters[]>(this.baseUrl+ 'stock/get-filter',{params: params});
  }


  //Service for Equity Component
  loadEquity() {
    return this.http.get<Stock[]>(this.baseUrl + this.equityEndPoint+'load-nifty');
  }
  getEquityByFilter(search : any) {
    let params = new HttpParams();
    return this.http.post<Stock[]>(this.baseUrl + this.equityEndPoint+ 'search/nifty' ,search);
  }

  
  // Service for Premium DK
  getPremiumDKByFilter(search : any) {
    let params = new HttpParams();
    return this.http.post<Stock[]>(this.baseUrl + this.equityEndPoint+  'nifty/premiumdk' ,search);
  }


  //Service for Activity Component
  loadActivityData() {
    return this.http.get<Stock[]>(this.baseUrl + 'activity/load');
  }
  getActivity(startDate: any,endDate: any, filter?: Object) {
    let params = new HttpParams();
    params = params.append("endDate", endDate);
    params = params.append("startDate", startDate);
    return this.http.post<any[]>(this.baseUrl + 'activity/search' ,params);
  }


//Stock Options Services..!
  loadStockOptions() {
    return this.http.get<Stock[]>(this.baseUrl + this.equityEndPoint+ 'load-stocks');
  }
  getSymbols() {
    return this.http.get<Filters[]>(this.baseUrl+ 'stock/symbol');
  }
  getStocksOptionsByFilter(search : any) {
    let params = new HttpParams();
    return this.http.post<Stock[]>(this.baseUrl + this.equityEndPoint+ 'search/stocks' ,search);
  }
  /* 
  createUser(user: Stock) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: Stock) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  } */
}
