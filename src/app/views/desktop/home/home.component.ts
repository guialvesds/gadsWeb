import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public desktopData: Desktop[] | any = [];

  constructor(private _desktopService: DesktopService) {}

  ngOnInit(): void {
    this.findDesktop();
  }

  public findDesktop(): void {
    this._desktopService
      .findDesktops().pipe( map((desktop) => ({
          ...desktop,
          data: desktop.body,
        }))
      )
      .subscribe({
        next: ({ data }) => {
          this.desktopData = data;
          console.log(this.desktopData);
        },
        error: (err => {
          throw new Error(err);
        })
      });
  }
}
