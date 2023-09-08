import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';

import { SidebarModule } from 'primeng/sidebar';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';

import { StepsModule } from 'primeng/steps';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
const primeModules: any = [
  CalendarModule,
  InputTextModule,

  ButtonModule,
  ToolbarModule,
  SidebarModule,
  TableModule,
  ToastModule,

  DialogModule,

  ContextMenuModule,
  DropdownModule,

  // ButtonModule,

  ToastModule,
  InputTextModule,

  TooltipModule,

  ToolbarModule,
  RatingModule,
  RadioButtonModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  InputMaskModule,
  AutoCompleteModule,

  TabViewModule,
  ToggleButtonModule,
  StepsModule,
  PaginatorModule,
  ProgressSpinnerModule,
  MultiSelectModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...primeModules],
  providers: [ConfirmationService, MessageService],
  exports: [...primeModules],
})
export class PrimeNgModule { }
