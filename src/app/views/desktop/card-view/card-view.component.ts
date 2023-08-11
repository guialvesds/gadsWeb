import { ErrorComponent } from 'src/app/components/error/error.component';
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
import { CommentService } from 'src/app/services/comment.service';
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
    commentCard: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public _functionShare: FunctionShare,
    private _cardSevice: CardService,
    private _commentCardService: CommentService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findCard();
  }

  public deleteCommentCard(idComment: number): void {
    this._commentCardService
      .deleteCommentCard(idComment)
      .subscribe({
        next: (res) => {
          console.log('deu certo', res);
          this.findCard();
        },
        error: (err) => {
          console.log('deu certo', err);
        },
      });
  }

  public createCommentCard(): void {
    const data: any = {
      comment_text: this.cardForm.value.commentCard,
    };

    this._commentCardService
      .createCommentCard(this.cardData.id, data)
      .subscribe({
        next: (res) => {
          console.log('deu certo', res);
          this.findCard();
        },
        error: (err) => {
          console.log('deu certo', err);
        },
      });
  }

  public comparUser(userComment: any): boolean {
    const idUSerLogged = localStorage.getItem('accus');
    const idUSerComment = userComment;

    if (idUSerLogged === idUSerComment) {
      return true;
    }

    return false;
  }

  public editMode() {
    this.description = !this.description;

    if (this.description) {
      // Se a descrição for verdadeira, atualiza o valor do campo description com o valor do <p>
      this.cardForm.value.description.patchValue({
        description: this.cardData.description,
      });
    }
  }

  // Edita a descrição do card.
  public patchDescription(): void {
    this._cardSevice
      .updateCard(this.cardData.id, this.cardForm.value.description)
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
