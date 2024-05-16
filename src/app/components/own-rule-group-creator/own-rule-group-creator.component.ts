import { Component, OnInit } from '@angular/core';
import { OwnRuleService } from '../../services/own-rule.service';
import { OwnRule } from '../../interface/OwnRule';
import { FormControl, Validators } from '@angular/forms';
import { OwnRuleGroup } from '../../interface/OwnRuleGroup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-own-rule-group-creator',
  templateUrl: './own-rule-group-creator.component.html',
  styleUrl: './own-rule-group-creator.component.css'
})
export class OwnRuleGroupCreatorComponent implements OnInit {
  ownRules: OwnRule[] = [];
  selectedOwnRules: OwnRule[] = [];
  groupNameFormControl = new FormControl('', [Validators.required]);

  constructor(public dialog: MatDialogRef<OwnRuleGroupCreatorComponent>,private ownRuleService:OwnRuleService){}

  
  ngOnInit(): void {
      this.getUserRules();
  }
  getUserRules(){
    this.ownRuleService.getOwnRule(localStorage.getItem("email")!).subscribe({
      next:(value) =>{
          console.log("value: "+value)
          this.ownRules = value
      },
      error(err) {
          console.log("getUserRules hibát kapott: "+err)
      },
    })
  }

  addOwnRuleToGroup(selectedRule: OwnRule){
    this.selectedOwnRules.push(selectedRule)
    console.log(this.selectedOwnRules)
  }

  removeOwnRuleToGroup(selectedRule: OwnRule){
    this.selectedOwnRules = this.selectedOwnRules.filter(obj =>  obj != selectedRule)
    console.log(this.selectedOwnRules)
  }

  createGroup(){
    let tempRuleGroup= {
      groupName:this.groupNameFormControl.value,
      rules:this.selectedOwnRules
    } as OwnRuleGroup;
    
    this.ownRuleService.saveOwnRuleGroup(localStorage.getItem("email")!,tempRuleGroup).subscribe({
      next:(value) =>{
          console.log(value)
      },
      error:(err) => {
          console.error("createGroup hiba: ",err)
      },
    })
  }


}
