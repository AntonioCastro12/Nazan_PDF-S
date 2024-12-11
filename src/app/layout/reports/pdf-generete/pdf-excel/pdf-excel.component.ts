import { Component, ElementRef, ViewChild } from '@angular/core';
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
  public data: any[] = [];
  public displayedColumns = [
    'CODIGO_INTERNET',
    'Diez',
    'Veinte',
    'Treinta',
    'Cuarenta',
    'Cincuenta',
    'Sesenta',
    'Setenta',
    // 'Predeterminado',
    // 'NI',
    // 'Encontrado'
  ];
  public selectedColumn: string = '';
  public pdfDoc: PDFDocument | null = null;
  public pdfjsDoc: any = null;
  public isDownloading: boolean = false;
  public downloadProgress: number = 0;
  public manualPositions: { [key: string]: { x: number; y: number; page: number; price: number } } = {};
  public positionedPrices: { [page: number]: { x: number; y: number }[] } = {};
  public selectedCells: { x: number; y: number; page: number }[] = [];
  public currentPage: number = 1;

  @ViewChild('pdfCanvas', { static: false }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;
  }

  selectColumn(column: string) {
    this.selectedColumn = column;
    console.log(`Columna seleccionada: ${column}`);
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfjsDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Renderizar la página PDF
    await page.render({ canvasContext: context, viewport }).promise;

    // Dibujar la cuadrícula
    this.drawGrid(context, canvas.width, canvas.height, 50);

    // Resaltar las celdas seleccionadas
    this.renderHighlightedCells(context, canvas.height, 50);
  }

  drawGrid(context: CanvasRenderingContext2D, width: number, height: number, cellSize: number) {
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    for (let x = 0; x < width; x += cellSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += cellSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }

  renderHighlightedCells(context: CanvasRenderingContext2D, canvasHeight: number, cellSize: number) {
    this.selectedCells
      .filter((cell) => cell.page === this.currentPage)
      .forEach((cell) => {
        context.fillStyle = 'rgba(0, 255, 0, 1)';
        context.fillRect(cell.x, canvasHeight - cell.y - cellSize, cellSize, cellSize);
      });
  }

  onCanvasClick(event: MouseEvent) {
    const rect = this.pdfCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = this.pdfCanvas.nativeElement.height - (event.clientY - rect.top);

    // Ajustar posición a la cuadrícula
    const cellSize = 50;
    const snappedX = Math.floor(x / cellSize) * cellSize;
    const snappedY = Math.floor(y / cellSize) * cellSize;

    const codigo = this.selectedColumn;
    const price = this.data.find((row) => row['CODIGO_INTERNET'] === codigo)?.[this.selectedColumn] || 0;

    if (codigo) {
      this.manualPositions[codigo] = { x: snappedX, y: snappedY, page: this.currentPage, price };
      this.positionPrice(this.currentPage, snappedX, snappedY, codigo);
      this.selectedCells.push({ x: snappedX, y: snappedY, page: this.currentPage });

      // Volver a renderizar la página con celdas resaltadas
      this.renderPage(this.currentPage);
      console.log(`Posición manual guardada: ${codigo} en x=${snappedX}, y=${snappedY}, página=${this.currentPage}`);
    }
  }

  positionPrice(page: number, x: number, y: number, codigo: string) {
    if (!this.positionedPrices[page]) {
      this.positionedPrices[page] = [];
    }
    this.positionedPrices[page].push({ x, y });

    // Actualizar estado "Encontrado"
    const rowIndex = this.data.findIndex((row) => row['CODIGO_INTERNET'] === codigo);
    if (rowIndex !== -1) {
      this.data[rowIndex].Encontrado = true;
    }
    console.log(`Precio posicionado para ${codigo} en página ${page}, x=${x}, y=${y}`);
  }

  isPositionOccupied(page: number, x: number, y: number, tolerance = 10): boolean {
    if (!this.positionedPrices[page]) return false;
    return this.positionedPrices[page].some(
      (pos) => Math.abs(pos.x - x) < tolerance && Math.abs(pos.y - y) < tolerance
    );
  }

  async drawPrices(
    pdfDoc: PDFDocument,
    foundCoords: any,
    valores: number[],
    config: { margenX: number; margenY: number; espacioEntreLineas: number; tamanioFuente: number }
  ) {
    const page = pdfDoc.getPage(foundCoords.page - 1);
    let yOffset = config.margenY;

    valores.forEach((valor) => {
      const textToAdd = `$${valor}`;
      page.drawText(textToAdd, {
        x: foundCoords.x + config.margenX,
        y: foundCoords.y - yOffset,
        size: config.tamanioFuente,
        color: rgb(0, 0, 0),
      });
      yOffset += config.espacioEntreLineas;
    });
  }

  async generateColumnPDF() {
    if (!this.pdfDoc || !this.pdfjsDoc) {
      console.warn('El documento PDF no está cargado.');
      return;
    }

    if (!this.selectedColumn) {
      console.warn('No se ha seleccionado ninguna columna.');
      return;
    }

    this.isDownloading = true;
    this.downloadProgress = 0;

    try {
      const total = this.data.length;

      for (let i = 0; i < total; i++) {
        const row = this.data[i];
        const codigo = row['CODIGO_INTERNET'];
        const valores = [row[this.selectedColumn]];

        if (codigo) {
          if (this.manualPositions[codigo]) {
            const { x, y, page, price } = this.manualPositions[codigo];
            const pdfPage = this.pdfDoc.getPage(page - 1);
            pdfPage.drawText(`$${price}`, { x, y, size: 12, color: rgb(0, 0, 0) });
            this.positionPrice(page, x, y, codigo);
          } else {
            await this.findWordAndModifyPDF(
              this.pdfDoc,
              this.pdfjsDoc,
              codigo,
              valores,
              {
                margenX: 20,
                margenY: 30,
                espacioEntreLineas: 15,
                tamanioFuente: 15,
              }
            );
          }
        }

        this.downloadProgress = Math.floor(((i + 1) / total) * 100);
      }

      const modifiedPdfBytes = await this.pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, `mapped_prices_${this.selectedColumn}.pdf`);

      console.log(`PDF generado exitosamente para la columna "${this.selectedColumn}".`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      this.isDownloading = false;
      this.downloadProgress = 0;
    }
  }

  async findWordAndModifyPDF(
    pdfDoc: PDFDocument,
    pdfjsDoc: any,
    codigo: string,
    valores: number[],
    config: { margenX: number; margenY: number; espacioEntreLineas: number; tamanioFuente: number }
  ) {
    let foundCoords: any = null;

    for (let i = 0; i < pdfjsDoc.numPages; i++) {
      const page = await pdfjsDoc.getPage(i + 1);
      const textContent = await page.getTextContent();

      textContent.items.forEach((item: any) => {
        if (item.str.includes(codigo)) {
          foundCoords = {
            x: item.transform[4],
            y: item.transform[5],
            page: i + 1,
          };
        }
      });

      if (foundCoords) break;
    }

    if (foundCoords && !this.isPositionOccupied(foundCoords.page, foundCoords.x, foundCoords.y)) {
      await this.drawPrices(pdfDoc, foundCoords, valores, config);
      this.positionPrice(foundCoords.page, foundCoords.x, foundCoords.y, codigo);
    } else {
      console.warn(`Posición ya ocupada para código "${codigo}" en el PDF.`);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    this.pdfjsDoc = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    this.pdfDoc = await PDFDocument.load(arrayBuffer);

    console.log('PDF cargado correctamente.');
  }

  async onExcelFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = jsonData.shift() as string[];
      this.data = jsonData.map((row: any) => {
        const filteredRow: any = {};
        this.displayedColumns.forEach((col) => {
          filteredRow[col] = row[headers.indexOf(col)] || 0;
        });
        filteredRow.Encontrado = false;
        return filteredRow;
      });

      console.log('Datos cargados:', this.data);
    };
    reader.readAsBinaryString(file);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.pdfjsDoc && this.currentPage < this.pdfjsDoc.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }
}
