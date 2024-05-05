import { Injectable } from '@angular/core';
import { W3CValidationMessage } from '../interface/W3CValidationMessage';
import { W3CValidationResult } from '../interface/W3CValidationResult';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
 private validationMessage: W3CValidationResult = { url: '', messages: [] };
 private htmlDoc:string = ""
private html5Features = {};

  setSharedData(data: W3CValidationMessage[]) {
    this.validationMessage.messages = data ?? [];
  }

  getSharedData() {
    return this.validationMessage;
  }

  setHTMLData(data: string) {
    this.htmlDoc = data;
  }

  getHTMLData() {
    return this.htmlDoc;
  }

  setHTML5Features(data: any) {
    this.html5Features = data;
  }

  getHTML5Features() {
    return this.html5Features;
  }

}