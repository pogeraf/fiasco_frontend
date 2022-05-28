import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomModule } from './room/room.module';
import { ReconnectModalModule } from './modals/reconnect-modal/reconnect-modal.module';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoomModule,
    ReconnectModalModule,
    SimpleModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
