import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  public addTaskSucess: boolean = false;
  public addTaskError: boolean = false;

  public listTaskForm: FormGroup = this._formBuild.group({
    title: new FormControl('Lista de tarefas titúlo', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService,
    private _formBuild: FormBuilder
  ) {}

  public addListTask(): void {

    const data: Object = {
      title: this.listTaskForm.value.title,
    }
    this._cardData
      .addTaskCard(this.data.cardId, data)
      .subscribe({
        next: (res) => {
          this.addTaskSucess = true;

          setTimeout(()=> {

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
}
