import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Filters } from '../model/Filters';

@Component({
  selector: 'app-yesterDay-today',
  templateUrl: './yesterDay-today.html',
  styleUrls: ['./yesterDay-today.css']
})
export class YesterDayTodayComponent implements OnInit {

  checkBoxFilter: any[] = [];
  equities: any[] = [];
  search: any = { strikePrice: null, startDate: null, endDate: null, type: 'CALL' };
  filtersRequest: Filters[] = [];
  callYesterdayToday: Object[] = [];
  putYesterdayToday: Object[] = [];
  sortDir: boolean;
  expiryDates: any[]=[];

  constructor(private stockService:StockService) { }

  ngOnInit() {
    this.getCheckfilter();
    this.getExpiryDates();
   // this.getYesterdayMinusToday();
  }

  getCheckfilter() {
    this.stockService.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  getYesterdayMinusToday() {
    this.search.filter = this.filtersRequest;
    this.stockService.getYesterdayMinusTodayByFilter(this.search)
      .subscribe(data => {
        if (this.search.type == 'CALL') {
          this.callYesterdayToday = data;
        }
        else
          this.putYesterdayToday = data;
      });
  }

  getYesterdayMinusTodayCall() {
    this.search.filter = this.filtersRequest;
    this.stockService.getYesterdayMinusTodayByFilter(this.search)
      .subscribe(data => {
          //this.equities = data;
          if (this.search.type == 'CALL') {
            this.callYesterdayToday = data;
          }
          else
            this.putYesterdayToday = data;
      });

      console.log("Calldata--> " +this.callYesterdayToday);
      console.log("putdata--> " +this.putYesterdayToday);
  }

  getExpiryDates() {
    this.stockService.getExpiryDates().subscribe(data => {
      this.expiryDates = data;
    });
  }

  expiryDatesDropDown(date: any) {
    this.search.expiryDate = date;
    this.getYesterdayMinusToday();
  }

  checkValue(event: any, obj: any, type: any) {
    this.search.type = type;
    if (event) {
      this.filtersRequest.push(obj);
    } else {
      this.filtersRequest = this.filtersRequest.filter(item => item !== obj);
    }
    this.getYesterdayMinusToday();
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.search.startDate = value;
    } else {
      this.search.endDate = value;
    }
   // this.getEquities();
   this.getYesterdayMinusToday();
  }

  getData(value: any) {
    this.search.type = value;
    this.getYesterdayMinusTodayCall();
  }

  callSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.callYesterdayToday.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.callYesterdayToday.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }
  putSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.putYesterdayToday.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.putYesterdayToday.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }
}