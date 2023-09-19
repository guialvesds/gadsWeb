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
import { TaskItemModalComponent } from '../components-desktop/task-item-modal/task-item-modal.component';
import { TaskItemModalEditComponent } from '../components-desktop/task-item-modal-edit/task-item-modal-edit.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
  public cardData?: Card | any;
  public description: boolean = false;
  public cancelEditDescription: boolean = true;
  public taksInCad?: Card['listTask'];

  public cardForm: FormGroup = this._formBuild.group({
    description: new FormControl(''),
    commentCard: new FormControl(''),
    done: new FormControl(''),
  });

  public modalOpen: boolean = false;
  public panelOpenState: boolean = true;

  public TaskItemModalComponent: any = TaskItemModalComponent;
  public TaskModalComponent: any = TaskModalComponent;

  public progress?: any;

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
      desktopId: this.cardData?.desktopId,
      cardId: this.cardData?.id,
    };

    const dialogRef = this._dialogRef.open(MemberModalComponent, {
      autoFocus: false,
      data: modalData,
      position: { left: modalData.x + 'px', top: modalData.y + 'px' },
    });

    this.refrashCloseDialog(dialogRef);
  }

  public opemTask(event: MouseEvent, modal: any) {
    this.modalOpen = true;

    const modalData = {
      x: event.clientX,
      y: event.clientY,
      cardId: this.cardData?.id,
    };

    const dialogRef = this._dialogRef.open(modal, {
      autoFocus: false,
      data: modalData,
      position: { left: modalData.x + 'px', top: modalData.y + 'px' },
    });

    this.refrashCloseDialog(dialogRef);
  }

  public opemTaskItem(idList: number): void {
    const data = {
      cardId: this.cardData.id,
      listId: idList,
    }
    const dialogRef = this._dialogRef.open(TaskItemModalComponent, {
      data: data,
      position: { left: '40%', top: '5%' },
    });

    this.refrashCloseDialog(dialogRef);
  }

  public opemTaskModalEdit(idTask: number, titleTask: string, deliveryTask: string, doneTask: boolean): void {
    const data = {
      cardId: this.cardData.id,
      taskId: idTask,
      title: titleTask,
      delivery_date: deliveryTask,
      done: doneTask,
    }
    const dialogRef = this._dialogRef.open(TaskItemModalEditComponent, {
      data: data,
      position: { left: '40%', top: '5%' },
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
    const data: Object = {};

    this._cardSevice.removeMemberCard(this.data, userId, data).subscribe({
      next: (res) => {
        this.findCard();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public openPerfilModal(userId: number): void {
    const data: number = Number(userId);

    this._modalShare.openPerfilModal(data);
  }

  public removeList(idList: number) : void {
    this._cardSevice.removeListCard(idList).subscribe({
      next: (res) => {
        this.findCard();
      }, error: (err) => {
        console.error(err.message);

      }
    });
  }

  public removeTask(idTask: number) : void {
    this._cardSevice.removeTaskCard(idTask).subscribe({
      next: (res) => {
        this.findCard();
      }, error: (err) => {
        console.error(err.message);

      }
    });
  }

  public progreesBar(dados: any): any {
    const total = dados.length;
    const completed = dados.reduce(
      (done: number, task: { done: any }) =>
        (done += Number(task.done)),
      0
    );
   return this.progress = completed / total * 100;
    console.log(total, completed, this.progress);
  }

  public doneTask(idTask: number, done: boolean): void {

    const data = {
      done: true
    }

    if(done === true){
      data.done = false
    } else {
      data.done = true
    }

    this._cardSevice.editTask(idTask, data).subscribe({
      next: () => {
        this.findCard();
      },
      error: (err) => {
        console.error(err.message);

      }
    });

    console.log('form', this.cardForm);

  }

  // Organiza data em string 00/AAA/00
  public modifyDateString(date: string): string {
    const day = date.substring(8, 10);
    const mounth = date.substring(5, 7);
    const year = date.substring(2, 4);

    let fullDate: string = ` ${day} /${mounth} /${year}`;

    const str: string = fullDate.toString();

    return str;

  }

  // Busca um card pelo id passado pelo data do modal.
  private findCard(): void {
    this._cardSevice
      .finOnCard(this.data)
      .pipe(
        map((data) => ({
          ...data,
          res: data.body,
        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.cardData = res!;
          this.taksInCad = res!.listTask;
          console.log('resposta do card', res);
          console.log('resposta do card com task', this.taksInCad);
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
