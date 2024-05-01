import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// Using require
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';

// Then register the languages you need
hljs.registerLanguage('xml', xml);
@Component({
  selector: 'app-html-error-details-component',
  templateUrl: './html-error-details-component.component.html',
  styleUrl: './html-error-details-component.component.css'
})
export class HtmlErrorDetailsComponentComponent implements OnInit{
  html: string = "";
  highlightedCode = hljs.highlight(
    "",
    { language: 'xml' }
  ).value

  highlightedFix = hljs.highlight(
    "",
    { language: 'xml' }
  ).value


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.highlightedCode = hljs.highlight(
      this.data?.rowData[0].code,
      { language: 'xml' }
    ).value

    this.highlightedFix = hljs.highlight(
      this.data?.rowData[0].rule.fix,
      { language: 'xml' }
    ).value
    console.log(this.data?.rowData)


  }
}
