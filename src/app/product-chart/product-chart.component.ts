import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css'],
  providers: [ ProductService ]
})
export class ProductChartComponent implements OnInit {
  echartsInstance: any;
  theme: string = 'vintage';
  options = {
    title: {
      text: 'Products Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: 'Counters',
        type: 'pie',
        radius: ['10%', '50%'],
        data: [],
        roseType: 'area',
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };

  initOpts = {
    height: 500
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
  }

  more(event) {
    this.productService.getProducts().subscribe(products=> {
      let data = products.map(product=> {
        return {
          value: product.Price,
          name: product.ProductName
        }
      });

      this.options.series[0].data.push(...data);
    
      this.echartsInstance.setOption(this.options);
    });
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
    console.log('on chart init:', e);
  }

  getWidth() {
    if (this.echartsInstance) {
      console.log('getWidth():', this.echartsInstance.getWidth());
    }
  }

  getHeight() {
    if (this.echartsInstance) {
      console.log('getHeight():', this.echartsInstance.getHeight());
    }
  }

  getDom() {
    if (this.echartsInstance) {
      console.log('getDom():', this.echartsInstance.getDom());
    }
  }

  getOption() {
    if (this.echartsInstance) {
      console.log('getOption():', this.echartsInstance.getOption());
    }
  }

  clear() {
    if (this.echartsInstance) {
      this.echartsInstance.clear();
      console.log('clear() called');
    }
  }

}
