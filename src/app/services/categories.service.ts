import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/categories';

  constructor(
    private http: HttpClient,
  ) { }

    getAll(limit?: number, offset?: number){
      let params = new HttpParams();
      if(limit && offset){
        params= params.set('limit', limit);
        params= params.set('offset', limit);
      }
      return this.http.get <Category[]>(this.apiUrl, {params})
    }

}
