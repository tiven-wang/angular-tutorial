import { Injectable } from '@angular/core';
import { ODataServiceFactory, ODataService } from "angular-odata-es5";
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  $skip: number = 0;
  $top: number = 10;

  products: Product[] = [];

  private odata: ODataService<Product>;
  constructor(private odataFactory: ODataServiceFactory) {
    this.odata = this.odataFactory.CreateService<Product>("SEPMRA_C_ALP_Product");
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
    return this.odata
            .Query()                    //Creates a query object
            .Top(this.$top)
            .Skip(this.$skip)
            .OrderBy('Product desc')
            // .Filter('')
            .Select("Product,ProductName,Price")
            .Exec()                     //Fires the request
            .pipe(map(ev => {
              this.$skip = this.$skip + this.$top;
              this.products.push(...ev);
              return ev;
            }));

  }
}

export interface Product {
  Product: string,
  ProductName: string,
  ProductDescription?: string,
  Price: number
}