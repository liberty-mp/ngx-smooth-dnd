import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxSmoothDndModule } from '@libertymp/ngx-smooth-dnd';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmoothDndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
