import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss'],
})
export class MemberModalComponent implements OnInit {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService
  ) {}
  ngOnInit(): void {
    this.getMemberCard();
  }

  getMemberCard(): void {
    this._cardData.finOnCard(this.data).subscribe({
      next: (res) => {
        console.log(res);

      }
    });
  }
}
