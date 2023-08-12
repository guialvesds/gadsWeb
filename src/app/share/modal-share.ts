import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsFormsComponent } from '../views/desktop/components-desktop/settings-forms/settings-forms.component';
import { CardFormComponent } from '../views/desktop/components-desktop/card-form/card-form.component';
import { ErrorComponent } from '../components/error/error.component';
import { SuccessactionComponent } from '../components/successAction/successaction.component';
import { CardViewComponent } from '../views/desktop/card-view/card-view.component';
import { RemoveAcceptComponent } from '../components/removeAccept/removeaccept.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MemberModalComponent } from '../views/desktop/components-desktop/member-modal/member-modal.component';

@Injectable()
export class ModalShare {
  constructor(private _dialogRef: MatDialog) {}

  //Modal de sucesso
  public openSuccess(): void {
    this._dialogRef.open(SuccessactionComponent, {
      width: '25%',
    });
  }

  //Modal de erro
  public openError(): void {
    this._dialogRef.open(ErrorComponent, {
      width: '25%',
    });
  }

  //Modal de visualização do card
  public openCardView(data: number): DialogRef | any {
    return this._dialogRef.open(CardViewComponent, {
      data: data,
      width: '60%',
      height: '90%'
    });
  }

  //Modal para novo card
  public newCard(data: number): DialogRef | any {
    return this._dialogRef.open(CardFormComponent, {
      data: data,
    });
  }

  //Modal para excluir um card
  public deleteCard(data: number): DialogRef | any {
    return this._dialogRef.open(RemoveAcceptComponent, {
      data: data,
    });
  }

  //Modal para configurações do desktop
  public desktopSettings(data: number): void {
    const dialogRef = this._dialogRef.open(SettingsFormsComponent, {
      data: data,
      width: '60%',
    });
  }

   //Modal para Member
   public member(x: number, y: number) {
    const dialogRef = this._dialogRef.open(MemberModalComponent, {
      autoFocus: false,
      position: { left: x + 'px', top: y + 'px' },
    });
  }
}
