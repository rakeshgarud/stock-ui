import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Filters } from '../model/Filters';

@Component({
  selector: 'app-premiumdk',
  templateUrl: './premiumdk.component.html',
  styleUrls: ['./premiumdk.component.css']
})
export class PremiumdkComponent implements OnInit {

  checkBoxFilter: any[] = [];
  equities: any[] = [];
  search: any = { strikePrice: null, startDate: null, endDate: null, type: 'CALL' };
  filtersRequest: Filters[] = [];
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
    this.stockService.getPremiumDKByFilter(this.search)
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
      this.search.startDate = value;
    } else
      this.search.endDate = value;
    this.getEquities();
  }
}
