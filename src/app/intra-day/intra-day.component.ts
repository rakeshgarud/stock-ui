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
  constructor(private stockService:StockService) { }

  ngOnInit() {
    this.getCheckfilter();
  }

  getCheckfilter() {
    this.stockService.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  getEquities() {
    this.search.filter = this.filtersRequest;
    this.stockService.getIntraDay(this.startTime,this.endTime,this.search)
      .subscribe(data => {
          this.equities = data;
      });
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

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.startTime = value;
    } else
      this.endTime = value;
    this.getEquities();
  }

}
