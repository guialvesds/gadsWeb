import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.scss'],
})
export class FileModalComponent {
  uploadFile: boolean = false;
  uploadFileSuccess: boolean = false;
  uploadFileError: boolean = false;
  fileImageExample: string = '../../../../../assets/icon-file1.png'
  typeFile: string = '';



  selectedFile!: File | null ;
  previewUrl: string | ArrayBuffer | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardData: CardService
  ) {}

  ngOnInit(): void {
    console.log(this.data);

  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      console.log('dados do arquivo', this.selectedFile);

      this.typeFile = this.selectedFile.type

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  public unsetImage(): void {
    this.selectedFile = null;
    this.previewUrl = '';
  }

  public addFile(): void {
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    const dados = new FormData();
    dados.append('arquivo', this.selectedFile);

    this.uploadFile = true;

    this._cardData.addFile(this.data.cardId, dados).subscribe({
      next: (res) => {
        this.uploadFile = false;
        this.unsetImage();

        this.uploadFileSuccess = true;

        setTimeout(()=> {
          this.uploadFileSuccess = false;
        }, 3000);
      },
      error: (err) => {
        this.uploadFile = false;
        console.error(err);
        this.uploadFileError = true;

        setTimeout(()=> {
          this.uploadFileError = false;
        }, 3000);
      }
    });
  }

}
