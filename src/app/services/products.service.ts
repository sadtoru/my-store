import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /* para no repetir */
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';

  constructor(
    /* para hacer peticiones */
    private http: HttpClient
  ) { }

  /* llamada al api */
  getAllProducts(limit?: number , offset?: number) {
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit)
      params = params.set('offset', limit)

    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
  }

  getProductsByPage(limit: number , offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {limit , offset}
    } )

  }


  /* solo el id */
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  /* crear un solo producto */
  create (dto: CreateProductDTO){
    return this.http.post <Product> (`${this.apiUrl}/products`, dto);   
  }

  /* funciona como un get() */
  /* patch manda todo el objeto | put en partes */
  update(id: string, dto: UpdateProductDTO){
    return this.http.put <Product> (`${this.apiUrl}/products${id}`, dto);
  }

  /* algunas apis devuelven un boolean */
  delete(id: string){
    return this.http.delete <boolean>(`${this.apiUrl}/products${id}`)
  }
  
  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }



  getOne(id: string) {  /* va a la ip -- products -- y luego al id especifico */
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  getByCategory(categoryId: string, limit?: number, offset?:number ){
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }


}
