<<<<<<< HEAD
<<<<<<< HEAD
// import { Component, ElementRef, ViewChild } from '@angular/core';
=======
// import { Component, OnInit } from '@angular/core';
// import * as pdfjsLib from 'pdfjs-dist';
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
// import { Component, OnInit } from '@angular/core';
// import * as pdfjsLib from 'pdfjs-dist';
>>>>>>> parent of 3a044f5 (Plantillas modificando)
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
<<<<<<< HEAD
<<<<<<< HEAD
// export class PlantillasComponent {
//   public pdfUrl: SafeResourceUrl | null = null;
//   public annotations: { x: number; y: number }[] = [];
//   public favorites: { name: string; url: SafeResourceUrl }[] = [];

//   @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

//   constructor(private sanitizer: DomSanitizer) {}

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       const unsafeUrl = URL.createObjectURL(file);
//       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
//       this.annotations = [];
=======
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
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
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
>>>>>>> parent of 3a044f5 (Plantillas modificando)
//     } else {
//       alert('Por favor, selecciona un archivo PDF válido.');
//     }
//   }

<<<<<<< HEAD
<<<<<<< HEAD
//   onPdfClick(event: MouseEvent): void {
//     const overlay = this.pdfViewer.nativeElement.parentElement?.querySelector('.overlay') as HTMLElement;
//     if (!overlay) {
//       console.error('Overlay no encontrado.');
//       return;
//     }

//     const rect = overlay.getBoundingClientRect();
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
//     overlay.appendChild(div);
//   }

//   addToFavorites(): void {
=======
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
//   /**
//    * Añade el PDF actual a la lista de favoritos.
//    */
//   addToFavorites() {
>>>>>>> parent of 3a044f5 (Plantillas modificando)
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

<<<<<<< HEAD
<<<<<<< HEAD
//   openFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
//     this.pdfUrl = favorite.url;
//     this.annotations = [];
//   }

//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
//     const index = this.favorites.findIndex((f) => f === favorite);
//     if (index > -1) {
//       this.favorites.splice(index, 1);
//       alert('Archivo eliminado de favoritos.');
=======
//   /**
//    * Abre un PDF de la lista de favoritos.
//    * @param favorite Objeto del favorito seleccionado.
//    */
//   openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.pdfUrl = favorite.url;
//   }

=======
//   /**
//    * Abre un PDF de la lista de favoritos.
//    * @param favorite Objeto del favorito seleccionado.
//    */
//   openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     this.pdfUrl = favorite.url;
//   }

>>>>>>> parent of 3a044f5 (Plantillas modificando)
//   /**
//    * Elimina un PDF de la lista de favoritos.
//    * @param favorite Objeto del favorito a eliminar.
//    */
//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }) {
//     const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
//     if (confirmation) {
//       this.favorites = this.favorites.filter((item) => item !== favorite);
//       this.saveFavorites(); // Actualizar localStorage
<<<<<<< HEAD
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
//     }
//   }

//   /**
//    * Guarda los favoritos en localStorage.
//    */
//   private saveFavorites() {
//     localStorage.setItem('pdfFavorites', JSON.stringify(this.favorites));
//   }
// }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
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

>>>>>>> parent of 3a044f5 (Plantillas modificando)

import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss'],
})
export class PlantillasComponent {
  public pdfUrl: SafeResourceUrl | null = null;
  public annotations: { x: number; y: number }[] = [];
  public favorites: { name: string; url: SafeResourceUrl }[] = [];

  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(private sanitizer: DomSanitizer) {}

<<<<<<< HEAD
<<<<<<< HEAD
  onFileSelected(event: any): void {
=======
  // Maneja la carga de archivos PDF
  onFileSelected(event: any) {
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
  // Maneja la carga de archivos PDF
  onFileSelected(event: any) {
>>>>>>> parent of 3a044f5 (Plantillas modificando)
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const unsafeUrl = URL.createObjectURL(file);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
<<<<<<< HEAD
<<<<<<< HEAD
      this.annotations = [];
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  onPdfClick(event: MouseEvent): void {
    const overlay = this.pdfViewer.nativeElement.parentElement?.querySelector('.overlay') as HTMLElement;
=======
  // Maneja el clic en el PDF
  onPdfClick(event: MouseEvent) {
    const overlay = this.pdfViewer.nativeElement.parentElement?.querySelector('.overlay');
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
  // Maneja el clic en el PDF
  onPdfClick(event: MouseEvent) {
    const overlay = this.pdfViewer.nativeElement.parentElement?.querySelector('.overlay');
>>>>>>> parent of 3a044f5 (Plantillas modificando)
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

<<<<<<< HEAD
<<<<<<< HEAD
  addToFavorites(): void {
=======
  // Añadir PDF a favoritos
  addToFavorites() {
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
  // Añadir PDF a favoritos
  addToFavorites() {
>>>>>>> parent of 3a044f5 (Plantillas modificando)
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

<<<<<<< HEAD
<<<<<<< HEAD
  openFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    this.pdfUrl = favorite.url;
    this.annotations = [];
  }

  removeFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    const index = this.favorites.findIndex((f) => f === favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
      alert('Archivo eliminado de favoritos.');
=======
  openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
    this.pdfUrl = favorite.url;
    this.annotations = []; // Resetea las anotaciones al cambiar de PDF
  }

=======
  openFavorite(favorite: { name: string; url: SafeResourceUrl }) {
    this.pdfUrl = favorite.url;
    this.annotations = []; // Resetea las anotaciones al cambiar de PDF
  }

>>>>>>> parent of 3a044f5 (Plantillas modificando)
  // Eliminar PDF de favoritos
  removeFavorite(favorite: { name: string; url: SafeResourceUrl }) {
    const confirmation = confirm(`¿Estás seguro de eliminar "${favorite.name}" de favoritos?`);
    if (confirmation) {
      this.favorites = this.favorites.filter((item) => item !== favorite);
<<<<<<< HEAD
>>>>>>> parent of 3a044f5 (Plantillas modificando)
=======
>>>>>>> parent of 3a044f5 (Plantillas modificando)
    }
  }
}



