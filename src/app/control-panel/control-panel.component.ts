import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HtmlErrorDetailsComponentComponent } from '../html-error-details-component/html-error-details-component.component';
import { DataSharingService } from '../services/data-sharing.service';
import { W3CValidationResult } from '../interface/W3CValidationResult';
import { W3CValidationMessage } from '../interface/W3CValidationMessage';
import { RuleCreatorComponent } from '../components/rule-creator/rule-creator.component';
import { OwnRuleService } from '../services/own-rule.service';
import { OwnRule } from '../interface/OwnRule';
import { OwnRuleGroupCreatorComponent } from '../components/own-rule-group-creator/own-rule-group-creator.component';
import { OwnRuleGroup } from '../interface/OwnRuleGroup';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ValidatorService } from '../services/validator.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


interface activeFilter{
  type:string;
  name:string;
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  @ViewChild("typechart") typechart!: ChartComponent;
  public typechartOptions!: Partial<ChartOptions>;


  displayedColumns: string[] = ['position', 'name', 'priority'];

  resultTableData: W3CValidationMessage[] = [] //w3c hibák
  errors: any[] = [] // saját hibák
 
  infos_statistics:number = 0;
  warnings_statistics:number = 0;
  errors_statistics:number = 0;

  ownRules: OwnRule[] = [];
  ownRuleGroups: OwnRuleGroup[] = [];
  active:activeFilter[] = [];

  selectedOwnRules: OwnRule[] = [];
  selectedOwnRuleGroups: OwnRuleGroup[] = [];

  selectedRulesForm: FormGroup ;
  selectedRuleGroupsForm: FormGroup;
  tempSummOwnRuleErrors: number = 0;
  constructor(
    public dialog: MatDialog,
    private sharingData:DataSharingService, 
    private ownRuleService:OwnRuleService,
    private fb: FormBuilder,
    private validatorService:ValidatorService,
    private toastrService:ToastrService){

      this.selectedRulesForm = this.fb.group({});
      this.selectedRuleGroupsForm = this.fb.group({});

      
  }
  ngOnInit(): void {
    this.resultTableData = this.sharingData.getSharedData().messages

    this.calculatePiechart();
    this.calculateTypePiechart();


    this.getUserRules()
    this.getOwnRuleGroups()

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

  createRuleGroup(){
    this.dialog.open(OwnRuleGroupCreatorComponent, {
      height: '80%',
      width: '80%',
    });

    this.dialog.afterAllClosed.subscribe(result => {
      this.getOwnRuleGroups();
      console.log('A dialógusablak bezárásának eredménye:', result);
      // Itt tudja feldolgozni a dialógusablak bezárásának eredményét
    });
  }
  

  getUserRules(){
    this.ownRuleService.getOwnRule(localStorage.getItem("email")!).subscribe({
      next:(value) =>{
          console.log("value: "+value)
          this.ownRules = value

          //saját szabályokhoz tartozó checboxok formCOntrolljai
          this.selectedRulesForm = this.fb.group({});
          this.ownRules.forEach((x,i)=> this.createRuleCheckbox(i as unknown as string))
          this.selectedRulesForm.valueChanges.subscribe(x => {

            //kiválasztott szabályok hozzáadása
            this.selectedOwnRules = this.ownRules.filter((item,index) => x[index] == true)
          })

         

      },
      error(err) {
          console.log("getUserRules hibát kapott: "+err)
      },
    })
  }
  deleteOwnRule(rule:OwnRule){
    this.ownRuleService.deleteOwnRule(localStorage.getItem("email")!, rule).subscribe({
      next:(value) =>{
        this.getUserRules()
        console.log(value)
        this.toastrService.success(rule.ruleName+" szabály törölve!")
      },
      error:(err) => {
          console.log("deleteOwnRule hibát kapott: "+err)
      },
    })
  }

  deleteOwnRuleGroup(group:OwnRuleGroup){
    console.log(".............",group)
    this.ownRuleService.deleteOwnRuleGroup(localStorage.getItem("email")!, group).subscribe({
      next:(value) =>{
          console.log(value)
          this.getOwnRuleGroups()
          this.toastrService.success(group.groupName+" szabálycsoport törölve!")
      },
      error:(err) => {
          console.log("deleteOwnRule hibát kapott: "+err)
      },
      complete:() =>{
        this.getOwnRuleGroups();
      }
    })
  }


  getOwnRuleGroups(){
    this.ownRuleService.getOwnRuleGroup(localStorage.getItem("email")!).subscribe({
      next:(value) =>{
          this.ownRuleGroups = value;
           //saját szabályokhoz tartozó checboxok formCOntrolljai
           this.selectedRuleGroupsForm = this.fb.group({});
           this.ownRuleGroups.forEach((x,i)=> this.createRuleGroupCheckbox(i as unknown as string))
           this.selectedRuleGroupsForm.valueChanges.subscribe(x => {
 
             //kiválasztott szabályok hozzáadása
             this.selectedOwnRuleGroups = this.ownRuleGroups.filter((item,index) => x[index] == true)
             console.log(this.selectedOwnRules)
           })
      },
    })
  }

  createRuleCheckbox(id:string) {
    console.log(id)
    this.selectedRulesForm.addControl(id, new FormControl(false))
  }

  createRuleGroupCheckbox(id:string) {
    console.log(id)
    this.selectedRuleGroupsForm.addControl(id, new FormControl(false))
  }

  checked(i:number, rule:any) {
console.log(i)
      
  }

  analyzeWithOwnRules(){
    this.errors = []
    let temp = []
    console.log(this.sharingData.getHTMLData())
    console.log(this.selectedOwnRules)

    //egyedüli szabályok futtatása
    this.selectedOwnRules.forEach(rule =>{
      this.errors.push(this.validatorService.applyFilter(this.sharingData.getHTMLData(), rule))

    })

    //szabálycsoportok futtatása
    this.selectedOwnRuleGroups.forEach(ruleGroup =>{
      ruleGroup?.rules.forEach((ruleFromGroup) => {
        let ruleCopy = Object.assign({}, ruleFromGroup);
        ruleCopy.ruleName = ruleGroup.groupName + " / " + ruleCopy.ruleName;
        this.errors.push(this.validatorService.applyFilter(this.sharingData.getHTMLData(), ruleCopy));
      })
      

    })
    this.calculatePiechart()
    this.calculateTypePiechart()
    console.log(this.errors)
  }

  calculatePiechart(){
    this.tempSummOwnRuleErrors = 0
  this.errors.forEach(x => this.tempSummOwnRuleErrors += x.length)
    
    this.chartOptions = {
      series: [this.resultTableData.length,this.tempSummOwnRuleErrors as unknown as number],
      chart: {
        type: "donut",
        foreColor: '#ffffff'
      },
      labels: ["W3c sabályok","Saját szabályok"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  
  calculateTypePiechart(){
    this.infos_statistics = 0
    this.warnings_statistics = 0
    this.errors_statistics = 0
    this.errors.forEach(x => {
      x.forEach((element:any) => {
        console.log(element?.rule?.type)
          switch (element?.rule?.type) {
            case "info":
              this.infos_statistics++;
              break;
            case "warning":
              this.warnings_statistics++;
              break;
            case "error":
              this.errors_statistics++;
              break;
            default:
              break;
          }
         
      });
    })

    this.resultTableData.forEach(x => {
      switch (x?.type) {
        case "info":
          this.infos_statistics++;
          break;
        case "warning":
          this.warnings_statistics++;
          break;
        case "error":
          this.errors_statistics++;
          break;
        default:
          break;
      }
     
    })
    
    this.typechartOptions = {
      series: [this.infos_statistics, this.warnings_statistics,this.errors_statistics ],
      chart: {
        type: "donut",
        foreColor: '#ffffff'
      },
      labels: ["info","warning","error"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  countValidationMessages(messages: W3CValidationMessage[]): Map<string, number> {
    const messageCounts = new Map<string, number>();

    messages.forEach(message => {
        const key = JSON.stringify(message); // Azonosító kulcs generálása a teljes objektumból
        const count = messageCounts.get(key) || 0;
        messageCounts.set(key, count + 1);
    });

    return messageCounts;
}

topNMostCommonMessages(messages: W3CValidationMessage[], n: number): { name: string; count: number }[] {
  const messageCounts = this.countValidationMessages(messages);

  const sortedCounts = Array.from(messageCounts.entries()).sort((a, b) => b[1] - a[1]);

  const topNMessages = sortedCounts.slice(0, n).map(([key, count]) => ({
      name: JSON.parse(key).message,
      count: count
  }));

  return topNMessages;
}


  
}
