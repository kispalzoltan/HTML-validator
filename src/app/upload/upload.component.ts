import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../services/validator.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataSharingService } from '../services/data-sharing.service';
import { UserService } from '../services/user.service';
import { types } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import OpenAI from "openai";
import { PerformanceService } from '../services/performance.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  isUrl: boolean = true
  isFile: boolean = false
  isText: boolean = false

  displayHTML:SafeHtml | undefined;
  htmlContent: string = ""; // A HTML tartalom, amit validálni szeretnél
  fileContent:string = ""
  validationResponse: any; // A validálás eredménye

  textareaControl = new FormControl('');
  urlControl = new FormControl('');
  fileControl = new FormControl('')


  constructor(
    private validatorService: ValidatorService,
    private sharingData: DataSharingService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  /**
   *check the validity type, 
   */
  validateOnClick(){
    if(this.isUrl){
      //when the User selected the link upload, we first have to send the url to the server
      //and then we get back the pure html code
      this.uploadFetchHTML(this.urlControl.value ?? "");
      this.sharingData.setHTML5Features(this.validatorService.checkHTML5Features(this.sharingData.getHTMLData()))
      console.log(this.validatorService.checkHTML5Features(this.sharingData.getHTMLData()))

    }
    if(this.isFile){
      //at file upload we have a function its detect it and save the file content to the fileContent variable
      this.validateHTML(this.fileContent);
    }
    if(this.isText){
      //if the user selected the text input, we just reading the control value and use it the validate
    this.validateHTML(this.textareaControl.value ?? "");
    }
  }

  /**
   * Its validate the html document by the W3C validator
   * @param pureHTML html code
   */
  validateHTML(pureHTML:string) {
    console.log("htmlContent",this.htmlContent)

    this.validatorService.validateHTML(pureHTML).subscribe({
      next: (response) => {
        this.validationResponse = response;
        console.log('Validation Result:', response);
        this.sharingData.setSharedData(this.validationResponse.messages) //save the validation problems to send it the controlpanel page 
      },
      error: (e) => {
        console.error('Validation Error:', e);
      },complete:() =>{
          this.router.navigate(["/controlPanel"])
      },
    });
  }

  /**
   * Upload type check
   * @param type upload type
   */
  selectUploadType(type:string){
    switch (type) {
      case "url":
        this.isUrl = true
        this.isFile = false
        this.isText = false
        break;
        case "file":
        this.isUrl = false
        this.isFile = true
        this.isText = false
        break;
        case "txt":
        this.isUrl = false
        this.isFile = false
        this.isText = true
        break;
    
      default:
        break;
    }
  }

  uploadFetchHTML(url:string) {
   this.validatorService.fetchHtml(url).subscribe({
    next:(value) => {
      console.log(value)
      this.sharingData.setHTMLData(value?.data)
        console.log(value)
      this.validateHTML(value?.data);
    },
    error:(err) => {
        console.log("Hiba a uploadFetchHTML: ", err)
    },
   })
  }

  /**
   * Fájl felöltés opciókor a kiválasztott fájlból kiolvassuk a html kódot és azt
   * elmentjük a fileContent véltozóba
   * @param event feltöltés kiválasztásakor
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      this.fileContent = reader.result as string;
    };

    reader.readAsText(file);
  }



}
