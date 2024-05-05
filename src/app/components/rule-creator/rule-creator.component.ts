import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OwnRuleService } from '../../services/own-rule.service';
import { ToastrService } from 'ngx-toastr';

interface atribute{
  attributeName: string;
  attributeValue: string;
}

interface customRule{
  tagName:string,
  atributes: atribute[],
  type:string,
  message:string,
  fix:string,
}

@Component({
  selector: 'app-rule-creator',
  templateUrl: './rule-creator.component.html',
  styleUrl: './rule-creator.component.css',
})
export class RuleCreatorComponent implements OnInit{


  form: FormGroup;
  ownRules: any[] = [
    {
      id:0,
      ruleName:"imgCheck",
      tagName: "img",
      attributes: [
        {
          attributeName: "src",
          attributeValue: '/w3images'
        }
      ],
      type: "warning",
      priority:3,
      message: "",
      fix: ""
    }
  ];

  constructor(
    private fb: FormBuilder, 
    private ownRuleService: OwnRuleService,
    private toastService:ToastrService) {
    this.form = this.fb.group({
      id:[2],
      ruleName:[""],
      tagName: [""],
      attributes: this.fb.array([
        this.fb.group({
        attributeName:  [""],
        attributeValue:  [""]
        })
      ]),
      type:  [""],
      priority:[""],
      message:  [""],
      fix:  [""]
    });
 }
 ngOnInit(): void {
  this.form.valueChanges.subscribe(x => {
    console.log(x)
  })
 }

  get attributes() {
    return this.form.get('attributes') as FormArray;
  }
    
 

 createAtribute() {
    return this.fb.group({ 
      attributeName: new FormControl(""),
      attributeValue: new FormControl("") 
    });
  }



  addAtribute(): void {
    const attributeForm = this.fb.group({ 
      attributeName: new FormControl(),
      attributeValue: new FormControl() 
    });
    this.attributes.push(attributeForm)
  }
 

 removeAtribute(index: number): void {
    this.attributes.removeAt(index);
 }

  onSubmit() {
    console.log(this.form.value);
    this.ownRuleService.saveOwnRule(localStorage.getItem("email")!,this.form.value).subscribe({
      next:(x) => {
        this.toastService.success("Sikeresen létrehoztál egy új szabályt!")
        console.log(x)
      },
      error:(x) =>{
        console.log(x)
        this.toastService.error("Sikertelen létrehozás!")
      }
    })
  }
}
