import { Injectable } from '@angular/core';

import { LoggerService } from '../logger.service';

export interface Account {
  name: string;
  password: string;
}

@Injectable()
export class AccountService {

  logger: LoggerService;

  constructor(logger: LoggerService) { 
    this.logger = logger;
    this.logger.log('Hi!');
  }

}
