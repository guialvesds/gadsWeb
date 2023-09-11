import { Component, Input, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { DesktopService } from 'src/app/services/desktop.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss'],
})
export class MemberModalComponent implements OnInit {
  public typesOfShoes!: any;
  public typeOfShoesAll!: any;
  public addMmeberSucess: boolean = false;
  public addMmeberError: boolean = false;
  public membersInCard!: any;

  public memberForm: FormGroup = this._formBuild.group({
    memberSelected: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: DesktopService,
    private _cardDataMember: CardService,
    private _formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMemberCard();
    this.getMemberInCard();
  }

  public searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.typesOfShoes = this.typeOfShoesAll.filter(
      (item: { primary_name: string; second_name: string; email: string }) => {
        return (
          item.primary_name!.toLowerCase().includes(value) ||
          item.second_name!.toLowerCase().includes(value) ||
          item.email!.toString().includes(value)
        );
      }
    );
  }

  private getMemberCard(): void {
    this._cardData
      .findOneDesktop(this.data.desktopId)
      .pipe(
        map((member) => ({
          ...member,
          res: member.body!.membersDesktop,
        }))
      )
      .subscribe({
        next: ({ res }) => {
          this.typesOfShoes = res;
          this.typeOfShoesAll = res;
        },
      });
  }

  private getMemberInCard(): void {
    this._cardDataMember
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

  public addMember(): void {
    const data: any = '';

    this._cardDataMember
      .addMemberCard(
        this.data.cardId,
        this.memberForm.value.memberSelected,
        data
      )
      .subscribe({
        next: (res) => {
          this.addMmeberSucess = true;
        },
        error: (err) => {
          this.addMmeberError = true;
        },
      });
    this.addMmeberSucess = false;
    this.addMmeberError = false;
  }

  public verifyMemberInCard(id: any): boolean {
    const idMembersInCard = this.membersInCard.map((item: { id: any }) => item.id);

    if (idMembersInCard.includes(id)) {
      return true;
    }

    return false;
  }
}
