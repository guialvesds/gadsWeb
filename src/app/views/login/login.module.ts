import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { CreateAccountComponent } from './create-account/create-account.component';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class LoginModule { }
