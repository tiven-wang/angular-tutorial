import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";

import { LoggerService } from '../logger.service';

interface RailwayResult {

}

const URLs = {
  getCaptch: 'http://localhost:3000/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand',
  checkCaptcha: 'http://localhost:3000/passport/captcha/captcha-check'
}

@Injectable()
export class AccountService {

  logger: LoggerService;

  constructor(private http: HttpClient, logger: LoggerService) { 
    this.logger = logger;
    this.logger.log('Hi!');
  }

  login(): Observable<string> {
    return this.http.get(URLs.getCaptch, { responseType: 'blob' })
      .mergeMap(data=> Observable.create((observer)=> {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            observer.next(reader.result);
            observer.complete();
          }, false);

          reader.readAsDataURL(data);
        })
      )     
    ;
  }

  checkCaptcha(positions): Observable<any> {
    var data = {
      "answer": positions,
      "login_site": "E",
      "rand": "sjrand"
    };

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    const body = new HttpParams()
      .set('answer', positions)
      .set('login_site', 'E')
      .set('rand', 'sjrand');

    return this.http.post(URLs.checkCaptcha, body.toString(), {
        headers: headers
      })
      // .map(body=>JSON.parse(body))
      .map((body: any)=> {
        if(body.result_code == 4) {
          return body;
        }
        throw body.result_message;
      });
  }
}
