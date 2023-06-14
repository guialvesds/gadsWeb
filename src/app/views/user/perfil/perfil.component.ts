import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { USerService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public userData!: User | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _userService: USerService
  ) {}

  ngOnInit(): void {
    console.log(this.data, this.userData);
    this.findUser();
  }

  public modifyDate(row: string): string {
    return row.toLocaleString().substring(0, 10).split('-').reverse().join('/');
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
