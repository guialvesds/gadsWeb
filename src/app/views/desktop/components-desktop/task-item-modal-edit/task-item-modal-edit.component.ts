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
  public taskD?: Task;
  public membersInTaskAll!: any;
  public membersInTask!: any;

  public taskEditForm: FormGroup = this._formBuild.group({
    titleTask: new FormControl(this.data ? this.data.title : ''),
    delivery_date: new FormControl(this.data ? this.data.delivery_date : ''),
    memberSelected: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService,
    private _formBuild: FormBuilder
  ) {}
  ngOnInit(): void {
    this.findTask();
    console.log(this.data);
  }

  public addListTask(): void {
    const data: Object = {
      title: this.taskEditForm.value.titleTask,
      delivery_date: this.taskEditForm.value.delivery_date,
      done: this.data.done,
    };
    this._cardData.editTask(this.data.taskId, data).subscribe({
      next: (res) => {
        this.addTaskSucess = true;

        console.log('log enviar tarefa', res);

        if (this.taskEditForm.value.memberSelected.length >=1) {
          setTimeout(() => {
            this.addMemberInTask(res.body.id);
          }, 2000);
        }
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

    console.log(this.taskEditForm);


    this._cardData
      .removeMemberTask(idTask, this.taskEditForm?.value.memberSelected, data)
      .subscribe({
        next: (res) => {
          this.addTaskSucess = true;
        },
        error: (err) => {
          this.addTaskError = true;
          console.error(err);
        },
      });
      this.addTaskSucess = false;
      this.addTaskError = false;
  }

  public searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.taskD = this.membersInTaskAll.filter(
      (item: { primary_name: string; second_name: string; email: string }) => {
        return (
          item.primary_name!.toLowerCase().includes(value) ||
          item.second_name!.toLowerCase().includes(value) ||
          item.email!.toString().includes(value)
        );
      }
    );
  }

  public findTask(): void {
    this._cardData.findTask(this.data.taskId).subscribe({
      next: (res) => {
        this.taskD = res.body;
        this.membersInTaskAll = res.body;
        this.membersInTask = res.body.membersTask;

        console.log('dados', res.body);

      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
