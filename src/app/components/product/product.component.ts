import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = { 
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
   };
   
   @Output() addProduct = new EventEmitter <Product> ();
   @Output() showProduct = new EventEmitter <string> ();

   
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(){
    this.addProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
