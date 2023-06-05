import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }

  async generateExcel(data: any[]) {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['id', 'level', 'message', 'stacktrace', 'context', 'createdAt']
    ]);

    // Configuración de columna con los estilos
    worksheet['!cols'] = [
      { width: 10 },
      { width: 10 },
      { width: 50 }, // Ancho de columna para el texto
      { width: 10 },
      { wch: 50 },
      { width: 10 },
    ];
    worksheet['!ref'] = 'A1:F1';  // Establecer el rango de celdas

    // Establecer estilo de celda para el ajuste de texto
    for (let col = 0; col < 6; col++) {
      for (let row = 0; row < 1; row++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellRef]) {
          worksheet[cellRef] = {};
        }
        worksheet[cellRef].s = {
          alignment: { wrapText: true },
          font: { bold: true },
        };
      }
    }

    // Agregamos los datos a la hoja de cálculo
    data.forEach(item => {
      XLSX.utils.sheet_add_aoa(worksheet, [[item.id, item.level, item.message, item.stacktrace, JSON.stringify(item.context), item.createdAt]], { origin: -1 });
    });

    // Creamos un objeto workbook y añadimos la hoja al workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Guardamos el archivo como un blob
    const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    return blob;
  }
}
