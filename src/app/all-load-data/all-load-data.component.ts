import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Router } from '@angular/router';
import { Stock } from "../model/Stock";

@Component({
  selector: 'app-all-load-data',
  templateUrl: './all-load-data.component.html',
  styleUrls: ['./all-load-data.component.css']
})
export class AllLoadDataComponent implements OnInit {

  stocks: Stock[] = [];
  constructor(private router: Router, private stockservice: StockService) { }

  ngOnInit() {
  }

  loadStockData() {
    console.log("Loading Stock data into DB");
    this.stockservice.loadData().subscribe(data => {
      this.stocks = data;
    });
  };

  loadNiftyOptionsData() {
    console.log("Loading Nifty Options data into DB");
    this.stockservice.loadEquity().subscribe(data => {
    });
  };

  loadStocOptionskData() {
    console.log("Loading Nifty Options data into DB");
    this.stockservice.loadStockOptions().subscribe(data => {
    });
  }

  loadFiiData() {
    console.log("Loading data into DB");
    this.stockservice.loadActivityData().subscribe(data => {
    });
  };

}
