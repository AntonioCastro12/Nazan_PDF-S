<<<<<<< HEAD
=======
// import { Component, OnInit } from '@angular/core';
// import * as pdfjsLib from 'pdfjs-dist';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
// export class PlantillasComponent implements OnInit {
//   public pdfUrl: SafeResourceUrl | null = null; // URL segura para el visor
//   public favorites: { name: string; url: SafeResourceUrl }[] = []; // Lista de favoritos

//   constructor(private sanitizer: DomSanitizer) {
//     // Configuración del worker de pdf.js
//     (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
//   }

//   ngOnInit(): void {
//     // Cargar favoritos desde localStorage al inicializar
//     const storedFavorites = localStorage.getItem('pdfFavorites');
//     if (storedFavorites) {
//       this.favorites = JSON.parse(storedFavorites);
//     }
//   }

//   /**
//    * Maneja la selección de un archivo PDF.
//    * @param event Evento del input de archivo.
//    */
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       const unsafeUrl = URL.createObjectURL(file);
//       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl); // Sanitizar URL
//     } else {
//       alert('Por favor, selecciona un archivo PDF válido.');
//     }
//   }

//   /**
//    * Añade el PDF actual a la lista de favoritos.
//    */
//   addToFavorites() {
//     if (this.pdfUrl) {
//       const name = prompt('Introduce un nombre para este archivo:');
//       if (name) {
//         this.favorites.push({ name, url: this.pdfUrl });
//         this.saveFavorites(); // Guardar en localStorage
//         alert('Archivo añadido a favoritos.');
//       }
//     } else {
//       alert('Primero carga un archivo.');
//     }
//   }

//   /**
//    * Abre un PDF de la lista de favoritos.
//    * @param favorite Objeto del favorito seleccionado.
//    */
//   openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.pdfUrl = favorite.url;
//   }

//   /**
//    * Elimina un PDF de la lista de favoritos.
//    * @param favorite Objeto del favorito a eliminar.
//    */
//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
//     if (confirmation) {
//       this.favorites = this.favorites.filter((item) => item !== favorite);
//       this.saveFavorites(); // Actualizar localStorage
//     }
//   }

//   /**
//    * Guarda los favoritos en localStorage.
//    */
//   private saveFavorites() {
//     localStorage.setItem('pdfFavorites', JSON.stringify(this.favorites));
//   }
// }

// import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as pdfjsLib from 'pdfjs-dist';
// import { PDFDocument, rgb } from 'pdf-lib';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
// export class PlantillasComponent {
//   public pdfUrl: SafeResourceUrl | null = null;
//   public favorites: { name: string; url: SafeResourceUrl }[] = [];
//   private pdfDoc: PDFDocument | null = null;
//   public annotations: { x: number; y: number }[] = [];

//   @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLIFrameElement>;

//   constructor(private sanitizer: DomSanitizer) {
//     (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
//     this.loadFavorites();
//   }

//   async onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       const arrayBuffer = await file.arrayBuffer();
//       this.pdfDoc = await PDFDocument.load(arrayBuffer);
//       const unsafeUrl = URL.createObjectURL(file);
//       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
//     } else {
//       alert('Por favor, selecciona un archivo PDF válido.');
//     }
//   }

//   onPdfClick(event: MouseEvent) {
//     const overlay = event.target as HTMLDivElement;
//     const rect = overlay.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.annotations.push({ x, y });
//   }

//   async addToFavorites() {
//     if (!this.pdfDoc) {
//       alert('Primero carga un archivo PDF.');
//       return;
//     }

//     const pages = this.pdfDoc.getPages();
//     this.annotations.forEach(({ x, y }) => {
//       const page = pages[0]; // Solo se modifica la primera página para este ejemplo
//       page.drawText('$0000.00', { x, y: page.getHeight() - y, size: 12, color: rgb(1, 0, 0) });
//     });

//     const modifiedPdfBytes = await this.pdfDoc.save();
//     const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
//     const unsafeUrl = URL.createObjectURL(modifiedPdfBlob);
//     const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);

//     const name = prompt('Introduce un nombre para este archivo:');
//     if (name) {
//       this.favorites.push({ name, url: safeUrl });
//       this.saveFavorites();
//       alert('Archivo guardado en favoritos.');
//     }
//   }

//   openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.pdfUrl = favorite.url;
//   }

//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.favorites = this.favorites.filter((f) => f !== favorite);
//     this.saveFavorites();
//   }

//   saveFavorites() {
//     localStorage.setItem('favorites', JSON.stringify(this.favorites));
//   }

//   loadFavorites() {
//     const saved = localStorage.getItem('favorites');
//     if (saved) {
//       this.favorites = JSON.parse(saved).map((fav: any) => ({
//         name: fav.name,
//         url: this.sanitizer.bypassSecurityTrustResourceUrl(fav.url),
//       }));
//     }
//   }
// }

import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss'],
})
export class PlantillasComponent {
  public pdfUrl: SafeResourceUrl | null = null; // URL segura para el visor PDF
  public annotations: { x: number; y: number }[] = []; // Coordenadas de las anotaciones
  public favorites: { name: string; url: SafeResourceUrl }[] = []; // Archivos favoritos

  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(private sanitizer: DomSanitizer) {}

  // Cargar un archivo PDF
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const unsafeUrl = URL.createObjectURL(file);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      this.annotations = []; // Reinicia las anotaciones al cargar un nuevo PDF
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  // Manejar clic en el visor PDF
  onPdfClick(event: MouseEvent): void {
    const overlay = this.pdfViewer.nativeElement.parentElement?.querySelector('.overlay') as HTMLElement;
    if (!overlay) {
      console.error('Overlay no encontrado.');
      return;
    }

    const rect = overlay.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.annotations.push({ x, y });

    const div = document.createElement('div');
    div.innerText = '$0000.00';
    div.style.position = 'absolute';
    div.style.color = 'red';
    div.style.fontWeight = 'bold';
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    overlay.appendChild(div);
  }

  // Añadir PDF a favoritos
  addToFavorites(): void {
    if (this.pdfUrl) {
      const name = prompt('Introduce un nombre para este archivo:');
      if (name) {
        this.favorites.push({ name, url: this.pdfUrl });
        alert('Archivo añadido a favoritos.');
      }
    } else {
      alert('Primero carga un archivo.');
    }
  }

  // Abrir un archivo favorito
  openFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    this.pdfUrl = favorite.url;
    this.annotations = []; // Reinicia las anotaciones al cambiar de PDF
  }

  // Eliminar un archivo favorito
  removeFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    const index = this.favorites.findIndex((f) => f === favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
      alert('Archivo eliminado de favoritos.');
    }
  }
}
