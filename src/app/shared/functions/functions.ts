import { InventoryKardex } from "src/app/layout/modules/report-manager/models/report.entity";

export function objectContainsValue(object: InventoryKardex, searchText: string): boolean {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key as keyof InventoryKardex]; // Indicar el tipo de "key"
      if (typeof value === "string" || typeof value === "number") {
        if (value.toString().toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
      }
    }
  }
  return false;
}

export function highlightSearchText(searchText: string, value: string): string {
  if (typeof value !== 'string') {
    value = String(value);
  }
  if (searchText.length > 0 && value) {
    const re = new RegExp(searchText, 'gi');
    return value.replace(re, '<span class="highlight">' + searchText + '</span>');
  } else {
    return value !== 'null' ? value : '';
  }
}
