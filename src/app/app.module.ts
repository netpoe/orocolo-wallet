import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BalancesComponent } from './balances/balances.component';
import { TokenDetailsComponent } from './token-details/token-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalancesComponent,
    TokenDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
