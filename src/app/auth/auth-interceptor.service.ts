import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";

import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }
 intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    /* Right now, we get the old problem. Because in this intercept() we need to return an obs but we also are subscribing to
    another obs which is user obs in this method.

    Important: So when you have a method that it needs to return an obs, but inside of that method you are also subscribing to
     one or more observables, you can use take(1) and exhaustMap() operator and we will place the obs that we want to actually
     return from that method in return statement of exhaustMap() and we will use .pipe() on the inner obs which will be replaced
     by the actual obs we need to return from that method, which is in return statement of exhaustMap() .*/
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        /* Here we need to clone our request and attach the user token to it.
        Inside of clone() method we can pass an object where you can place the things you need to update them in the thing that
        you used clone() on it which in this case that thing is req and in this case, we need to update (or actually add) some
        query params to the request.

        Now this interceptor should add the user token to all of outgoing requests.
        Also don't forget to add this interceptor to providers array of app.module .(If you want to make this interceptor
        application-wide).

        In app.module , provide: HTTP_INTERCEPTORS is an identifier for that provider which is an interceptor.

        It's also recommended to use multi: true to allow for multiple interceptors if you currently are using one interceptor.
        But where?
        In the object you pass to providers array in app.module for adding interceptors.

        Now we need to get rid of take(1) and exhaustMap(...) where we are calling this.authService.pipe() in our app. Because
        after creating this interceptor, we are using those operators in this file and we don't need to use them in other places.

        But if you try to login or request, no request gets sent at all. So our requests in signup and login fail before they even
        get sent and that problem is coming from auth-interceptor. Because there we are using the intercept logic for EVERY
        request including our sign-up and login requests and what happens is there, we are subscribing to user subject and we get
        null as the user object. That's because we initialize the user object with null value. So user is null and when we try to
        access the token on user object, we can't and therefore the request doesn't even get sent, because it can't pass the
        interceptor.
        So let's add an if statement in exhaustMap() in the interceptor file.

        With that if statement, we only try to add token on the request, if we have a user object(so if the user is authenticated,
        we add the token for the requests of that user).

        Alternatively for this solution, you can check the url of the outgoing request and only add token for specific URLs, like
        when you want to fetch recipes or ... .*/
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});

        return next.handle(modifiedReq);
      })
    );
 }
}
