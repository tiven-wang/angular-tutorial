import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  constructor() {
    this.products = [
      {
        Product: "HT-1120",
        ProductName: "英语国际无线蓝牙键盘",
        Price: 800
      },
      {
        Product: "HT-1023",
        ProductName: "高端舒适",
        Price: 500
      }
    ];
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    return of(this.products[id]);
  }
}

export type Product = {
  Product: string,
  ProductName: string,
  ProductDescription?: string,
  Price: number
}
