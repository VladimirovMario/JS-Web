import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';

const apiUrl = environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  loadFirstData (){
   return this.httpClient.get(`${apiUrl}/game`)
  }
  loadFurniture (){
    return this.httpClient.get(`${apiUrl}/catalog`)
   }

}
