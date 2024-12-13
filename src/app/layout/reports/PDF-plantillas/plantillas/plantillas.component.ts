// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './plantillas.component.html',
//   styleUrls: ['./plantillas.component.scss'],
// })
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
//     } else {
//       alert('Por favor, selecciona un archivo PDF válido.');
//     }
//   }

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

//   openFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
//     this.pdfUrl = favorite.url;
//     this.annotations = [];
//   }

//   removeFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
//     const index = this.favorites.findIndex((f) => f === favorite);
//     if (index > -1) {
//       this.favorites.splice(index, 1);
//       alert('Archivo eliminado de favoritos.');
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
  public pdfUrl: SafeResourceUrl | null = null;
  public annotations: { x: number; y: number }[] = [];
  public favorites: { name: string; url: SafeResourceUrl }[] = [];

  @ViewChild('pdfViewer', { static: false }) pdfViewer!: ElementRef<HTMLIFrameElement>;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const unsafeUrl = URL.createObjectURL(file);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      this.annotations = [];
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

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

  openFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    this.pdfUrl = favorite.url;
    this.annotations = [];
  }

  removeFavorite(favorite: { name: string; url: SafeResourceUrl }): void {
    const index = this.favorites.findIndex((f) => f === favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
      alert('Archivo eliminado de favoritos.');
    }
  }
}
