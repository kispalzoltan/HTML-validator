import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OwnRule } from '../interface/OwnRule';

@Injectable({
  providedIn: 'root'
})
export class OwnRuleService {

  constructor(private http: HttpClient) { }

  BASE_URL:string="http://localhost:8080/api/"

  getOwnRuleOwner(htmlContent: string){
    return this.http.post<any>(this.BASE_URL+'ownRuleOwner', htmlContent);
  }

  getOwnRule(htmlContent: string){
    return this.http.post<OwnRule[]>(this.BASE_URL+'getOwnRule', htmlContent);
  }

  saveOwnRule(email: string, htmlContent: any){
    const body = { email: email, ownRule: htmlContent};
    return this.http.post<any>(this.BASE_URL+'saveOwnRule', body,{responseType:'json'});
  }

  deleteOwnRule(email: string, htmlContent: any){
    const body = { email: email, ownRule: htmlContent};
    return this.http.post<any>(this.BASE_URL+'deleteOwnRule', body);
  }

  saveOwnRuleGroup(email: string, htmlContent: any){
    const body = { email: email, ownRuleGroup: htmlContent};
    return this.http.post<any>(this.BASE_URL+'saveOwnRuleGroups', body);
  }

  getOwnRuleGroup(email: string){
    return this.http.post<any>(this.BASE_URL+'getOwnRuleGroups', email);
  }

  deleteOwnRuleGroup(email: string, htmlContent: any){
    const body = { email: email, ownRuleGroup: htmlContent};
    return this.http.post<any>(this.BASE_URL+'deleteOwnRuleGroup', body);
  }
}
