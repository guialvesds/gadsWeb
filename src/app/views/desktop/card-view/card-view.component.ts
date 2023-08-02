import { Desktop } from './../../../models/Desktop.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
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

  public cardData!: Card | any;
  public description: boolean = false;
  public cancelEditDescription: boolean = true;

  public cardForm: FormGroup = this._formBuild.group({
    description: new FormControl(''),
  });

  comments: Comment[] = [
    { author: 'John', date: '2023-07-01', content: 'Great post!' },
    { author: 'Jane', date: '2023-07-02', content: 'Thanks for sharing.' },
    { author: 'Bob', date: '2023-07-03', content: 'I have a question.' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public _functionShare: FunctionShare,
    private _cardSevice: CardService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findCard();

  }

   public editMode() {
    this.description = !this.description;

    if (this.description) {
          // Se a descrição for verdadeira, atualiza o valor do campo description com o valor do <p>
          this.cardForm.patchValue({
            description: this.cardData.description
          });
        }
  }

  // public editMode() {
  //   this.description = !this.description;

  //   if (this.description) {
  //     // Se a descrição for verdadeira, atualiza o valor do campo description com o valor do <p>
  //     this.cardForm.patchValue({
  //       description: this.cardData.description
  //     });
  //   }
  // }

  // public editDescription(): boolean {
  //   return this.description = false;
  // }

  // Edita a descrição do card.
  public patchDescription(): void {
    this._cardSevice
      .updateCard(this.cardData.id, this.cardForm.value)
      .subscribe({
        next: (res) => {
          this.findCard();
          this.description = true;
          this.editMode();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Verifica se o card possui data de entrega
  public verifyDelivery(date: any): string {
    return date.delivery_date ? date.delivery_date : null;
  }

  // Busca um card pelo id passado pelo data do modal.
  private findCard(): void {
    this._cardSevice.finOnCard(this.data).subscribe({
      next: (res) => {
        console.log(res);

        this.cardData = res.body;
      },
      error: (err) => {},
    });
  }
}
