import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  public createAccForm = new FormGroup({
    primary_name: new FormControl('', [Validators.required]),
    second_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public matcher = new MyErrorStateMatcher();

  public hide = true;

  constructor() {}

  ngOnInit(): void {}

  public preventDefPass(event: Event): boolean {
    event.preventDefault();
    return (this.hide = !this.hide);
  }

  create(event: Event) {
    event.preventDefault();
    console.log(this.createAccForm.value);
  }
}
