import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class ErrorInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( catchError((httpResponseError) => {
      if(httpResponseError.status === 401){
        return throwError(httpResponseError.error.title);
      }

      if(httpResponseError instanceof HttpErrorResponse){
        const applicationError = httpResponseError.headers.get("Application-Error");
        if(applicationError){
          return throwError(applicationError);
        }
        const serverError = httpResponseError.error;
        let modelStateErrors = '';
        if(serverError.errors && typeof serverError.errors === 'object'){
          for (const key in serverError.errors){
            if(serverError.errors.hasOwnProperty(key)){
              modelStateErrors += serverError.errors[key] + '\n';
            }
          }
        }
        return throwError(modelStateErrors || serverError || 'server Error');
      }
    }));
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorService,
  multi: true
}
