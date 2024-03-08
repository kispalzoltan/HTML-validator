import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../services/validator.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {


  htmlContent: string = ""; // A HTML tartalom, amit validálni szeretnél
  validationResponse: any; // A validálás eredménye

  favoriteColorControl = new FormControl('');


  constructor(private validatorService: ValidatorService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.favoriteColorControl.valueChanges.subscribe(()=>{
      console.log(this.favoriteColorControl.value)
    })
    
  }

  validateOnClick(){
    console.log("validate")
    this.htmlContent = this.favoriteColorControl.value ?? "";
    this.validateHTML();
  }

  validateHTML() {
    this.validatorService.validateHTML(this.htmlContent).subscribe(
      response => {
        this.validationResponse = response;
        console.log('Validation Result:', response);
      },
      error => {
        console.error('Validation Error:', error);
      }
    );
  }
}
