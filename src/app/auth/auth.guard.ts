import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, tap, take} from "rxjs/operators";

import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
   Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    /* In here, we need to find out whether the user is authenticated or not, by looking at the user behavioralSubject.
    In this method we must return boolean or an obs that eventually return boolean or .... So we return !!user which is a truthy or
    falsy value.

    Right now, if you are logged out(or you are not authenticated) and if you try to visit a protected route with this guard,
    the guard redirect the user to localhost:4200 , but it's better to redirect the user to a page that he can do sth and not
    a page without content in it like what we have currently. So we can redirect him to authenticate page if he tries to
    visit a protected route.
    In canActivate interface, we see that in canActivate() method, we can return more than just observables or promises or booleans.
    We can also return a UrlTree or a promise or an obs which they can yield a UrlTree eventually. This feature was added basically
    for authentication. With this feature, so you can redirect users when the url they are trying to visit is blocked.
    So for canActivate() method(our guard) which you often use it for authentication, now you have a convenient way of redirecting
    users.
    In the past with older angular versions, you had to manually redirect the user in that case. So for example in the past
    you could add a tap() operator here after the map() operator and in the callback you pass to tap() you can get the isAuth
    arg(you can name it anything else), because map() operator which is before tap() in this case, gives us true or false value.
    Important: When you use map() rxjs operator and do sth on the data you get from the obs, that data is changed and therefore
     the remaining rxjs operators would get that changed data not the original data that the obs returns eventually.
     So in this case, when you used map() on the obs which will eventually return a user object, you turned that user object to
     a boolean value by using that map() and any other operator that you use after map() , will work on that boolean value NOT
     the original data that the obs would return eventually. So the callback function in the tap() will get that boolean value and
     that's why I called the arg of that callback, isAuth.

     So I used that tap() to redirect the user to another page than the home page if he tried to visit a page which was protected
     by this guard and he wasn't authenticated. Because that's the default behavior of a guard that if someone which is not
     authenticated, tries to visit a page that was protected by this guard, it will redirect the user to the base url of website,
     but in this case we don't want that. We want to redirect him to a specific url of website, so I used that tap and injected
     Router in this guard.

     So now if an unauthenticated user tries to go to a protected route by this guard, he will redirected to /auth .

     Nothing wrongs with this approach, but in some cases, using this approach could lead to race conditions with multiple redirects,
     that kind of interfere with each other and therefore instead of using this approach, you can don't
     return true or false in map() but return true if there is a user object for user, but if there isn't any user
     object, we can use UrlTree.
     In createUrlTree() you can pass the normal array of segments that you want to navigate to there.
     
     So now if we are unauthenticated and try to visit .../recipes , we will redirected to /auth and also if you 
     try to visit .../ (the home page), you will also redirected to .../auth because we set things up in 
     app-routing.module that when we try to visit '' route, you will redirect to /recipes and because we are not
     authenticated, we will redirected to /auth again.
     
     Currently we set up an ongoing subscription to user user BehavirSubject. Because we know that the user 
     BehaviorSubject can emit data more than once, but we don't want that here. 
     Important: Because if you do an ongoing subscription, that can lead to a strange side effect, if our guard keeps 
     listening to that subject. Instead we want to look into the value of user object for only one time and then not
     care about that subject anymore unless we run the guard again. So before any other rxjs operator, we use take(1)
     to be sure that we always just take the latest user and then unsubscribe from that subject for this guard execution.
     WIth that, we don't have an ongoing subscription to that obs which we really don't need that behavior here.
     So now we don't run the logic in this guard when we really don't want to run it.
      */

    return this.authService.user
      .pipe(
        take(1),
        map(user => {
      // return !!user;
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return this.router.createUrlTree(['/auth']);
      }
    })
        // tap(isAuth => {
        //   if (!isAuth) {
        //     this.router.navigate(['/auth']);
        //   }
        // })
      )
  }
}
