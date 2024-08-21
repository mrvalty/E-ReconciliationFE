import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class  AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem("token"); // Burada gerçek token'ınızı ekleyin
    if(token){
      const newRequest = request.clone({
        headers: request.headers.set("Authorization","Bearer ${token}")
      });

      return next.handle(newRequest);
    }else{
      // Token yoksa, isteği olduğu gibi devam ettirin
      return next.handle(request);
    }

  }

}
