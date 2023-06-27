import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessactionComponent } from 'src/app/components/successAction/successaction.component';
import { LoginService } from 'src/app/services/login.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  public formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public createAccForm: FormGroup = this._formBuild.group({
    primary_name: new FormControl('', [Validators.required]),
    second_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public matcher = new MyErrorStateMatcher();
  public hide = true;
  public erroMessage = '';
  public errorRequest = true;
  public enableButton = false;

  constructor(
    private _login: LoginService,
    private _route: Router,
    private _formBuild: FormBuilder,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createAccForm;
  }

  public preventDefPass(event: Event): boolean {
    event.preventDefault();
    return (this.hide = !this.hide);
  }

  public backLogin(): void {
    this._route.navigate(['login']);
  }

  public create(event: Event): void {
    event.preventDefault();

    if (this.createAccForm.value === '') {
      return;
    }

    this.enableButton = true;

    this._login.createUser(this.createAccForm.value).subscribe({
      next: (res) => {
        this.openDialog();
        this.enableButton = false;

        setTimeout(() => {
          this._dialog.closeAll();
        }, 3200);

        setTimeout(() => {
          this._route.navigate(['']);
        }, 3700);
      },
      error: (err) => {
        this.enableButton = false;

        if (err.error.statusCode === 400) {
          this.erroMessage =
            'Senha Fraca, utileza simbolos, números, letras maiúsculas e minúsculas.';
        }
      },
    });
  }

  private openDialog(): void {
    this._dialog.open(SuccessactionComponent, {
      width: '20%',
    });
  }
}
