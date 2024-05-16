import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import hljs from 'highlight.js';
import { ChatgptService } from '../services/Chatgpt.service';

@Component({
  selector: 'app-aihelp',
  templateUrl: './aihelp.component.html',
  styleUrl: './aihelp.component.css'
})
export class AihelpComponent {

  constructor(private _formBuilder:FormBuilder,
    private chatgptService:ChatgptService
  ){}

  highlightedGeneratedFix = hljs.highlight(
    "",
    { language: 'xml' }
  ).value

  textareaFormGroup = this._formBuilder.group({
    textareaControl: [, Validators.required]
  });

  inputFormGroup = this._formBuilder.group({
    inputControl: ['', Validators.required],
  });

  generateAiFix(){
    let prompt = this.textareaFormGroup.value.textareaControl +" \n "+this.inputFormGroup.value.inputControl;
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
