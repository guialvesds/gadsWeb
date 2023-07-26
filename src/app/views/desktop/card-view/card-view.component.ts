import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/services/card.service';
import { FunctionShare } from 'src/app/share/function-share';

interface Comment {
  author: string;
  date: string;
  content: string;
}
@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
  cardData!: Card | any;

  comments: Comment[] = [
    { author: 'John', date: '2023-07-01', content: 'Great post!' },
    { author: 'Jane', date: '2023-07-02', content: 'Thanks for sharing.' },
    { author: 'Bob', date: '2023-07-03', content: 'I have a question.' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _cardSevice: CardService,
    public _functionShare: FunctionShare
  ) {}

  ngOnInit(): void {
    this.findDesktop();
  }

  // Verifica se o card possui data de entrega
  public verifyDelivery(date: any): string {
    return date.delivery_date ? date.delivery_date : null;
  }

  private findDesktop(): void {
    this._cardSevice.finOnCard(this.data).subscribe({
      next: (res) => {
        console.log(res);

        this.cardData = res.body;
      },
      error: (err) => {},
    });
  }
}
