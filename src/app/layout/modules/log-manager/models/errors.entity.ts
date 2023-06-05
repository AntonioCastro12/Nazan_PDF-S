
export class ResponseErrorsList {
  total: number = 0;
  data: Array<ResponseErrors> = [];
}

export class ResponseErrors {
  level: string = '';
  message: {
    date: Date | string;
    error: {
      ErrorDesc: string;
      ErrorMensaje: string;
      ErrorModulo: string;
      NroTicket: number;
    }
  } = {
      date: '',
      error: {
        ErrorDesc: '',
        ErrorMensaje: '',
        ErrorModulo: '',
        NroTicket: 0,
      }
    }
}

export const ResponseErrorsticketEntityLabels = {
  level: 'Nivel',
  date: 'Fecha',
  ErrorDesc: 'Descripción',
  ErrorMensaje: 'Mensaje',
  ErrorModulo: 'Módulo',
  NroTicket: 'Nro Ticket',
}

