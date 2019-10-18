import { Component, OnInit } from '@angular/core';
import { Filters } from '../model/Filters';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-intra-day',
  templateUrl: './intra-day.component.html',
   styleUrls: ['./intra-day.component.css'] 
})
export class IntraDayComponent implements OnInit {

  checkBoxFilter: any[] = [];
  equities: any = [];
  search: any = { strikePrice: null, startDate: null, endDate: null, type: 'CALL' };
  filtersRequest: Filters[] = [];
  startTime: any;
  endTime: any;
  callIntradayYesterdayToday: Object[] = [];
  putIntradayYesterdayToday: Object[] = [];
  sortDir: boolean;
  constructor(private stockService:StockService) { }

  ngOnInit() {
    this.getCheckfilter();
  }

   getData(value: any) {
    this.search.type = value;
    this.getIntradayYesterdayMinusTodayCall();
  }

  getCheckfilter() {
    this.stockService.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  getIntradayYesterdayMinusTodayCall() {
    this.search.filter = this.filtersRequest;
    this.stockService.getIntraDay(this.startTime,this.endTime,this.search)
      .subscribe(data => {
        if (this.search.type == 'CALL') {
          this.callIntradayYesterdayToday = data;
        }
        else
          this.putIntradayYesterdayToday = data;
      });

      console.log("Calldata--> " +this.callIntradayYesterdayToday);
      console.log("putdata--> " +this.putIntradayYesterdayToday);
  }

  checkValue(event: any, obj: any, type: any) {
    this.search.type = type;
    if (event) {
      this.filtersRequest.push(obj);
    } else {
      this.filtersRequest = this.filtersRequest.filter(item => item !== obj);
    }
    this.getIntradayYesterdayMinusTodayCall();
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.startTime = value;
    } else
      this.endTime = value;
    //this.getIntradayYesterdayMinusTodayCall();
  }

  callSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.callIntradayYesterdayToday.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.callIntradayYesterdayToday.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }
  putSortBy(sortBy, sortDir?) {
    this.sortDir = sortDir;
    if (this.sortDir) {
      this.putIntradayYesterdayToday.sort(function (a, b) {
        return a[sortBy] - b[sortBy];
      });
    } else {
      this.putIntradayYesterdayToday.sort(function (a, b) {
        return b[sortBy] - a[sortBy];
      });
    }
  }

  
}
