import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-html-error-details-component',
  templateUrl: './html-error-details-component.component.html',
  styleUrl: './html-error-details-component.component.css'
})
export class HtmlErrorDetailsComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
