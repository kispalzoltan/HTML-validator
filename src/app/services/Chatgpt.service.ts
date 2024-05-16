import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  BASE_URL:string="http://localhost:8080/api"
  constructor(private http:HttpClient) { }


  getChatGPTFix(content:any){
    return this.http.post(this.BASE_URL+'/chatgpt',content,{responseType:"text"});
  }

}
