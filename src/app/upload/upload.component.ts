import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../services/validator.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataSharingService } from '../services/data-sharing.service';
import { UserService } from '../services/user.service';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {


  htmlContent: string = ""; // A HTML tartalom, amit validálni szeretnél
  validationResponse: any; // A validálás eredménye

  favoriteColorControl = new FormControl('');


  constructor(
    private validatorService: ValidatorService,
    private sharingData: DataSharingService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.favoriteColorControl.valueChanges.subscribe(()=>{
      console.log(this.favoriteColorControl.value)
    })

    this.loadUsers();
    
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: any) => {
       console.log(users)
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  validateOnClick(){

    console.log("validate")
    this.htmlContent = this.favoriteColorControl.value ?? "";
    this.validateHTML();
  }

  validateHTML() {
    console.log(this.validatorService.applyFilter(this.htmlContent))



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
}
