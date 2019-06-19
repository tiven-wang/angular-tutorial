import { Injectable } from '@angular/core';
import { ODataServiceFactory, ODataService } from "angular-odata-es5";

@Injectable()
export class ProductService {

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
            .Top(20)
            .Skip(0)
            .OrderBy('Product desc')
            // .Filter('')
            .Select("Product,ProductName,Price,Width,Height")
            .Exec()                     //Fires the request

  }
}

export interface Product {
  Product: string,
  ProductName: string,
  ProductDescription?: string,
  Price: number,
  Width: number,
  Height: number
}