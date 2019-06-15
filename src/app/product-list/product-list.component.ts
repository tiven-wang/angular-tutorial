import { Component, OnInit } from '@angular/core';
import { ODataServiceFactory, ODataService } from "angular-odata-es5";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[]
  private odata: ODataService<Product>;
  constructor(private odataFactory: ODataServiceFactory) {
    this.odata = this.odataFactory.CreateService<Product>("SEPMRA_C_ALP_Product");
  }

  ngOnInit() {
    this.getProducts();
  }

  share() {
    
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  getOneProduct(id: string) {
    this.odata.Get(id).Select("Product,ProductName,Price").Exec()
      .subscribe(
          product => {
            console.info(product);
          },
          error => {
            console.error(error);
          }
      );
  }

  getProducts(){
    this.odata
        .Query()                    //Creates a query object
        .Top(10)
        .Skip(0)
        .OrderBy('Product desc')
        // .Filter('')
        .Select("Product,ProductName,Price")
        .Exec()                     //Fires the request
        .subscribe(                 //Subscribes to Observable<Array<T>>
          products => {
            this.products = this.products.concat(products);
          },
          error => {
            console.error(error);   //Local error handler
          });

  }
}


export interface Product {
  Product: string,
  ProductName: string,
  ProductDescription?: string,
  Price: number
}