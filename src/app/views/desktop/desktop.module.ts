import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopRoutingModule } from './desktop-routing.module';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { TableViewComponent } from './table-view/table-view.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [HomeComponent, TableViewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    DesktopRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ScrollingModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class DesktopModule {}
