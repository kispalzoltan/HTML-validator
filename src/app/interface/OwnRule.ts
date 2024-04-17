import { Attribute } from "@angular/core";

export interface OwnRule {
    id:number,
    ruleName:string,
    tagName:string,
    attributes: Attribute[],
    type:string,
    priority:number,
    message:string,
    fix:string,
  }