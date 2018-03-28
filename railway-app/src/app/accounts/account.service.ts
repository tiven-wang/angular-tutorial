import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { LoggerService } from '../logger.service';
import { Account } from '../account';

const URLs = {
  getCaptch: 'http://localhost:3000/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand',
  checkCaptcha: 'http://localhost:3000/passport/captcha/captcha-check',
  login: 'http://localhost:3000/passport/web/login'
};

@Injectable()
export class AccountService {

  logger: LoggerService;

  constructor(private http: HttpClient, logger: LoggerService) {
    this.logger = logger;
    this.logger.log('Hi!');
  }

  /**
   * {"timestamp":"2018-03-26 11:34:35","status":400,"error":"Bad Request",
   * "exception":"org.springframework.web.bind.MissingServletRequestParameterException",
   * "message":"Required String parameter 'username' is not present","path":"/passport/web/login"}
   * {"result_message":"登录成功","result_code":0,"uamtk":"C-s8YedG1tTkR4RaUPxwKE0uex2yOoVfJYkq_HthM8Qrwa2a0"}
   * @param user
   */
  login(user: Account): Observable<string> {
    const params = new HttpParams()
      .set('appid', 'otn')
      .set('username', user.username)
      .set('password', user.password);

    return this.http.post(URLs.login, params.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
      })
      .retry(100)
      .map((result: any) => {
        if (result.result_code !== 0) {
          throw result.result_message;
        } else {
          return result.uamtk;
        }
      });
  }

  getCaptch(): Observable<string> {
    return this.http.get(URLs.getCaptch, { responseType: 'blob' })
      .retry(100)
      .mergeMap(data => Observable.create((observer) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          observer.next(reader.result);
          observer.complete();
        }, false);

        reader.readAsDataURL(data);
      })
      );
  }

  checkCaptcha(positions): Observable<any> {
    const data = {
      'answer': positions,
      'login_site': 'E',
      'rand': 'sjrand'
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    const params = new HttpParams()
      .set('answer', positions)
      .set('login_site', 'E')
      .set('rand', 'sjrand');

    return this.http.post(URLs.checkCaptcha, params.toString(), {
        headers: headers
      })
      .retry(100)
      .map((result: any) => {
        if (result.result_code === 4) {
          return result;
        }
        throw result.result_message;
      });
  }
}
