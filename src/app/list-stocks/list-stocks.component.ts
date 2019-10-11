import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StockService } from "../service/stock.service";
import { Stock } from "../model/Stock";
import { Filters } from '../model/Filters';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list.stock.css']
})
export class ListStocksComponent implements OnInit {

  stocks: Stock[] = [];
  startDate: any;
  endDate: any;
  checkBox: Object[];
  checkBoxFilter: Object[];
  filter: Filters[] = [];
  day: any;
  sortDir: boolean;
  constructor(private router: Router, private stockservice: StockService) { }

  ngOnInit() {
    this.filter = [];
    this.checkBox = [
      { key: "CLOSE_PRICE", value: 0, title: "Close Price" },
      { key: "TRADE_QTY", value: 1, title: "TT Trade Qty" }
    ];
    this.getCheckfilter();
  }

  getStocks() {
    this.stockservice.getStocksByFilter(this.startDate,this.endDate,this.filter)
      .subscribe(data => {
        this.stocks = data;
      });
      console.log(this.stocks);
  }
  getAllStocksDataList(){
    this.stockservice.getAllStocksDataList(this.startDate,this.endDate,this.filter)
      .subscribe(data => {
        this.stocks = data;
      });
      console.log(this.stocks);
  }

  loadData() {
    console.log("Loading data into DB");
    this.stockservice.loadData().subscribe(data => {
      this.stocks = data;
    });
    //this.router.navigate(['add-user']);
  };

  getCheckfilter() {
    this.stockservice.getFilters("filter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  checkValue(event: any, obj: any) {
    if (event) {
      this.filter.push(obj);
    } else {
      this.filter = this.filter.filter(item => item !== obj);
    }
    this.getStocks();
  }

  directionValue(event: any, obj: Filters) {
    if (this.filter.length >0) {
      let filtr: Filters;
      filtr = this.filter.find(item => item == obj)
      if (event) {
        filtr.direction = 'UP';
      } else {
        filtr.direction = 'DOWN';
      }
      this.filter = this.filter.filter(item => item !== obj)
      this.filter.push(filtr);
      this.getStocks();
    }

  }

  sortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.stocks.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.stocks.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.startDate = value;
    } else
    this.endDate = value;
    
    
  }
}
