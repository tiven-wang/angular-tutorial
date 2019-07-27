import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../products/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css'],
  providers: [ ProductService ]
})
export class ProductChartComponent implements OnInit {
  prevLabel
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
    grid: {
      bottom: 100
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      triggerEvent: true,
      axisLine: {
        onZero: false,
      },
      axisLabel: {
        rotate:90
      },
      data: []
    },{
      type: 'category',
      boundaryGap: false,
      triggerEvent: true,
      position: 'bottom',
      axisLine: {
        onZero: false,
      },
      axisLabel: {
        rotate:-20,
        interval: (index:number, value: string)=> {
          if(this.prevLabel !== value){
            this.prevLabel = value;
            return true;
          }else {
            return false;
          }
        }
      },
      offset: 50,
      data: []
    }],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Counters',
        type: 'bar',
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
  data
  products:Array<Product>
  constructor(private productService: ProductService) {}

  ngOnInit() {
  }

  more(event) {
    this.productService.getProducts()
      .pipe(
        map(products=> {
          return products.sort((a, b)=> {
            return a.MainProductCategory > b.MainProductCategory ? -1 : 1
          })
        })
      )
      .subscribe(products=> {
      this.products = products;
      this.data = products.map(product=> {
        return {
          value: product.Price,
          name: [product.Product,product.MainProductCategory]
        }
      });
      this.options.xAxis[1].data.push(...products.map(product=>product.MainProductCategory))//...new Set(products.map(product=>product.MainProductCategory)));
      this.options.xAxis[0].data.push(...products.map(product=>product.ProductName));
      this.options.series[0].data.push(...this.data);
    
      this.echartsInstance.setOption(this.options);
    });
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
    console.log('on chart init:', e);

    this.echartsInstance.on('mouseover', (params)=> {
      if(params.targetType === 'axisLabel' && params.componentType === 'xAxis' && params.xAxisIndex === 1) {
        console.log(params.value);

        let products = this.products.filter(product=>product.MainProductCategory===params.value)
          .map(product=>
            this.options.series[0].data.findIndex((data)=> {
              return data.name[0] === product.Product && data.name[1] === product.MainProductCategory
            })
          )
            
            
        this.echartsInstance.dispatchAction({
          type: 'highlight',
          // 可选，系列 index，可以是一个数组指定多个系列
          seriesIndex: 0,
          // 可选，系列名称，可以是一个数组指定多个系列
          // seriesName: products,
          // 可选，数据的 index
          dataIndex: products,
          // 可选，数据的 名称
          // name?: string
      })
      }
    });

    this.echartsInstance.on('mouseout', (params)=> {
      if(params.targetType === 'axisLabel' && params.componentType === 'xAxis' && params.xAxisIndex === 1) {
        this.echartsInstance.dispatchAction({
          type: 'downplay',
          // 可选，系列 index，可以是一个数组指定多个系列
          // seriesIndex?: number|Array,
          // 可选，系列名称，可以是一个数组指定多个系列
          // seriesName?: string|Array,
          // 可选，数据的 index
          // dataIndex?: number,
          // 可选，数据的 名称
          // name?: string
      })
      }
    
})
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
