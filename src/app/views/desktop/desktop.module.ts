import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';

import { DesktopRoutingModule } from './desktop-routing.module';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { TableViewComponent } from './table-view/table-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardFormComponent } from './components-desktop/card-form/card-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { InfoHomeComponent } from './info-home/info-home.component';
import { SettingsFormsComponent } from './components-desktop/settings-forms/settings-forms.component';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';


import { OverlayModule } from '@angular/cdk/overlay';

import { CardViewComponent } from './card-view/card-view.component';
import { ModalShare } from 'src/app/share/modal-share';
import { FunctionShare } from 'src/app/share/function-share';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TaskModalComponent } from './components-desktop/task-modal/task-modal.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskItemModalComponent } from './components-desktop/task-item-modal/task-item-modal.component';




@NgModule({
  declarations: [
    HomeComponent,
    TableViewComponent,
    CardFormComponent,
    InfoHomeComponent,
    SettingsFormsComponent,
    CardViewComponent,
    TaskModalComponent,
    TaskItemModalComponent,
  ],
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
    MatDatepickerModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    OverlayModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    { provide: ModalShare },
    { provide: FunctionShare },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DesktopModule {}
