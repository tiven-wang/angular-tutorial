import { Injectable } from '@angular/core';

import { LoggerService } from '../logger.service';

@Injectable()
export class AccountService {

  logger: LoggerService;

  constructor(logger: LoggerService) { 
    this.logger = logger;
    this.logger.log('Hi!');
  }

}
