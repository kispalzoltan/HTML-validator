import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { W3CValidationMessage } from '../interface/W3CValidationMessage';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as htmlparser2 from 'htmlparser2';
import { OwnRule } from '../interface/OwnRule';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor(private http: HttpClient) { }
  tagName = 'img';
  attributeName = 'src';
  attributeValue = '/w3images';
  filteredHtmlContent = '';

  ownRules: any =[
    {
      tagName:"img",
      atributes:[{
        attributeName:"src",
        attributeValue :'/w3images'
      }],
      type:"warning",
      message:"",
      fix:""
      
    }
  ]

  validateHTML(htmlContent: string):Observable<W3CValidationMessage>  {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html; charset=UTF-8'
    });

    return this.http.post<any>('https://validator.w3.org/nu/?out=json', htmlContent, { headers });
  }

  applyFilter(htmlDoc:string, rule:OwnRule):any {
    let returnValue: { rule: OwnRule; code: string; }[] = []
    
    // Felhasználó által megadott értékek alapján szűrjük a HTML tartalmat

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlDoc, 'text/html');
    const elements = doc.querySelectorAll(rule.tagName);
    console.log(elements)
    
    elements.forEach(element => {
      let htmlBlock = element.outerHTML

        let valid = true;
        rule.attributes.forEach((attribue) => {
          if(!((element.getAttribute(attribue?.attributeName) && element.getAttribute(attribue?.attributeName)?.includes( attribue?.attributeValue)) || 
          (element.getAttribute(attribue?.attributeName) && attribue.attributeValue == ""))){
            valid = false;
          }
        })
        if (!valid){
          returnValue.push({rule:rule,code:htmlBlock})
        }
      
    })
    return returnValue;
  }

  findTag(html: string, tagName: string): { tag: string, lineNumber: number }[] {
    const $ = cheerio.load(html);
    console.log($('img'))
    const results: { tag: string, lineNumber: number }[] = [];

    $(tagName).each((index, element) => {
      if (element) { // Ellenőrzi, hogy az element nem undefined
        const tag = $.html(element);
        const lineNumber = $(element).get(0)?.startIndex;
        if(lineNumber)
        results.push({ tag, lineNumber });
      }
    });

    return results;
  }


  checkAttributes(element: HTMLElement): boolean {
    // Ellenőrizzük, hogy az elem rendelkezik-e az adott attribútummal és értékkel
    return element.getAttribute(this.attributeName) === this.attributeValue;
  }


  fetchHtml(url: string): Observable<any> {
    // Használd az Angular HttpClient-et az HTTP kérés elküldéséhez
    return this.http.get<string>(`http://localhost:8080/fetch-html?url=${url}`, { responseType: 'json' });
  }

}