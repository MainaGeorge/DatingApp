import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";

@Injectable()
export class HeaderModifyingService implements HttpInterceptor{
  jwtService = new JwtHelperService();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('authentication')){
      return next.handle(req);
    }
    else {
      const token = localStorage.getItem('token');
      if(token && !this.jwtService.isTokenExpired(token)){
        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(newReq);
      }
    }
  }

}

export const AddHeaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HeaderModifyingService,
  multi: true
}
