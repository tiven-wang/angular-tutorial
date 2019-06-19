import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ ProductService ]
})
export class ProductListComponent implements OnInit {
  products: Product[]=[]
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(                 //Subscribes to Observable<Array<T>>
        products => {
          this.products.push(...products);
        },
        error => {
          console.error(error);   //Local error handler
        });
  }

  share() {
    
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}