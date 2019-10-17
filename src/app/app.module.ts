import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { StockService } from "./service/stock.service";
import { ListStocksComponent } from "./list-stocks/list-stocks.component";
import { MenuComponent } from './menu/menu.component';
import { EquityComponent } from './equity/equity.component';
import { ActivityComponent } from './activity/activity.component';
import { AllLoadDataComponent } from './all-load-data/all-load-data.component';
import { StockOptionChainComponent } from './stock-option-chain/stock-option-chain.component';
import { IntraDayComponent } from './intra-day/intra-day.component';
import { YesterDayTodayComponent } from './yesterDay-today/yesterDay-today';
import { PremiumDecayComponent } from './premium-decay/premium-decay.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStocksComponent,
    MenuComponent,
    EquityComponent,
    YesterDayTodayComponent,
    ActivityComponent,
    AllLoadDataComponent,
    StockOptionChainComponent,
    IntraDayComponent,
    PremiumDecayComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
