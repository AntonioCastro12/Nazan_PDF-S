// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.entry';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
// export class PlantillasComponent implements OnInit {
//   public pdfUrl: SafeResourceUrl | null = null;
//   public annotations: { x: number; y: number }[] = [];
//   public favorites: { name: string; url: SafeResourceUrl }[] = [];
//   public currentPage: number = 1;
//   public totalPages: number = 1;

//   @ViewChild('pdfCanvas', { static: true }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

//   private pdfDoc: any = null;

//   constructor(private sanitizer: DomSanitizer) {}

//   ngOnInit(): void {
//     // Aquí ya se puede acceder a pdfCanvas debido a { static: true }
//   }

//   async onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       const unsafeUrl = URL.createObjectURL(file);
//       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
//       await this.loadPdf(unsafeUrl);
//     } else {
//       alert('Por favor, selecciona un archivo PDF válido.');
//     }
//   }

//   async loadPdf(url: string) {
//     this.pdfDoc = await pdfjsLib.getDocument(url).promise;
//     this.totalPages = this.pdfDoc.numPages;
//     this.currentPage = 1;
//     await this.renderPage(this.currentPage);
//   }

//   async renderPage(pageNumber: number) {
//     if (!this.pdfDoc) return;

//     const canvas = this.pdfCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     const page = await this.pdfDoc.getPage(pageNumber);
//     const viewport = page.getViewport({ scale: 1.5 });

//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     const renderContext = {
//       canvasContext: context!,
//       viewport: viewport,
//     };

//     await page.render(renderContext).promise;
//   }

//   async prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       await this.renderPage(this.currentPage);
//     }
//   }

//   async nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       await this.renderPage(this.currentPage);
//     }
//   }

//   onPdfClick(event: MouseEvent) {
//     const canvas = this.pdfCanvas.nativeElement;
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.annotations.push({ x, y });

//     const div = document.createElement('div');
//     div.innerText = '$0000.00';
//     div.style.position = 'absolute';
//     div.style.color = 'red';
//     div.style.fontWeight = 'bold';
//     div.style.left = `${x}px`;
//     div.style.top = `${y}px`;
//     canvas.parentElement!.appendChild(div);
//   }

//   addToFavorites() {
//     if (this.pdfUrl) {
//       const name = prompt('Introduce un nombre para este archivo:');
//       if (name) {
//         this.favorites.push({ name, url: this.pdfUrl });
//         alert('Archivo añadido a favoritos.');
//       }
//     } else {
//       alert('Primero carga un archivo.');
//     }
//   }

//   openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.pdfUrl = favorite.url;
//     this.annotations = [];
//     this.loadPdf(favorite.url as string);
//   }

//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
//     if (confirmation) {
//       this.favorites = this.favorites.filter((item) => item !== favorite);
//     }
//   }
// }



// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.entry';

// interface FavoriteItem {
//   name: string;
//   url: SafeResourceUrl;
//   rawUrl: string;
// }

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
// export class PlantillasComponent implements OnInit {
//   public pdfUrl: SafeResourceUrl | null = null;
//   public annotations: { x: number; y: number }[] = [];
//   public favorites: FavoriteItem[] = [];
//   public currentPage: number = 1;
//   public totalPages: number = 1;

//   @ViewChild('pdfCanvas', { static: true }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

//   private pdfDoc: any = null;
//   private currentRawUrl: string | null = null;

//   constructor(private sanitizer: DomSanitizer) {}

//   ngOnInit(): void {
//     // pdfCanvas ya está disponible debido a { static: true }
//   }

//   async onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const file = input.files && input.files[0];

//     if (!file) {
//       alert('No has seleccionado ningún archivo.');
//       return;
//     }

//     if (file.type !== 'application/pdf') {
//       alert('Por favor, selecciona un archivo PDF válido.');
//       return;
//     }

//     const unsafeUrl = URL.createObjectURL(file);
//     this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
//     this.currentRawUrl = unsafeUrl;
//     await this.loadPdf(unsafeUrl);
//   }

//   async loadPdf(url: string) {
//     this.pdfDoc = await pdfjsLib.getDocument(url).promise;
//     this.totalPages = this.pdfDoc.numPages;
//     this.currentPage = 1;
//     await this.renderPage(this.currentPage);
//   }

//   async renderPage(pageNumber: number) {
//     if (!this.pdfDoc) return;

//     const canvas = this.pdfCanvas.nativeElement;
//     const context = canvas.getContext('2d')!;
//     const page = await this.pdfDoc.getPage(pageNumber);
//     const viewport = page.getViewport({ scale: 1.5 });

//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };

//     await page.render(renderContext).promise;
//   }

//   async prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       await this.renderPage(this.currentPage);
//     }
//   }

//   async nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       await this.renderPage(this.currentPage);
//     }
//   }

//   onPdfClick(event: MouseEvent) {
//     const canvas = this.pdfCanvas.nativeElement;
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.annotations.push({ x, y });
//   }

//   addToFavorites() {
//     if (this.pdfUrl && this.currentRawUrl) {
//       const name = prompt('Introduce un nombre para este archivo:');
//       if (name && name.trim() !== '') {
//         this.favorites.push({ name: name.trim(), url: this.pdfUrl, rawUrl: this.currentRawUrl });
//         alert('Archivo añadido a favoritos.');
//       }
//     } else {
//       alert('Primero carga un archivo.');
//     }
//   }

//   openFavorite(favorite: FavoriteItem) {
//     this.pdfUrl = favorite.url;
//     this.annotations = [];
//     this.currentRawUrl = favorite.rawUrl;
//     this.loadPdf(favorite.rawUrl);
//   }

//   removeFavorite(favorite: FavoriteItem) {
//     const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
//     if (confirmation) {
//       this.favorites = this.favorites.filter((item) => item !== favorite);
//     }
//   }
// }


import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface FavoriteItem {
  name: string;
  base64: string; // Guardamos el PDF como base64
}

interface Annotation {
  x: number;
  y: number;
}

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss'],
})
export class PlantillasComponent implements OnInit {
  public currentPage: number = 1;
  public totalPages: number = 1;
  public favorites: FavoriteItem[] = [];
  public pdfUrl: SafeResourceUrl | null = null;

  private pdfDoc: any = null;
  private originalPdfArrayBuffer: ArrayBuffer | null = null;
  private pageAnnotations: { [page: number]: Annotation[] } = {};

  @ViewChild('pdfCanvas', { static: true }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];

    if (!file) {
      alert('No has seleccionado ningún archivo.');
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Por favor, selecciona un archivo PDF válido.');
      return;
    }

    if (file.size === 0) {
      alert('El archivo PDF está vacío (0 bytes). Selecciona otro archivo.');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    this.originalPdfArrayBuffer = arrayBuffer;
    await this.loadPdfFromData(arrayBuffer);
  }

  private async loadPdfFromData(data: ArrayBuffer) {
    try {
      const uint8Array = new Uint8Array(data);
      this.pdfDoc = await pdfjsLib.getDocument({ data: uint8Array }).promise;
      this.totalPages = this.pdfDoc.numPages;
      this.currentPage = 1;
      await this.renderPage(this.currentPage);

      // Generar una URL para habilitar el botón de favoritos
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    } catch (error: any) {
      console.error('Error cargando el PDF:', error);
      if (error.name === 'InvalidPDFException') {
        alert('El PDF está vacío o dañado. Por favor, selecciona un archivo válido.');
      } else {
        alert('No se ha podido cargar el PDF. Verifica que el archivo sea válido.');
      }
    }
  }

  private async renderPage(pageNumber: number) {
    if (!this.pdfDoc) return;

    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d')!;
    const page = await this.pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    this.renderAnnotations();
  }

  private renderAnnotations() {
    const canvas = this.pdfCanvas.nativeElement;
    const overlay = canvas.parentElement!.querySelector('.overlay') as HTMLDivElement;

    overlay.innerHTML = '';

    const currentPageAnnotations = this.pageAnnotations[this.currentPage] || [];
    for (const ann of currentPageAnnotations) {
      const div = document.createElement('div');
      div.innerText = '$0000.00';
      div.style.position = 'absolute';
      div.style.color = 'red';
      div.style.fontWeight = 'bold';
      div.style.left = `${ann.x}px`;
      div.style.top = `${ann.y}px`;
      overlay.appendChild(div);
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.renderPage(this.currentPage);
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.renderPage(this.currentPage);
    }
  }

  onPdfClick(event: MouseEvent) {
    const canvas = this.pdfCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!this.pageAnnotations[this.currentPage]) {
      this.pageAnnotations[this.currentPage] = [];
    }

    this.pageAnnotations[this.currentPage].push({ x, y });
    this.renderAnnotations();
  }

  async addToFavorites() {
    if (!this.originalPdfArrayBuffer) {
      alert('Primero carga un archivo.');
      return;
    }

    const name = prompt('Introduce un nombre para este archivo:');
    if (name && name.trim() !== '') {
      const base64PDF = await this.arrayBufferToBase64UsingFileReader(this.originalPdfArrayBuffer);
      this.favorites.push({ name: name.trim(), base64: base64PDF });
      this.saveFavorites();
      alert('Archivo añadido a favoritos.');
    }
  }

  downloadFavorite(favorite: FavoriteItem) {
    const uint8Array = this.base64ToUint8Array(favorite.base64);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = favorite.name + '.pdf';
    link.click();
    link.remove();
  }

  async openFavorite(favorite: FavoriteItem) {
    const uint8Array = this.base64ToUint8Array(favorite.base64);
    this.originalPdfArrayBuffer = uint8Array.buffer;
    await this.loadPdfFromData(uint8Array.buffer);
  }

  removeFavorite(favorite: FavoriteItem) {
    const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
    if (confirmation) {
      this.favorites = this.favorites.filter((item) => item !== favorite);
      this.saveFavorites();
    }
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  async downloadPdfWithAnnotations() {
    if (!this.originalPdfArrayBuffer) {
      alert('No hay ningún PDF cargado.');
      return;
    }

    const uint8Array = new Uint8Array(this.originalPdfArrayBuffer);
    const pdfDoc = await PDFDocument.load(uint8Array);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (const pageNumberStr in this.pageAnnotations) {
      const pageNumber = parseInt(pageNumberStr, 10);
      if (pageNumber <= pdfDoc.getPageCount()) {
        const page = pdfDoc.getPage(pageNumber - 1);
        const annotations = this.pageAnnotations[pageNumber];

        const { width, height } = page.getSize();
        for (const ann of annotations) {
          const adjustedY = height - ann.y;
          page.drawText('$0000.00', {
            x: ann.x,
            y: adjustedY,
            size: 12,
            font,
            color: rgb(1, 0, 0),
          });
        }
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'documento_con_anotaciones.pdf';
    link.click();
    link.remove();
  }

  // Usa un FileReader para convertir ArrayBuffer a base64 sin caracteres inválidos
  private arrayBufferToBase64UsingFileReader(buffer: ArrayBuffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        // dataUrl tiene el formato: data:application/pdf;base64,<BASE64>
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64); // Decodifica el base64 sin error
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
