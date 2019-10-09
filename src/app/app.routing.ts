import { RouterModule, Routes } from '@angular/router';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { EquityComponent } from './equity/equity.component';
import { PremiumdkComponent } from './premiumdk/premiumdk.component';
import { ActivityComponent } from './activity/activity.component';
import { AllLoadDataComponent } from './all-load-data/all-load-data.component';

const routes: Routes = [
  { path: '', component: ListStocksComponent },
  { path: 'stock', component: ListStocksComponent },
  { path: 'equity', component: EquityComponent },
  { path: 'premium-dk', component: PremiumdkComponent },
  { path: 'exchange-activity', component: ActivityComponent },
  { path: 'all-data-download', component: AllLoadDataComponent }
];

export const routing = RouterModule.forRoot(routes);
