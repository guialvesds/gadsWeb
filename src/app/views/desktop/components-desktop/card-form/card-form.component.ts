import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { SuccessactionComponent } from 'src/app/components/successAction/successaction.component';
import { CardService } from 'src/app/services/card.service';
import { HomeComponent } from '../../home/home.component';
import { ErrorComponent } from 'src/app/components/error/error.component';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  public cardFormControl = new FormControl('', [Validators.required]);
  public cardForm: FormGroup = this._formBuild.group({
    title: new FormControl('', [Validators.required]),
    delivery_date: new FormControl('', [Validators.required]),
    // groupeCard: new FormControl(''),
  });

  public validation: boolean = false;
  constructor(
    private _formBuild: FormBuilder,
    private _dialog: MatDialog,
    public _dialogRef: MatDialogRef<HomeComponent>,
    private _cardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {}

  public createCard(): void {
    if (
      this.cardForm.value.title === '' ||
      this.cardForm.value.delivery_date === ''
    ) {
      return;
    }
    this._cardService.createCard(this.cardForm.value, this.data).subscribe({
      next: (res) => {
        if (res.status === 201) {
          this.openSuccessDialog();
          this.closeDialog();
          setTimeout(() => {
            this._dialog.closeAll();
          }, 2000);
        } else if (res.status !== 201 || !res.status) {
          this.openErrorDialog();
        }
      },
      error: (err) => {
        if (err) {
          this.openErrorDialog();
        }
      },
    });
  }

  // Fecha os modal
  public closeDialog(): void {
    this._dialogRef.close();
  }

  // Abre modal de sucesso
  private openSuccessDialog(): void {
    this._dialog.open(SuccessactionComponent, {
      width: '25%',
    });
  }

  // Abre modal de erro
  private openErrorDialog(): void {
    this._dialog.open(ErrorComponent, {
      width: '25%',
    });
  }
}
