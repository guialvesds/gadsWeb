import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CardService } from 'src/app/services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveAcceptComponent } from 'src/app/components/removeAccept/removeaccept.component';
import { CardFormComponent } from '../components-desktop/card-form/card-form.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  public tableViewForm: FormGroup = this._formBuild.group({
    search: new FormControl('', [Validators.required]),
  });
  public value = '';
  public displayedColumns: string[] = [
    'id',
    'title',
    'delivary_date',
    'created_at',
    'acoes',
  ];
  public dataSource!: MatTableDataSource<Desktop['card']> | any;

  public desktopData: Desktop[] | any = [];

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  constructor(
    private _formBuild: FormBuilder,
    private _route: ActivatedRoute,
    private _desktopService: DesktopService,
    private _dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.tableViewForm;
    this.getDesktop();
  }

  public openDialog(id: number): void {
    const dialogRef = this._dialogRef.open(RemoveAcceptComponent, {
      data: id,
    });
    this.refrashCloseDialog(dialogRef);
  }

  public newCard(): void {
    const id: number = this.desktopData.id;
    const dialogRef = this._dialogRef.open(CardFormComponent, {
      data: id,
    });
    this.refrashCloseDialog(dialogRef);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public verifyDelivery(row: any): string {
    return row.delivery_date ? row.delivery_date : '';
  }

  public modifyDate(row: string): string {
    return row.toLocaleString().substring(0, 10).split('-').reverse().join('/');
  }

  private getDesktop(): void {
    this._desktopService.findOneDesktop(this.getIdDesktop()).subscribe({
      next: (res) => {
        this.desktopData = res.body;
        // Atribui os dados à fonte de dados para a tabela renderizar
        this.dataSource = new MatTableDataSource(res.body!.card);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getIdDesktop(): number {
    const id = this._route.snapshot.paramMap.get('id');
    return Number(id);
  }

  private refrashCloseDialog(dialogRef: any): void {
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getDesktop();
    });
  }
}
