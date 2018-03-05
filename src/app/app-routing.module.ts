import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { NewWalletComponent }  from './new-wallet/new-wallet.component';
import { BalancesComponent }  from './balances/balances.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'new-wallet', component: NewWalletComponent },
  { path: 'balances', component: BalancesComponent },
  { path: 'transfer', component: TransferComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

