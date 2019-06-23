import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService, Product } from '../products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.service.getProduct(Number(params.get('productId')));
      })
    );
  }

}
