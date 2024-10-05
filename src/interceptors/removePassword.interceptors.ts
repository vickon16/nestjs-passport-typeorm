import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RemovePassword implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // get the incoming request
    const req = context.switchToHttp().getRequest();

    // remove the password from the request
    if (!!req.body && !!req.body.password) {
      delete req.body.password;
    }

    // proceed to the next handler
    return next.handle();
  }
}
