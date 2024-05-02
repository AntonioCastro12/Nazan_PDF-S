import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListByFieldBefore',
})
export class FilterListByFieldBeforePipe implements PipeTransform {
  transform(arrayBefore: any[], searchText: string): any[] {
    // || searchText.length < 3
    if (searchText === '') {
      return arrayBefore;
    }

    return arrayBefore.filter((item) => {
      const validOrder =
        item.Order_Id &&
        item.Order_Id.toLowerCase().includes(searchText.toLowerCase());
      const validDate =
        item.Order_Date &&
        item.Order_Date.toLowerCase().includes(searchText.toLowerCase());
      const validDays =
        item.dias_espera &&
        item.dias_espera.toLowerCase().includes(searchText.toLowerCase());
      return validOrder || validDate || validDays;
    });

    return [];
  }
}
