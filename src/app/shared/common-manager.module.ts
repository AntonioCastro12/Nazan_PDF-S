import { NgModule } from '@angular/core';
import { filterListByFieldPipe } from './pipes';
import { filterListByFieldDaysPipe } from './pipes/filter-list-by-field-days.pipe';

@NgModule({
  declarations: [filterListByFieldPipe, filterListByFieldDaysPipe],
  imports: [],
  exports: [filterListByFieldPipe, filterListByFieldDaysPipe],
})
export class CommonManagerModule {}
