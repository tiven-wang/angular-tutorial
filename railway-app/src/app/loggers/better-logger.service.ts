import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';

@Injectable()
export class BetterLoggerService extends LoggerService {

  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}
