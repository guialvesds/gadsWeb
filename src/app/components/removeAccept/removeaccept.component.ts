import { Component, OnInit, Inject } from '@angular/core';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/services/card.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SuccessactionComponent } from '../successAction/successaction.component';

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

  ngOnInit(): void {
    this.getCard();
  }

  public deleteCard(): void {
    this._cardService.deleteCard(this.CardData.id).subscribe({
      next: (res) => {
        this.dialogAction();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private closeDialog(): void {
    this._dialog.closeAll();
  }

  private openSuccessDialog(): void {
    this._dialog.open(SuccessactionComponent, {
      width: '20%',
    });
  }

  private getCard(): void {
    this._cardService.finOnCard(this.data).subscribe({
      next: (res) => {
        this.CardData = res.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private dialogAction(): void {
    this.closeDialog();

    this.openSuccessDialog();

    setTimeout(() => {
      this.closeDialog();
    }, 3400);
  }
}
