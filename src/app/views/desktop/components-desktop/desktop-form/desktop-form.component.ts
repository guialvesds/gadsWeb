import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';
import { HomeComponent } from 'src/app/views/desktop/home/home.component';
import { SuccessactionComponent } from '../../../../components/successAction/successaction.component';
import { ErrorComponent } from 'src/app/components/error/error.component';

@Component({
  selector: 'app-desktop-form',
  templateUrl: './desktop-form.component.html',
  styleUrls: ['./desktop-form.component.scss'],
})
export class DesktopFormComponent implements OnInit {
  public value = '';
  public dektopFormControl = new FormControl('', [
    Validators.required,
  ]);

  public desktopForm: FormGroup = this._formBuild.group({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    private _desktopService: DesktopService,
    private _formBuild: FormBuilder,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Desktop
  ) {}

  ngOnInit(): void {
    this.desktopForm;
  }

  // Criar um novo desktop
  public CreateDesktop() {
    console.log(this.desktopForm.value);

    if(this.desktopForm.value.name === '' || this.desktopForm.value.name === null) {
      return;
    }

    this._desktopService.createDesktop(this.desktopForm.value).subscribe({
      next: (res) => {
        this.openSuccessDialog();
        this.closeDialog();
        setTimeout(() => {
          this._dialog.closeAll();
        }, 2000);
      },
      error: (err) => {
        this.openErrorDialog();
      },
    });
  }

  // Fecha os modal
  public closeDialog(): void {
    this.dialogRef.close();
  }

  // Abre modal de sucesso
  private openSuccessDialog(): void {
    this._dialog.open(SuccessactionComponent, {
      width: '30%',
    });
  }

  // Abre modal de erro
  private openErrorDialog(): void {
    this._dialog.open(ErrorComponent, {
      width: '30%',
    });
  }
}
