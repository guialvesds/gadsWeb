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
import { Router } from '@angular/router';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public loginForm: FormGroup = this._formBuild.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public matcher = new MyErrorStateMatcher();
  public hide = true;
  public enableButton = false;
  public erroMessage = '';
  public errorRequest = false;

  constructor(
    private _formBuild: FormBuilder,
    private _route: Router,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm;
  }

  public preventDefPass(event: Event): boolean {
    event.preventDefault();
    return (this.hide = !this.hide);
  }

  public login(event: Event): void {
    event.preventDefault();
    if (this.loginForm.value === '') {
      return;
    }

    this._login.login(this.loginForm.value).subscribe({
      next: (res) => {
        const token: string | any = res.body?.access_token;
        const id: number | any = res.body?.id;

        localStorage.setItem('acc', token);
        localStorage.setItem('_i_.ind', id + '127_i');
        this.enableButton = true;
        this._route.navigate(['home']);
      },

      error: (err) => {
        if (err.error.error == 'Unauthorized') {
          this.errorRequest = true;
          this.erroMessage = err.error.message;
        }
        this.enableButton = false;
      },
    });
  }
}
