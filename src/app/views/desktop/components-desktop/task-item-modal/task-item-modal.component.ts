import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Card } from 'src/app/models/Card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-task-item-modal',
  templateUrl: './task-item-modal.component.html',
  styleUrls: ['./task-item-modal.component.scss']
})
export class TaskItemModalComponent implements OnInit {

  public addTaskSucess: boolean = false;
  public addTaskError: boolean = false;
  public taksData!: any;
  public taksAllData!: any;
  public membersInCard!: any;
  private membersInTask!: any;


  public taskForm: FormGroup = this._formBuild.group({
    title: new FormControl('', [Validators.required]),
    delivery_date: new FormControl(''),
    memberSelected: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMemberInCard();
    console.log('dados recebido na abertura do modal de task', this.data);

  }

  // Impedir que sábado e domingo sejam selecionados.
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Impedir que sábado e domingo sejam selecionados.
  //   return day !== 0 && day !== 6;
  // };

  public addListTask(): void {

    const data: Object = {
      title: this.taskForm.value.title,
      delivery_date: this.taskForm.value.delivery_date,
      done: false,
    }
    this._cardData
      .addTaskCard(this.data.listId, data)
      .subscribe({
        next: (res) => {
          this.addTaskSucess = true;

          console.log('log enviar tarefa', res);

          setTimeout(()=> {
            this.addMemberInTask(res.body.id)
          },2000);

        },
        error: (err) => {
          this.addTaskError = true;
          console.error(err);

        },
      });

    this.addTaskSucess = false;
    this.addTaskError = false;
  }

  public addMemberInTask(idTask:  number): void {

    const data = {};

    this._cardData.addMembersTaskCard(idTask, this.taskForm.value.memberSelected, data).subscribe({
      next: (res) => {
        this.addTaskSucess = true;

        console.log('log enviar tarefa', res);


        setTimeout(()=> {

        },2000);


      },
      error: (err) => {
        this.addTaskError = true;
        console.error(err);
      },
    });

  }

  public searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.taksData = this.taksAllData.filter(
      (item: { primary_name: string; second_name: string; email: string }) => {
        return (
          item.primary_name!.toLowerCase().includes(value) ||
          item.second_name!.toLowerCase().includes(value) ||
          item.email!.toString().includes(value)
        );
      }
    );
  }

  public verifyMemberInCard(id: any): boolean {
    const idMembersInCard = this.membersInCard.map((item: { id: any }) => item.id);

    if (idMembersInCard.includes(id)) {
      return true;
    }

    return false;
  }

  public send(): void {

  }

  private getMemberInCard(): void {
    this._cardData
      .finOnCard(this.data.cardId)
      .pipe(
        map((member) => ({
          ...member,
          res: member.body,
        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.membersInCard = res!.membersCard;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

}
