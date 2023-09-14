import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/services/card.service';
import { CommentService } from 'src/app/services/comment.service';
import { FunctionShare } from 'src/app/share/function-share';
import { ModalShare } from 'src/app/share/modal-share';
import { MemberModalComponent } from '../components-desktop/member-modal/member-modal.component';
import { TaskModalComponent } from '../components-desktop/task-modal/task-modal.component';

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
  public panelOpenState: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public _functionShare: FunctionShare,
    private _modalShare: ModalShare,
    private _cardSevice: CardService,
    private _commentCardService: CommentService,
    private _formBuild: FormBuilder,
    private _dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.findCard();
  }

  get title() {
    return this.cardForm.get('title')!;
  }

  public opemMember(event: MouseEvent) {
    this.modalOpen = true;

    const modalData = {
      x: event.clientX,
      y: event.clientY,
      desktopId: this.cardData.desktopId,
      cardId: this.cardData.id,
    };

    const dialogRef = this._dialogRef.open(MemberModalComponent, {
      autoFocus: false,
      data: modalData,
      position: { left: modalData.x + 'px', top: modalData.y + 'px' },
    });

    this.refrashCloseDialog(dialogRef);
  }

  public opemTask(event: MouseEvent) {
    this.modalOpen = true;

    const modalData = {
      x: event.clientX,
      y: event.clientY,
      cardId: this.cardData.id,
    };

    const dialogRef = this._dialogRef.open(TaskModalComponent, {
      autoFocus: false,
      data: modalData,
      position: { left: modalData.x + 'px', top: modalData.y + 'px' },
    });

    this.refrashCloseDialog(dialogRef);
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

  // Deleta um membro do card

  public removeMember(userId: number): void {

    const data: Object = {}

    this._cardSevice.removeMemberCard(this.data, userId, data).subscribe({
      next: (res) => {
        this.findCard();

      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  public openPerfilModal(userId: number): void {

    const data: number = Number(userId);

    this._modalShare.openPerfilModal(data);

  }

  // Busca um card pelo id passado pelo data do modal.
  private findCard(): void {
    this._cardSevice
      .finOnCard(this.data)
      .pipe(
        map((member) => ({
          ...member,
          res: member.body,

        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.cardData = res;
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  // Realiza uma chama em uma determinada função ao fechar o modal.
  private refrashCloseDialog(dialogRef: any): any {
    dialogRef.afterClosed().subscribe((res: any) => {
      this.findCard();
    });
  }
  // Busca os membros do card
  // private getMemberInCard(): void {
  //   this._cardSevice
  //     .finOnCard(this.cardData.id).pipe(map((member) => ({
  //       ...member,
  //       res: member.body!.membersCard,
  //     }))).subscribe({
  //       next: ( {res} ) => {

  //       },
  //       error: (err) => {
  //         console.error(err);

  //       }
  //     });
  // }
}
