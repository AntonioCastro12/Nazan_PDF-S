import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';

import {
  PdfPreciadoApiService,
  PdfPreciadoStateService,
} from '../../services';

import { taGralDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface ExcelData {
  ID: string;
  PRICE: string;
}

@Component({
  selector: 'pdf-preciado-form',
  templateUrl: './pdf-preciado-form.component.html',
  styleUrl: './pdf-preciado-form.component.scss'
})
export class PdfPreciadoFormComponent {


 //variable para accesar a los datos del excel ID-codigoInternet   PRICE-Precio
 rows: ExcelData[] = [ { ID: "Find", PRICE: "Find3" }];


 onFileExcel(event: Event) :void{
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
      if(target.files[0].name.substring(target.files[0].name.lastIndexOf('.'),target.files[0].name.length) != ".xlsx")
        return;
      //this.excel = target.files[0].name;
      this._taGralStateService.state.excel = target.files[0];
  }
  else{
    console.log("Vacio");
  }
}

onProcessingExcel(event: Event):void{
  if(this._taGralStateService.state.excel == null){
    alert("EXCEL VACIO");
    return;
  }
  this.ReadExcel();
}

async ReadExcel(){
  console.log("Reading excel file")
  if(this._taGralStateService.state.excel != null){
    const arrayBuffer = await this._taGralStateService.state.excel.arrayBuffer();
    var workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const lstData = XLSX.utils.sheet_to_json<ExcelData>(worksheet);
    this.rows=lstData;
  }
  console.log("rows: ", this.rows)
}
//******************************************* */


// ********************* PDF
onFilePdf(event: Event) :void{
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
      if(target.files[0].name.substring(target.files[0].name.lastIndexOf('.'),target.files[0].name.length) != ".pdf")
        return;
      this._taGralStateService.state.pdf = target.files[0];
  }
  else{
    console.log("Vacio");
  }
}

onProcessingPDF(event: Event):void{
  if(this._taGralStateService.state.pdf == null){
    alert("PDF VACIO");
    return;
  }
  this.UpdatePDF();
}

async UpdatePDF(){
  console.log("updating pdf file")
if(this._taGralStateService.state.pdf != null){


    const arrayBuffer = await this._taGralStateService.state.pdf.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    for(let f=1; f < this.rows.length; f++)
    {
        console.log("codigoInternet: " + this.rows[f].ID + " - Precio: " + this.rows[f].PRICE);
        const searchWord = this.rows[f].ID.toString();
        const numberToAdd = this.rows[f].PRICE.toString();

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          //console.log(textContent);
          const items = textContent.items.map(item => item as any);
          //const pageText = items.map(item => item.str).join(' ');
          //console.log(pageText);
          for (let i = 0; i < items.length; i++) {
            if (items[i].str.includes(searchWord)) {
              //const { x,f,z, y, width, height } = items[i].transform;
              const x=items[i].transform[0];
              const y=items[i].transform[3];
              const width=items[i].transform[4];
              const height=items[i].transform[5];
              //console.log(items[i].transform);
              const pdfPage = pdfDoc.getPage(pageNum - 1);

              pdfPage.drawText(numberToAdd, {
                x: width +2,
                y: height + 15, // Ajusta esta posición según necesites
                maxWidth:width,
                lineHeight:height,
                size: 12,
                color: rgb(1, 1, 1),
              });
            }
          }
        }
    }
    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    this._taGralStateService.state.modifiedPdfUrl = URL.createObjectURL(blob);
  }
  console.log("Pdf url ")
}
//******************************************* */
// ********************* PROCESAR DATA
onProcessing(event: Event):void{

  if(this._taGralStateService.state.excel == null){
    alert("EXCEL VACIO");
    return;
  }

  if(this._taGralStateService.state.pdf == null){
    alert("PDF VACIO");
    return;
  }

  console.log("Procesando Datos");
  this.ProccessData();
}

ProccessData(){
  this.ReadExcel();
  this.UpdatePDF();

}
//******************************************* */


async onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const searchWord = 'ETIQUETAS'; // El código de internet que deseas buscar
    const numberToAdd = '2345'; // El número que deseas agregar

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const items = textContent.items.map(item => item as any);
      const pageText = items.map(item => item.str).join(' ');

      for (let i = 0; i < items.length; i++) {
        if (items[i].str.includes(searchWord)) {
          const { x, y, width, height } = items[i].transform;
          const pdfPage = pdfDoc.getPage(pageNum - 1);

          pdfPage.drawText(numberToAdd, {
            x: x,
            y: y + 10, // Ajusta esta posición según necesites
            size: 38,
            color: rgb(1, 0, 0),
          });
        }
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    this._taGralStateService.state.modifiedPdfUrl = URL.createObjectURL(blob);
  }
}





  /**
   * datos para funcionamiento de lectura de excel y pdf
   */

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taGralStateService: PdfPreciadoStateService,
    public _taServiceApi: PdfPreciadoApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  value = "";

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  buscar() {
  }


  onReset() {
    this.onFillForm();
  }

}
