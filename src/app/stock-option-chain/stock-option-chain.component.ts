import { Component, OnInit } from '@angular/core';
import { Filters } from '../model/Filters';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-stock-option-chain',
  templateUrl: './stock-option-chain.component.html',
  styleUrls: ['./stock-option-chain.component.css']
})
export class StockOptionChainComponent implements OnInit {

  checkBoxFilter: Object[];
  equities: Object[] = [];
  symbols: any[] = [];
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
    this.getStockOptions();
  }
  getCheckfilter() {
    this.stockservice.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }
  getSymbols() {
    this.stockservice.getSymbols().subscribe(data => {
      this.symbols = data;
    });
  }
  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.search.startDate = value;
    } else
      this.search.endDate = value;
    this.getStockOptions();
  }
  checkValue(event: any, obj: any, type: any) {
    this.search.type = type;
    if (event) {
      this.filtersRequest.push(obj);
    } else {
      this.filtersRequest = this.filtersRequest.filter(item => item !== obj);
    }
    this.getStockOptions();
  }
  getData(value: any) {
    this.search.type = value;
    this.getStockOptions();
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

  getStockOptions() {
    this.search.filter = this.filtersRequest;
    this.stockservice.getStocksOptionsByFilter(this.search)
      .subscribe(data => {
        if (this.search.type == 'CALL') {
          this.callEquities = data;
        }
        else
          this.putEquities = data;
      });
      console.log("Loading Call data" + this.callEquities['oi'].value);
      console.log("Loading Put data " + this.putEquities);
  }

  symbolDropDown(symbol: any) {
    this.search.symbol = symbol;
    //this.getEquities();
  }
}
