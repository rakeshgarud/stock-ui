import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Filters } from '../model/Filters';

@Component({
  selector: 'app-premium-decay',
  templateUrl: './premium-decay.component.html',
  styleUrls: ['./premium-decay.component.css']
})
export class PremiumDecayComponent implements OnInit {

  checkBoxFilter: Object[];
  filtersRequest: Filters[] = [];
  callPremiumDecay: Object[] = [];
  putPremiumDecay: Object[] = [];
  search: any = { strikePrice: null, startDate: null, endDate: null, type: 'CALL' };
  constructor(private stockservice: StockService) { }

  ngOnInit() {
    this.getCheckfilter();
  }

  getCheckfilter() {
    this.stockservice.getFilters("equityFilter").subscribe(data => {
      this.checkBoxFilter = data;
    });
  }

  getPremiumDecayData(value: any) {
    this.search.type = value;
    this.getNiftyPremiumDecay();
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.search.startDate = value;
    } else
      this.search.endDate = value;
    //this.getEquities();
  }

  getNiftyPremiumDecay() {
    this.search.filter = this.filtersRequest;
    this.stockservice.getPremiumDecayByFilter(this.search)
      .subscribe(data => {
        if (this.search.type == 'CALL') {
          var list = JSON.parse(JSON.stringify(data));
          console.log(list.Data);
          this.callPremiumDecay = list.Data;
        }
        else
        var list = JSON.parse(JSON.stringify(data));
        console.log(list.Data);
        this.putPremiumDecay = list.Data;
      });
      console.log("Loading Call data" + this.callPremiumDecay);
      console.log("Loading Put data " + this.putPremiumDecay);
  }

  checkValue(event: any, obj: any, type: any) {
    this.search.type = type;
    if (event) {
      this.filtersRequest.push(obj);
    } else {
      this.filtersRequest = this.filtersRequest.filter(item => item !== obj);
    }
    this.getNiftyPremiumDecay();
  }

}
