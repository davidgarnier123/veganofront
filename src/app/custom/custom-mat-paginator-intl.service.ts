import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.itemsPerPageLabel = 'Éléments par page'; // Changez le texte ici
    this.nextPageLabel = 'Page suivante';
    this.previousPageLabel = 'Page précédente';
    this.getRangeLabel = this.getCustomRangeLabel;
  }

  getCustomRangeLabel = (page: number, pageSize: number, length: number) => {
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} sur ${length}`; // Personnalisez ce texte
  };
}