import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HtmlErrorDetailsComponentComponent } from '../html-error-details-component/html-error-details-component.component';

export interface defectElement {
  name: string;
  position: number;
  priority: number;
  shortDesc: string;
  description?: string;
}

const ELEMENT_DATA: defectElement[] = [
  {position: 1, name: 'Egy rossz hiba', priority: 1, shortDesc: 'asd'},
  {position: 2, name: 'Helium', priority: 4, shortDesc: 'asdsad'},
  {position: 3, name: 'Lithium', priority: 5, shortDesc: 'fdgdg'},
  {position: 4, name: 'Beryllium', priority: 3, shortDesc: 'gngfd'},
  {position: 5, name: 'Boron', priority: 1, shortDesc: 'sdfgsd'},
  {position: 6, name: 'Carbon', priority: 1, shortDesc: 'www'},
  {position: 7, name: 'Nitrogen', priority: 1, shortDesc: 'efas'},
  {position: 8, name: 'Oxygen', priority: 1, shortDesc: 'gf'},
  {position: 9, name: 'Fluorine', priority: 1, shortDesc: 'bsaDFSE'},
  {position: 10, name: 'Neon', priority: 2, shortDesc: 'SDGSA'},
];

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  displayedColumns: string[] = ['position', 'name', 'priority', 'shortDesc'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog){

  }

  clickedRow(row:any){
    this.dialog.open(HtmlErrorDetailsComponentComponent, {
      height: '80%',
      width: '80%',
      panelClass: 'htmlErrorDetailsClass',
      data: {
        rowData: row,
      },
    });
    console.log(row)
  }
  
}
