import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';
import { HomeComponent } from 'src/app/views/desktop/home/home.component';

@Component({
  selector: 'app-desktop-form',
  templateUrl: './desktop-form.component.html',
  styleUrls: ['./desktop-form.component.scss'],
})
export class DesktopFormComponent implements OnInit {
  public value = '';

  public desktopForm: FormGroup = this._formBuild.group({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    private _desktopService: DesktopService,
    private _formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Desktop
  ) {}

  ngOnInit(): void {
    this.desktopForm;
  }

  public CreateDesktop() {
    console.log(this.desktopForm.value);
    this._desktopService.createDesktop(this.desktopForm.value).subscribe();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
