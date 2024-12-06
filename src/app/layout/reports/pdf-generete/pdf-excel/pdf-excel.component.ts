import { Component } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
const pdfjsLib = require('pdfjs-dist');
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pdf-excel',
  templateUrl: './pdf-excel.component.html',
  styleUrls: ['./pdf-excel.component.css']
})
export class PdfExcelComponent {
  data: any[] = [];
  displayedColumns = ['CODIGO_INTERNET', 'PRECIO_CALCULADO'];

  private pdfDoc: PDFDocument | null = null;
  private pdfjsDoc: any = null;

  // Variables para la barra de progreso
  isDownloading = false;
  downloadProgress = 0;

  constructor() {
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
  }

  // ngOnInit(){
  //   alert('INGRESA')
  // }

  async findWordAndModifyPDF(pdfDoc: PDFDocument, pdfjsDoc: any, searchWord: string, newText: string) {
    let foundCoords: any = null;

    for (let i = 0; i < pdfjsDoc.numPages; i++) {
      const page = await pdfjsDoc.getPage(i + 1);
      const textContent = await page.getTextContent();

      textContent.items.forEach((item: any) => {
        if (item.str.includes(searchWord)) {
          foundCoords = { x: item.transform[4], y: item.transform[5], page: i + 1 };
          console.log(`Palabra encontrada en la página ${i + 1} en x: ${foundCoords.x}, y: ${foundCoords.y}`);
        }
      });

      if (foundCoords) break;
    }

    if (foundCoords) {
      const page = pdfDoc.getPage(foundCoords.page - 1);

      const textWithDollarSign = '$' + newText.toString();
      page.drawText(textWithDollarSign.toString(), {
        x: foundCoords.x + 30,
        y: foundCoords.y - 70,
        size: 18
      });
    } else {
      console.log(`Palabra "${searchWord}" no encontrada.`);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();

      const uint8Array = new Uint8Array(arrayBuffer);
      this.pdfjsDoc = await pdfjsLib.getDocument({ data: uint8Array }).promise;

      this.pdfDoc = await PDFDocument.load(arrayBuffer);
    }
  }

  async downloadPDF() {
    if (!this.pdfDoc || !this.pdfjsDoc) {
      console.log("El documento PDF no está cargado.");
      return;
    }

    this.isDownloading = true;
    this.downloadProgress = 0;

    const totalItems = this.data.length;

    for (let i = 0; i < totalItems; i++) {
      const row = this.data[i];
      const searchWord = row.CODIGO_INTERNET;
      const newText = row.PRECIO_CALCULADO;

      await this.findWordAndModifyPDF(this.pdfDoc, this.pdfjsDoc, searchWord, newText);

      // Actualizar progreso
      this.downloadProgress = Math.floor(((i + 1) / totalItems) * 100);
    }

    // Guardar y descargar el PDF modificado
    const modifiedPdfBytes = await this.pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'modified.pdf');

    // Resetear estado de descarga
    this.isDownloading = false;
    this.downloadProgress = 0;
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('No se puede usar varios archivos');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryData: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryData, { type: 'binary' });

      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      jsonData.shift();

      this.data = jsonData.map((row: any) => ({
        CODIGO_INTERNET: row[0],
        PRECIO_CALCULADO: row[4],
      }));
    };
    reader.readAsBinaryString(target.files[0]);
  }
}










