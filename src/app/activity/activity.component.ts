import { Component, OnInit } from '@angular/core';
import { StockService } from '../service/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html'
  /* styleUrls: ['./activity.component.css'] */
})
export class ActivityComponent implements OnInit {

  startDate: any;
  endDate: any;
  activities: any[]=[];
  constructor(private router: Router, private stockservice: StockService) { }

  ngOnInit() {
  }

  loadData() {
    console.log("Loading data into DB");
    this.stockservice.loadActivityData().subscribe(data => {
    });
  };

  getData() {
    this.stockservice.getActivity(this.startDate,this.endDate)
      .subscribe(data => {
        this.activities = data;
      });
  }

  onDateChange(value: any, isStartDate) {
    if (isStartDate) {
      this.startDate = value;
    } else
    this.endDate = value;
    this.getData();
  }
}
