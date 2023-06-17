import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DesktopFormComponent } from 'src/app/views/desktop/components-desktop/desktop-form/desktop-form.component';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { USerService } from 'src/app/services/user.service';
import { PerfilComponent } from '../../user/perfil/perfil.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public desktopData: Desktop[] | any = [];

  private emailUser: string = '';
  private idUser!: number;

  constructor(
    private _desktopService: DesktopService,
    private _dialogRef: MatDialog,
    private _userService: USerService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.findUser();
    this.findDesktop();
    // this.verifyLength();
  }

  public openDialog(): void {
    const dialogRef = this._dialogRef.open(DesktopFormComponent);
    dialogRef.afterClosed().subscribe((res: any) => {
      this.findDesktop();
    });
  }

  public goRouter(id: number): any {
    this._route.navigate([`home/desktopTableView/${id}`]).then(() => {
      location.reload();
    });

    // this._route.navigated;
  }

  public openPerfilModal(): void {
    const dialogRef = this._dialogRef.open(PerfilComponent, {
      width: '40%',
      height: '80%',
      data: this.idUser,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.findDesktop();
    });
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
          const deskData: any = data;
          const emailToFilter = this.emailUser;

          this.desktopData = [];

          deskData.forEach((item: Desktop) => {
            if (item.membersDesktop) {
              const hasEmail = item.membersDesktop.some(
                (member: any) => member.email === emailToFilter
              );
              if (hasEmail) {
                this.desktopData.push(item);
              }
            }
          });

          if (this.desktopData.length === 0) {
            this.openDialog();
          }

          console.log(this.desktopData);
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }

  private findUser(): void {
    const userId: number | string | null = localStorage.getItem('_i_.ind0');
    this._userService.findUser(userId).subscribe({
      next: (res) => {
        this.emailUser = res.body!.email;
        this.idUser = res.body!.id;
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  private verifyLength() {
    setTimeout(() => {
      this.desktopData.length === 0 ? this.openDialog() : '';
    }, 2000);
  }
}
