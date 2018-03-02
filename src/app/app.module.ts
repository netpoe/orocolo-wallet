import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BalancesComponent } from './balances/balances.component';
import { TokenDetailsComponent } from './token-details/token-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NewWalletComponent } from './new-wallet/new-wallet.component';
import { firebaseConfig } from '../environments/firebase.config';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalancesComponent,
    TokenDetailsComponent,
    HeaderComponent,
    NewWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
