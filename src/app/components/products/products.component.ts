import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  myShoppingCart: Product[] = [];
  total = 0;

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter()


  showProductDetail = false;
  
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  }

 

  constructor(
    private storeService: StoreService,
    private productsServices: ProductsService
  ) { this.myShoppingCart = this.storeService.getShoppingCart() }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.productsServices.getProduct(id)
      .subscribe(data => {
        /* this.toggleProductDetail(); */
        this.productChosen = data;

      })

  }

  /* crear un solo product */
  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'bla',
      images: [''],
      price: 1000,
      categoryId: 2,
    }
    this.productsServices.create(product)
    .subscribe (data => {     
      this.products.unshift(data);
    });
  }

  /* actualizar */
  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'asdasdas',
    }
    const id = this.productChosen.id;
    this.productsServices.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsServices.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);

    })
  }

  onLoadMore(){
    this.loadMore.emit();
  }


}