import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Filters } from '../model/Filters';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.css']
})
export class EquityComponent implements OnInit {

  checkBoxFilter: Object[];
  equities: Object[] = [];
  symbols: any[] = [];
  days: number[] = [5, 10, 15, 20, 25];
  filtersRequest: Filters[] = [];
  callType: string;
  callEquities: Object[] = [];
  putEquities: Object[] = [];
  sortDir: boolean;

  search: any = { strikePrice: null, startDate: null, endDate: null, type: 'CALL' };
  constructor(private stockservice: StockService) { }

  ngOnInit() {
    this.getCheckfilter();
    this.getSymbols();
    this.getEquities();
  }

  getCheckfilter() {
    this.stockservice.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  loadEquityData() {
    console.log("Loading data into DB");
    this.stockservice.loadEquity().subscribe(data => {
    });
  };
  getEquities() {
    this.search.filter = this.filtersRequest;
    this.stockservice.getEquityByFilter(this.search)
      .subscribe(data => {
        if (this.search.type == 'CALL') {
          this.callEquities = data;
        }
        else
          this.putEquities = data;
      });
      console.log("Loading Call data");
      console.log("Loading Put data ");
  }

  checkValue(event: any, obj: any, type: any) {
    this.search.type = type;
    if (event) {
      this.filtersRequest.push(obj);
    } else {
      this.filtersRequest = this.filtersRequest.filter(item => item !== obj);
    }
    this.getEquities();
  }

  symbolDropDown(symbol: any) {
    this.search.symbol = symbol;
    this.getEquities();
  }

  getSymbols() {
    this.stockservice.getSymbols().subscribe(data => {
      this.symbols = data;
    });
  }
  onStrikeChange(value: any) {
    this.search.strikePrice = value;
    this.getEquities();
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.search.startDate = value;
    } else
      this.search.endDate = value;
    this.getEquities();
  }

  getData(value: any) {
    this.search.type = value;
    this.getEquities();
  }

  callSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.callEquities.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.callEquities.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }
  putSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.putEquities.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.putEquities.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }

}
