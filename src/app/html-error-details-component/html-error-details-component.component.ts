import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// Using require
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ChatgptService } from '../services/Chatgpt.service';


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

  highlightedGeneratedFix = hljs.highlight(
    "",
    { language: 'xml' }
  ).value


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private chatgptService:ChatgptService) {}

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

  generateAiFix(){
    let prompt = this.data?.rowData[0].code + "\n "+ this.data?.rowData[0].rule.fix
    this.chatgptService.getChatGPTFix(prompt).subscribe({
      next:(value) =>{
        this.highlightedGeneratedFix = hljs.highlight(
          value,
          { language: 'xml' }
        ).value
      },
      error:(err) =>{
        this.highlightedGeneratedFix = hljs.highlight(
          err,
          { language: 'xml' }
        ).value
      }
      
    })
  }
}
