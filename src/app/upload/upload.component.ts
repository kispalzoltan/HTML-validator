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

  favoriteColorControl = new FormControl('');
  urlControl = new FormControl('');
  fileControl = new FormControl('')


  constructor(
    private validatorService: ValidatorService,
    private sharingData: DataSharingService,
    private userService: UserService,
    private http: HttpClient,
     private sanitizer: DomSanitizer
    ) { }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.favoriteColorControl.valueChanges.subscribe(()=>{
      console.log(this.favoriteColorControl.value)
    })

    //this.getChatCompletion().subscribe( x => console.log(x))
    //this.main()
  }

  validateOnClick(){
    if(this.isUrl){
      this.uploadFetchHTML();
      this.htmlContent = this.urlControl.value ?? "";
      this.validateHTML();
    }
    if(this.isFile){
      this.uploadFetchHTML();
      this.htmlContent = this.fileContent
      this.validateHTML();
    }
    if(this.isText){
       console.log("validate")
    this.htmlContent = this.favoriteColorControl.value ?? "";
    this.validateHTML();
    }

   
  }

  validateHTML() {
    //console.log(this.validatorService.applyFilter(this.htmlContent))

    this.sharingData.setHTMLData(this.htmlContent)

    this.validatorService.validateHTML(this.htmlContent).subscribe({
      next: (response) => {
        this.validationResponse = response;
        console.log('Validation Result:', response);
        this.sharingData.setSharedData(this.validationResponse.messages)
      },
      error: (e) => {
        console.error('Validation Error:', e);
      }
    });
  }

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

  uploadFetchHTML() {
   this.validatorService.fetchHtml(this.urlControl.value ?? "").subscribe({
    next:(value) => {
      this.sharingData.setHTMLData(value?.html)
        console.log(value)
    },
    error:(err) => {
        console.log("Hiba a uploadFetchHTML: ", err)
    },
   })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      this.fileContent = reader.result as string;
    };

    reader.readAsText(file);
  }

}
