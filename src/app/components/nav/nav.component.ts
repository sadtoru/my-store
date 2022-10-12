import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from '../../services/store.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  counter= 0;
  profile: User | null = null;
  categories: Category[] = []; 

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(product => {
      this.counter = product.length
    });
    this.getAllCategories();
  }

  login() {
    this.authService.loginAndGet('sebastecoje@email.com', '1212')
      
      .subscribe(user => {
        this.profile = user;
      });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data =>{
      this.categories = data;
    })
  }  

}
