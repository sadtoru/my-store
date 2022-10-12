import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  limit= 10;
  offset= 0;

  constructor(
    private productsServices: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productsServices.getProductsByPage(10, 0)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit;
      })
  }

  onLoadMore(){
    this.productsServices.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset+= this.limit;
      })
  }

}
