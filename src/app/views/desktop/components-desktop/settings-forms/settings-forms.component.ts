import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessactionComponent } from 'src/app/components/successAction/successaction.component';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';


@Component({
  selector: 'app-settings-forms',
  templateUrl: './settings-forms.component.html',
  styleUrls: ['./settings-forms.component.scss'],
})
export class SettingsFormsComponent implements OnInit {
  desktopData: Desktop[] | any = [];
  admDesktop!: boolean;

  public settingsForm: FormGroup = this._formBuild.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    desktopName: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private _desktopService: DesktopService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _formBuild: FormBuilder,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getDesktop();
  }

  public addMemberToDesktop(): void {
    this._desktopService
      .addMemberToDesktop(this.desktopData.id, this.settingsForm.value.email)
      .subscribe({
        next: (res: any) => {
          this.openSuccessError(SuccessactionComponent);
        },
        error: (err: any) => {
          this.openSuccessError(ErrorComponent);
        },
      });
    console.log(this.desktopData.id, this.settingsForm.value.email);
  }

  public verifyAdm(): boolean {
    const userLoged = localStorage.getItem('_i_.ind0');
    const generalUser = Number(userLoged);

    const desktopCreatedUSer = this.desktopData.user_id;
    return generalUser === desktopCreatedUSer ? true : false;
  }

  public verifyDeleteDesktop(): boolean {

    const desktopNameValueInput = this.settingsForm.value.desktopName;
    const desktopName = this.desktopData.name + '/sim';

    if(desktopNameValueInput === desktopName) {
      return true
    }

    return false;
  }

  private getDesktop(): void {
    this._desktopService.findOneDesktop(this.data).subscribe({
      next: (res) => {
        this.desktopData = res.body;
        console.log(this.desktopData);
        this.verifyAdm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private openSuccessError(Component: any): void {
    this._dialog.open(Component, {
      width: '25%',
    });
  }
}
