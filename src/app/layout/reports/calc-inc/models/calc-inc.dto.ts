import { identifierName } from '@angular/compiler';

export class taGralDTO {
  storeId: string = '';
  startDate: string='';
  endDate: string ='';
}

export class predeterminadoDTO{
  catalogos:string='';
  incremento: string [] = [];
}

export class perGeneralDTO{
  catalogos:string='';
  gralBase: string = '';
  gralSocio: string = '';

}

export class perDiferenciadoDTO{
  catalogos:string='';
  //diferenciado importado
  diBase: string ='';
  diSocio: string = '';

  //Diferenciado nacional
  dnBase: string = '';
  dnSocio: string = '';
}