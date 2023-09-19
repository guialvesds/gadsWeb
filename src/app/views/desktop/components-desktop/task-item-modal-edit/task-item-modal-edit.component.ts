import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Task } from 'src/app/models/Task.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-task-item-modal-edit',
  templateUrl: './task-item-modal-edit.component.html',
  styleUrls: ['./task-item-modal-edit.component.scss'],
})
export class TaskItemModalEditComponent implements OnInit {
  public addTaskSucess: boolean = false;
  public addTaskError: boolean = false;
  public taksData!: Task;
  public taksAllData!: any;
  public membersInTask!: any;

  public taskEditForm: FormGroup = this._formBuild.group({
    titleTask: new FormControl(this.taksData ? this.taksData.title : '', [Validators.required]),
    delivery_date: new FormControl( this.taksData ? this.taksData.delivery_date : ''),
    memberSelected: new FormControl(''),
  });;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTask();
  }

  public addListTask(): void {
    const data: Object = {
      title: this.taskEditForm?.value.titleTask,
      delivery_date: this.taskEditForm?.value.delivery_date,
      done: false,
    };
    this._cardData.addTaskCard(this.data.listId, data).subscribe({
      next: (res) => {
        this.addTaskSucess = true;

        console.log('log enviar tarefa', res);

        setTimeout(() => {
          this.addMemberInTask(res.body.id);
        }, 2000);
      },
      error: (err) => {
        this.addTaskError = true;
        console.error(err);
      },
    });

    this.addTaskSucess = false;
    this.addTaskError = false;
  }

  public addMemberInTask(idTask: number): void {
    const data = {};

    this._cardData
      .addMembersTaskCard(idTask, this.taskEditForm?.value.memberSelected, data)
      .subscribe({
        next: (res) => {
          this.addTaskSucess = true;

          console.log('log enviar tarefa', res);

          setTimeout(() => {}, 2000);
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

  public getTask(): void {
    this._cardData
      .findTask(this.data.taskId)
      .pipe(
        map((data) => ({
          ...data,
          res: data.body,
        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.taksData = res;
          this.taksAllData = res;
          this.membersInTask = res?.membersTask;
          console.log(this.taksData);
          this.taskEditForm.value.titleTask = res.title
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
