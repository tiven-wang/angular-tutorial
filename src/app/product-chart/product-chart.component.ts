import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { ProductService } from '../products/product.service';

@Component({
    selector: 'app-product-chart',
    templateUrl: './product-chart.component.html',
    styleUrls: ['./product-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductChartComponent implements OnInit {

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Chart Width
    public width: string = Browser.isDevice ? '100%' : '100%';
    public data: Object[] = [
    ];
    public data1: Object[] = [
    ];
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600', color: '#ffffff'
            }
        }
    }
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Food',
        interval: 1,
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}B',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: {
            color: 'transparent'
        }
    };
    public tooltip: Object = {
        enable: true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'UK Trade in Food Groups - 2015';

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().subscribe(products => {
            this.data = products;
        });
    }

    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
        if(args.point.yValue > 100) {
            args.fill = 'red';  
        }else {
            // args.fill = materialColors[args.point.index % 10];
        }
        
    }

}
