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
import { ModalShare } from 'src/app/share/modal-share';

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

  public modalOpen: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public _functionShare: FunctionShare,
    private _modalShare: ModalShare,
    private _cardSevice: CardService,
    private _commentCardService: CommentService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findCard();
  }

  get title() {
    return this.cardForm.get('title')!;
  }

  public opemMember(event: MouseEvent,) {
    this.modalOpen = true;

    // Obtenha as coordenadas do clique do mouse
    const x = event.clientX;
    const y = event.clientY;

    this._modalShare.member(x, y, this.cardData.id);
  }

  public deleteCommentCard(idComment: number): void {
    this._commentCardService.deleteCommentCard(idComment).subscribe({
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
    const data: object = {
      comment_text: this.cardForm.value.commentCard,
    };

    this._commentCardService
      .createCommentCard(this.cardData.id, data)
      .subscribe({
        next: (res) => {
          console.log('deu certo', res);
          this.cardForm.reset();
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

    return idUSerLogged == idUSerComment ? true : false;
  }

  // Edita a descrição do card.
  public patchDescription(): void {
    const data: object = {
      description: this.cardForm.value.description,
    };

    this._cardSevice.updateCard(this.cardData.id, data).subscribe({
      next: (res) => {
        this.findCard();
        this.description = true;
        this.editMode();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public editMode() {
    this.description = !this.description;

    if (this.description) {
      // Se a descrição for verdadeira, atualiza o valor do campo description com o valor do <span>
      this.cardForm.patchValue({
        description: this.cardData.description,
      });
    }
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
      error: (err) => {
        console.error(err);
      },
    });
  }
}
