import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

const toastrConfig = {
  maxOpened: 1,
  timeOut: 10000,
  enableHtml: true,
  autoDismiss: true,
  preventDupicates: true,
  positionClass: 'toast-top-right'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
