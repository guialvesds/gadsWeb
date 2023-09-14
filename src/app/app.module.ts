import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccessactionComponent } from './components/successAction/successaction.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DesktopFormComponent } from './views/desktop/components-desktop/desktop-form/desktop-form.component';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { RemoveAcceptComponent } from './components/removeAccept/removeaccept.component';
import { ModalShare } from './share/modal-share';
import { MemberModalComponent } from './views/desktop/components-desktop/member-modal/member-modal.component';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    AppComponent,
    SuccessactionComponent,
    DesktopFormComponent,
    ErrorComponent,
    RemoveAcceptComponent,
    MemberModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    ScrollingModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
