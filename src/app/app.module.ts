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
import { EthjsService } from './ethjs.service';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '/login',
  autoQueue: false,
  maxFilesize: 1,
  acceptedFiles: 'application/json'
};

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
    AngularFireModule.initializeApp(firebaseConfig),
    DropzoneModule
  ],
  providers: [
    EthjsService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
