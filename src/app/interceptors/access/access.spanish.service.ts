import { Injectable } from '@angular/core';
import { HttpErrorModel } from '@shared/models';
import { errorListHttp } from '../errors';

@Injectable({
  providedIn: 'root',
})
export class AccessSpanishService {
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }

  /***************************************************
   * TRANSLATE TO SPANISH ERROR MESSAGES
   */

  httpErrorToSpanish(error?: string | number | null): string {
    let result: HttpErrorModel = {
      errorCode: 0,
      errorName: 'Unknown',
      errorSpanishTranslation:
        'Error desconocido. Revise la conexion con el servidor',
      errorDef:
        'Error que no se puede traducir o el servidor está desconectado',
    };

    const translation: HttpErrorModel[] = errorListHttp.filter(
      (x: HttpErrorModel) => {
        return x.errorCode === error ? x : null;
      }
    );

    translation[0] ? (result = translation[0]) : result;

    return this.stateTemp.currentControl.currentLanguage === 'es'
      ? (result.errorSpanishTranslation as string)
      : '';
  }
}
