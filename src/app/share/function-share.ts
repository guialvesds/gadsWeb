import { Injectable } from '@angular/core';

@Injectable()
export class FunctionShare {
  constructor() {}

  // Valida cor pelo tempo que falta para chegar na data de entrega {
  public refDateColor(c: any) {
    if (this.validRed(this.getDiffDate(c))) {
      const color = '#e46666';
      return color;
    }
    if (this.validOrange(this.getDiffDate(c))) {
      const color = '#e9be6d';
      return color;
    }
    if (this.validGray(this.getDiffDate(c))) {
      const color = 'gray';
      return color;
    } else if (this.validGreen(this.getDiffDate(c))) {
      const color = '#7dc58d';
      return color;
    }
    return c;
  }

  public validRed(diffDays: number): boolean {
    return diffDays <= 2 && diffDays >= 0;
  }
  public validOrange(diffDays: number): boolean {
    return diffDays >= 3 && diffDays <= 5;
  }
  public validGreen(diffDays: number): boolean {
    return diffDays >= 6;
  }
  public validGray(diffDays: number): boolean {
    return diffDays < 0;
  }

  public getDiffDate(c: any): number {
    const endDate: any = new Date(c.delivery_date);
    const iniDate: any = new Date();

    const diffTime = endDate - iniDate;
    const timeDay = 1000 * 60 * 60 * 24; // milesegundos * segundos * horas dia
    const diffDays = Math.ceil(diffTime / timeDay);

    return diffDays;
  }
  //  } função finaliza aqui

  // Organiza data em string 00/AAA/00
  public modifyDateString(date: string): string {
    const day = date.substring(8, 10);
    const mounth = date.substring(5, 7);
    const year = date.substring(2, 4);

    let fullDate: string = '';

    switch (mounth) {
      case '01':
        fullDate = `${day} /Jan /${year}`;
        break;
      case '02':
        fullDate = `${day} /Fev /${year}`;
        break;
      case '03':
        fullDate = `${day} /Mar /${year}`;
        break;
      case '04':
        fullDate = `${day} /Abr /${year}`;
        break;
      case '05':
        fullDate = `${day} /Mai /${year}`;
        break;
      case '06':
        fullDate = `${day} /Jun /${year}`;
        break;
      case '07':
        fullDate = `${day} /Jul /${year}`;
        break;
      case '08':
        fullDate = `${day} /Ago /${year}`;
        break;
      case '09':
        fullDate = `${day} /Set /${year}`;
        break;
      case '10':
        fullDate = `${day} /Out /${year}`;
        break;
      case '11':
        fullDate = `${day} /Nov /${year}`;
        break;
      case '12':
        fullDate = `${day} /Dez /${year}`;
        break;
    }
    return fullDate;
  }
}
