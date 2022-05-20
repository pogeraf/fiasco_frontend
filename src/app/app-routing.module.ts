import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import * as roomRouting from './room/room-routing.module';
import { LoginInRoomComponent } from './room/login-in-room/login-in-room.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'room',
    pathMatch: 'full',
  },
  {
    path: 'room',
    children: roomRouting.routes,
  },
  {
    path: 'login',
    component: LoginInRoomComponent,
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
