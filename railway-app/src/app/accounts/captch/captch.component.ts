import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captch',
  templateUrl: './captch.component.html',
  styleUrls: ['./captch.component.css']
})
export class CaptchComponent implements OnInit {

  @Input() captchImage: string;
  @Output() position = new EventEmitter<string>();

  touClicks: Array<{x,y}> = [];
  

  constructor() { }

  ngOnInit() {
  }

  catchClick(event: MouseEvent) {
    // console.log(<HTMLInputElement>event.target);
    // console.log(event.offsetX);
    // console.log(event.offsetY);
    let touClick = {
      x: event.offsetX,
      y: event.offsetY
    };

    // let has = this.touClicks.some((click, i)=> {
    //   console.log(click);
    //   console.log(click.x - touClick.x);
    //   if(Math.abs(click.x - touClick.x) < 27 && Math.abs(click.y - touClick.y) < 27) {
    //     this.touClicks.splice(i, 1);
    //     console.log(this.touClicks);
    //     return true;
    //   }
    //   return false;
    // });

    // if(!has) {
      
    // }

    this.touClicks.push(touClick);
    this.emitPostion();
  }

  removeClick(click) {
    this.touClicks.splice(this.touClicks.indexOf(click), 1);
    this.emitPostion();
  }

  private emitPostion() {
    this.position.emit(this.touClicks.map(click=>click.x+","+click.y).join(","));
  }
}
