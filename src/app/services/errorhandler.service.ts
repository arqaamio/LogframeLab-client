import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientError } from '../models/clienterror.model';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
 
    constructor(private msg: NzMessageService) { 
    }
   
    /**
     * Handles all the errors sent by the application
     * @param error Errors that were thrown
     */
    handleError(error: Error | ClientError | any) {
      if(error instanceof ClientError) {
         if(error.sendMessage){
            this.msg.create(error.level.toString().toLowerCase(), error.object.error.message + '. ' + error.object.error.exception);
         }
         console.log(error.object);
      } else {
         this.msg.error('An unexpected error occured. Please try again.');
      }
      console.error(error);
      return throwError(error);
    }
    
  }