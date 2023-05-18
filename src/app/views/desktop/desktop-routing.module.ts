import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableViewComponent } from './table-view/table-view.component';

const routesDesktop: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home/desktopTableView/:id', component: TableViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesDesktop)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
