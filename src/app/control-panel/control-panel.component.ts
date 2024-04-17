import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HtmlErrorDetailsComponentComponent } from '../html-error-details-component/html-error-details-component.component';
import { DataSharingService } from '../services/data-sharing.service';
import { W3CValidationResult } from '../interface/W3CValidationResult';
import { W3CValidationMessage } from '../interface/W3CValidationMessage';
import { RuleCreatorComponent } from '../components/rule-creator/rule-creator.component';
import { OwnRuleService } from '../services/own-rule.service';
import { OwnRule } from '../interface/OwnRule';


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'priority'];

  resultTableData: W3CValidationMessage[] = [{
    "type": "error",
    "lastLine": 81,
    "lastColumn": 55,
    "firstColumn": 3,
    "message": "An “img” element must have an “alt” attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.",
    "extract": "n-top\">\n  <img src=\"/w3images/avatar_g.jpg\" style=\"width:100%\">\n    <"
}]
  ownRules: OwnRule[] = [];
  constructor(public dialog: MatDialog, private sharingData:DataSharingService, private ownRuleService:OwnRuleService){
    
  }
  ngOnInit(): void {
    this.resultTableData = this.sharingData.getSharedData().messages
    console.log(this.resultTableData)
    console.log(this.resultTableData[0])
    this.getUserRules()
  }

  clickedRow(row:any){
    this.dialog.open(HtmlErrorDetailsComponentComponent, {
      height: '80%',
      width: '80%',
      panelClass: 'htmlErrorDetailsClass',
      data: {
        rowData: row,
      },
    });
    console.log(row)
  }

  createRule(){
    this.dialog.open(RuleCreatorComponent, {
      height: '80%',
      width: '80%',
    });
  }

  getUserRules(){
    this.ownRuleService.getOwnRule(localStorage.getItem("email")!).subscribe({
      next:(value) =>{
          console.log(value)
          this.ownRules = value
      },
      error(err) {
          console.log("getUserRules hibát kapott: "+err)
      },
    })
  }
  deleteOwnRule(rule:OwnRule){
    this.ownRuleService.deleteOwnRule(localStorage.getItem("email")!, rule).subscribe({
      next:(value) =>{
          console.log(value)
      },
      error:(err) => {
          console.log("deleteOwnRule hibát kapott: "+err)
      },
    })
  }
  
}
