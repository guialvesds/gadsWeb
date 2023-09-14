import { Component, Inject } from '@angular/core';
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
export class TaskItemModalComponent {

  public addTaskSucess: boolean = false;
  public addTaskError: boolean = false;
  public taksData!: any;
  public taksAllData!: any;
  public membersInCard!: any;


  public taskForm: FormGroup = this._formBuild.group({
    title: new FormControl('Lista de tarefas titúlo', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService,
    private _formBuild: FormBuilder
  ) {}

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
          res: member.body!.membersCard,
        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.membersInCard = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

}
