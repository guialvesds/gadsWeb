import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Desktop } from 'src/app/models/Desktop.model';
import { DesktopService } from 'src/app/services/desktop.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalShare } from 'src/app/share/modal-share';

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
    private _modalShare: ModalShare
  ) {}

  ngOnInit(): void {
    this.getDesktop();
  }
  // Modal para abrir a visualização do card
  public openCardView(id: number): void {
    this._modalShare.openCardView(id);
  }
  // Modal para excluir um card
  public deleteCard(id: number): void {
    const dialogRef = this._modalShare.deleteCard(id);
    this.refrashCloseDialog(dialogRef);
  }
  // Modal para criar um novo card
  public newCard(): void {
    const dialogRef = this._modalShare.newCard(this.desktopData.id);
    this.refrashCloseDialog(dialogRef);
  }
  // Modal para configurações do card
  public desktopSettings(): void {
    const dialogRef = this._modalShare.desktopSettings(this.desktopData.id);
    this.refrashCloseDialog(dialogRef);
  }

  // Filtro de busca
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Verifica se o card possui data de entrega
  public verifyDelivery(row: any): string {
    return row.delivery_date ? row.delivery_date : '';
  }

  // Organiza data em string DD/MM/AAAA
  public modifyDate(row: string): string {
    return row.toLocaleString().substring(0, 10).split('-').reverse().join('/');
  }

  // Busca as informações do desktop
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

  // Busca o ID desktop pelo paramento enviado pelo routerLink
  private getIdDesktop(): number {
    const id = this._route.snapshot.paramMap.get('id');
    return Number(id);
  }

  // Executa a função de busca de itens do desktop
  private refrashCloseDialog(dialogRef: any): void {
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getDesktop();
    });
  }

  // Valida cor pelo tempo que falta para chegar na data de entrega {
  public refDateColor(c: any) {
    if (this.validRed(this.getDiffDate(c))) {
      const color = '#e46666';
      return color;
    }
    if (this.validOrange(this.getDiffDate(c))) {
      const color = '#e9be6d';
      return color;
    }
    if (this.validGray(this.getDiffDate(c))) {
      const color = 'gray';
      return color;
    } else if (this.validGreen(this.getDiffDate(c))) {
      const color = '#7dc58d';
      return color;
    }
    return c;
  }

  private validRed(diffDays: number): boolean {
    return diffDays <= 2 && diffDays >= 0;
  }
  private validOrange(diffDays: number): boolean {
    return diffDays >= 3 && diffDays <= 5;
  }
  private validGreen(diffDays: number): boolean {
    return diffDays >= 6;
  }
  private validGray(diffDays: number): boolean {
    return diffDays < 0;
  }

  private getDiffDate(c: any): number {
    const endDate: any = new Date(c.delivery_date);
    const iniDate: any = new Date();

    const diffTime = endDate - iniDate;
    const timeDay = 1000 * 60 * 60 * 24; // milesegundos * segundos * horas dia
    const diffDays = Math.ceil(diffTime / timeDay);

    return diffDays;
  }
  //  } função finaliza aqui
}
