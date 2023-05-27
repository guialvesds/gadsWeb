import { Component, OnInit, Inject } from '@angular/core';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/services/card.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SuccessactionComponent } from '../successAction/successaction.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-removeaccept',
  templateUrl: './removeaccept.component.html',
  styleUrls: ['./removeaccept.component.scss'],
})
export class RemoveAcceptComponent implements OnInit {
  title: string = '';
  CardData!: Card | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _cardService: CardService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public deleteCard(): void {
    this._cardService.deleteCard(this.data).subscribe({
      next: (res) => {
        this._dialog.closeAll();
      },
      error: (err) => {
        if (err) {
          this._dialog.closeAll();
          this.openErrorDialog();

          setTimeout(() => {
            this._dialog.closeAll();
          }, 3000);
        }
      },
    });
  }

  // Abre modal de erro
  private openErrorDialog(): void {
    this._dialog.open(ErrorComponent, {
      width: '25%',
    });
  }
}
