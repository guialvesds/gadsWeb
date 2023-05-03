import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopRoutingModule } from './desktop-routing.module';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DesktopRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
  ],
})
export class DesktopModule {}
