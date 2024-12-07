// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './Plantillas.component.html',
//   styleUrls: ['./Plantillas.component.scss'],
// })
// export class PlantillasComponent {
//   public pdfUrl: string | null = null;
//   public favorites: { name: string; url: string }[] = [];

//   // Manejar selección de un archivo PDF
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       this.pdfUrl = objectUrl;
//     }
//   }

//   // Agregar PDF actual a favoritos
//   addToFavorites() {
//     if (this.pdfUrl) {
//       const name = prompt('Introduce un nombre para este catálogo:');
//       if (name) {
//         this.favorites.push({ name, url: this.pdfUrl });
//       }
//     } else {
//       alert('Primero carga un catálogo.');
//     }
//   }

//   // Abrir PDF desde favoritos
//   openFavorite(favorite: { name: string; url: string }) {
//     this.pdfUrl = favorite.url;
//   }

//   // Eliminar PDF de favoritos
//   removeFavorite(favorite: { name: string; url: string }) {
//     this.favorites = this.favorites.filter((item) => item !== favorite);
//   }
// }


// import { Component } from '@angular/core';

// import { NgModule } from '@angular/core';

// import { CommonModule } from '@angular/common';

// // import { PlantillasComponent } from './plantillas.component';

// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


// @Component({
//   selector: 'app-plantillas',
//   templateUrl: './Plantillas.component.html',
//   styleUrls: ['./Plantillas.component.scss'],
// })
// export class PlantillasComponent {
//   public pdfUrl: string | null = null;
//   public favorites: { name: string; url: string }[] = [];

//   // Manejar selección de un archivo PDF
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       this.pdfUrl = objectUrl;
//     }
//   }

//   // Agregar PDF actual a favoritos
//   addToFavorites() {
//     if (this.pdfUrl) {
//       const name = prompt('Introduce un nombre para este catálogo:');
//       if (name) {
//         this.favorites.push({ name, url: this.pdfUrl });
//       }
//     } else {
//       alert('Primero carga un catálogo.');
//     }
//   }

//   // Abrir PDF desde favoritos
//   openFavorite(favorite: { name: string; url: string }) {
//     this.pdfUrl = favorite.url;
//   }

//   // Eliminar PDF de favoritos
//   removeFavorite(favorite: { name: string; url: string }) {
//     this.favorites = this.favorites.filter((item) => item !== favorite);
//   }
// }



import { Component } from '@angular/core';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss'],
})
export class PlantillasComponent {
  public pdfUrl: string | null = null;
  public favorites: { name: string; url: string }[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfUrl = URL.createObjectURL(file);
    }
  }

  addToFavorites() {
    if (this.pdfUrl) {
      const name = prompt('Introduce un nombre para este archivo:');
      if (name) {
        this.favorites.push({ name, url: this.pdfUrl });
      }
    }
  }

  openFavorite(favorite: { name: string; url: string }) {
    this.pdfUrl = favorite.url;
  }

  removeFavorite(favorite: { name: string; url: string }) {
    this.favorites = this.favorites.filter((item) => item !== favorite);
  }
}
