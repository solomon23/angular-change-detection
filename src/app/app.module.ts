import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegularChildComponent } from './regular/regular-child.component';
import { RegularComponent } from './regular/regular.component';
import { OnpushChildComponent } from './onpush/onpush-child.component';
import { OnpushComponent } from './onpush/onpush.component';
import { OnchangesComponent } from './onchanges/onchanges.component';
import { OnchangesPushComponent } from './onchanges/onchanges-push.component';
import { NoteComponent } from './note.component';

@NgModule({
  declarations: [
    AppComponent,
    OnpushComponent,
    RegularComponent,
    RegularChildComponent,
    OnpushChildComponent,
    OnchangesComponent,
    OnchangesPushComponent,
    NoteComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
