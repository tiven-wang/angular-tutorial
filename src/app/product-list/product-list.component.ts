import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import "@ui5/webcomponents/dist/Button";
import { ProductsService, Product } from '../products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.products$ = this.service.getProducts();
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
