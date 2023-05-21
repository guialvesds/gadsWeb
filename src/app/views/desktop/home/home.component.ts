import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DesktopFormComponent } from 'src/app/views/desktop/components-desktop/desktop-form/desktop-form.component';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public desktopData: Desktop[] | any = [];

  constructor(
    private _desktopService: DesktopService,
    private _dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.findDesktop();
  }

  public openDialog(): void {
    const dialogRef = this._dialogRef.open(DesktopFormComponent);
    dialogRef.afterClosed();
  }

  public findDesktop(): void {
    this._desktopService
      .findDesktops()
      .pipe(
        map((desktop) => ({
          ...desktop,
          data: desktop.body,
        }))
      )
      .subscribe({
        next: ({ data }) => {
          this.desktopData = data;
          console.log(this.desktopData);
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
}
