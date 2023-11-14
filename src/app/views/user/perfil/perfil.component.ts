import { Component, Inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, retry } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { USerService } from 'src/app/services/user.service';
import { FunctionShare } from 'src/app/share/function-share';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public userData!: User | any;
  public imageUrl: string = '';
  predefinedImageUrl = '../../../../assets/perfil-image.jpg';

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _userService: USerService,
    private _route: Router,
    private _dialogRef: MatDialog,
    public _functionShare: FunctionShare,
  ) {}

  ngOnInit(): void {
    console.log(this.data, this.userData);
    this.findUser();
  }

  public modifyDate(row: string): string {
    return row.toLocaleString().substring(0, 10).split('-').reverse().join('/');
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      this.previewUrl = null;
    }
  }

  public unsetImage(): string {
    return (this.previewUrl = '');
  }

  public upload(): void {
    console.log('Foto enviada:', this.selectedFile);
  }

  public logOff(): void {
    this._dialogRef.closeAll();
    window.localStorage.removeItem('acc');
    this._route.navigate(['login']);
  }

  private findUser(): void {
    this._userService
      .findUser(this.data)
      .pipe(
        map((user) => ({
          ...user,
          data: user.body,
        }))
      )
      .subscribe({
        next: ({ data }) => {
          this.userData = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
