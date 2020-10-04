import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from "./user.model";
import Timeout = NodeJS.Timeout;

/* I added ? for registered prop because the response data from firebase always doesn't have that property(for example when sending
a post request for sign up a user, the response doesn't have that prop but when signing in a user the response does have that prop.
So I made that prop an optional property by using ? . Because I didn't want to declare another interface just for that prop with
other props in that interface.).
So signup request won't yield that prop but signing request will yield that prop.

Also currently we need this interface for specifying the type that an observable in auth.component will eventually yield. So we
need to export this interface from this file. */
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

/* You can use @Injectable({providedIn: "root"}) for the service instead of adding that service into the providers array of
app.module.ts file. But the first approach is optional.
When you inject a service into another service, @Injectable() is necessary.*/
@Injectable({providedIn: "root"})
export class AuthService {

  /* We store the user in the subject in the end, so the type of that user which is a subject, eventually would be of type User.
  and the idea is we emit a new user or in other words, we next a new user whenever we log in or when we logout(when we clear
  the user or in other words when user becomes invalid or token expierd). So in these cases we will emit a new user, which that
  user can be valid or invalid based on it's token.

  We are managing our user through a subject. So this will inform all the places in application about when our user changes.
  So we must set things up, so when the authentication status changes, the user subject must change too. So if the token of the
  user expires, the user subject will emit a new value which that value is null, because the token is expired so the user now is
  invalid so we emit null.

  So if a subject is invalid, we can emit null or sth suitable .

  Let's assume that the user subject is our source of truth and since the header component is always there in our application
  it can subscribe to this user subject to update itself correctly based on the user status(authentication of user).*/
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: Timeout;

  /* Instead of using this prop, we can use a different approach which has a different kind of subject.
  token: string = null; */

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string) {
    /* I used the return statement here, because we want to return an observable from this method in where we call this method,
     in order to subscribe to this observable and show some loading and error handling in the place we call and subscribe to this
     method which returns an observable(so actually we are subscribing to the observable which this method returns.)

     We can also define the format of the data we get back from sending this request. Therefore let's create an interface.
     We only need that interface in this file and nowhere else and therefore we don't need to create another file and export that
     interface because we only need it here. In that interface we define how the response would look like when sending
     post request to this endpoint.

     That interface is optional.
     Important: But it is a good practice in angular and in typescript apps that you define the types of data you're working with.
      And when you send http request with angular HttpClientModule, the methods like post() and ... are generic methods where we can
      hint or tip typescript about the type of data we will get back as response. So instead of duplicating the type of response
      we get back, we can define an interface and just use that interface which holds the type of data. Which that type of data
      can have multiple types itself.
      So we can write the name of that interface inside <> of http methods in order to inform typescript that this post request
      will yield a response which the body of that response is in that format which we specified inside <> and that can helpful
      when we work with that response.
     Now we need to fire this method and subscribe to it in the auth component.  */
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAumSod3BXEKaYDpI8ONmoM4K7pzr7GZ18',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      /* Let's assign a default error message in case we can't identify a more specific error from firebase.

      Important: The condition for switch statement may fail if the error we're getting, doesn't have the format like
       errorRes.error.error.message . So first we need to reach the error object which we named it errorRes and then error
       prop then error prop of that error prop and then message prop. So if the error we are getting doesn't have this path
       of args, therefore we need to add some conditions that check if we have that structure or not?
       An example when we haven't this structure of error is when we have a network error. So let's add some if statement before
       the switch statement.

      throwError() throws an observable that in the end just wraps the thing we give it in () of that function.

      Learn: So when you want to handle errors before subscribing to the observable, you can use an rxjs operator named catchError()
       which that operator needs throwError to wrap the error into an observable and return it. So remember to return a new
       observable from the callback we pass to catchError() operator and we can return that observable by using throwError()
       which this function wraps the thing we pass to it, in a new observable, so in order to subscribe() to that method which has
       catchError() operator in it, we need to return throwError() .

      So now error message conversion logic happens in the auth service instead of component file which that service file is
      a better place for that. So now, our component is very leaner.

      localId is the id generated in firebase for each user.*/
      // let errorMessage = 'An unknown error occurred!';
      // console.log('errorRes is : ', errorRes);
      // if (!errorRes.error || !errorRes.error.error.message) {
      //   return throwError(errorMessage);
      // } else {
      //   switch (errorRes.error.error.message) {
      //     case 'EMAIL_EXISTS': errorMessage = 'This email already exists.';
      //   }
      // }
      // return throwError(errorMessage);
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  /* We want to return the observable from sending an http request from this method. So by returning that observable, we kinda
  prepare that observable in this method but with calling this method, we can subscribe to the result which this method returns. */
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAumSod3BXEKaYDpI8ONmoM4K7pzr7GZ18',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
    //TODO Why we didn't receive the error arg and pass it to handleError() method?
  }

  /* In this method, we want to basically dive into the response, check it and then throw a new error observable, bu using
  throwError() function. */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log('errorRes is : ', errorRes);

    /* We used this if statement for checking the structure of response that firebase gives us. Because the structure of that
    response can be vary, we need to check the structure in order to return a good error.*/
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email doesnt exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication (email: string, userId: string, token: string, expiresIn: number) {
    /* The token of the user which is created by firebase is stored in idToken.

             expiresIn which we receives from firebase is a string but it holds a number of seconds until the
             idToken(user token) expires. So because in the User constructor() we need a Date type, therefore we need to convert that
             string of numbers to a date type. So we need to get the current date in format of milieseconds by saying:
             new Date.getTime()

             Learn: new Date.getTime() gives the current time in format of miliseconds since the begging of time in JS, which is
              since 1970.
             So now we have the current time in miliseconds and now we can add resData.expiresIn to the current time in milliseconds
             in order to get the time of expiration in format of milliseconds.
             So now we have new Date().getTime() + resData.expiresIn which is the time of expiration in milliseconds format.
             But we need a format of Date. So we can simply put that prior code into () of new Date() in order to convert the
             time of expiration in milliseconds to time of expiration in Date format.

             Important: I added a + in front of resData.expiresIn because resData.expiresIn is a number in between quotes. So it's a
              string with potential to convert it to a number type. So we do that by adding a + in front of it. Also I multiply
              +resData.expiresIn by 1000, because it is in seconds but we are adding it to a milliseconds, therefore it needs to
              be converted to milliseconds.

              Learn: new Date(<time in milliseconds>) will return a date.

             Right now, we already expects the expiresIn as a number in this private method, so I removed + at front of
             expiresIn in this method. Instead, when we pass the expiresIn from the resData we get from observable, we can
             convert it to a number by adding a + sign at from of resData.expiresIn. */
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);

    /* We are emitting the new user which is currently logged in user, in this app. */
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout (): void {
    /* This line will make sure that our entire application, now treats the user as unauthenticated, because that't the logic we
    used everywhere and now we should update our UI and also our interceptor will not work correctly anymore for requests which
    require an authentication(they need a user object to send requests), which is exactly the behavior we want because we can't
    authenticate ourselves anymore.

    Also we can redirect after logging out. But we won't write the code for it, in the component file but in the service file and
    in logout method. Because whilst we have one place for logging in users into the application which that place is auth component,
    there are multiple possible sources which could lead to logout, it's not just he header component, which leads to logout, but
    we will also add some logic to automatically log us out, once the token expired and therefore we need to redirect in the service
    file and not in a component. So let's inject router.
    So we implemented the redirect or navigate logic in the service file not in the component where we use this logout method of
    service file, because no matter where we logout, we must always redirect in the logout. So we implemented it in the service
    file which is kinda a general file than a component file.

    So in opposite of login, which it's redirection is implemented in auth.component file which is just a component in our whole
    app, we must implement the logic of redirection for logout in service file which is a file that can be injected anywhere in
    it's module, in opposite of auth component which can't be included in any other file, because we don't need it do be injected.
    Because it's logic doesn't needed in anywhere else. */
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin (): void {
    /* Learn: JSON.parse will take a sting which must be in JSON format and convert it to a javascript object.
    In this case, we are converting the JSON string of that object back to a javascript object but not back into our User model
    object. Because that object(userData) won't have that token getter which we defined for the objects of User model.

    Also when you convert back that JSON string to a JS object, the  _tokenExpirationDate prop, would be of type string and not
    Date and we need to convert it to a Date type manually to make that converted object be the same as an object of User model.
    Because when you used JSON.stringify(user) , the _tokenExpirationDate prop which was type of Date was converted to string.
    So here, we need to MANUALLY convert it to Date type.

    Also here, when you want to create a new instance of User model, we pass _token and we don't use token getter of the
    converted user object, because that converted user object even doesn't have that getter because it isn't an instance of
    User model anymore and therefore it hasn't that getter. So we can pass that _token prop of converted user object without
    using getter which doesn't exist anymore.(I repeatedly say "converted user object" instead of user object, because after
    converting that user object to JSON string, the getters would destroyed!) and also the type of Date, gets converted to type of
    string.

    We can't save methods in JSON snapshot(when converting an object by using JSON.stringify() - so getters and setter would be
    destroyed in the converted JSON format of that object an also the converted JS object from that JSON string) and therefore it
    only contains the props we had in there which are those 4 props.

    RECAP: So we have to convert the user object which was logged in or signed up, into a string with JSON format(in
    handleAuthentication() method.). Then in this method, we can get that JSON string object and convert it back to a js object
    and also convert the props of this converted object into the types we had before like Date.*/

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      /* Now because we converted that JS object into a User model instance, we need to use that getter for getting the
      _token.
      Now we need to check if this user has a valid token, so if loadedUser.token is true-ish and we know because right now we
      are working with an instance of User model, the .token is a getter and in that getter we are checking the expiration date to
      is expired or not. Now if that condition is true, we want to emit the loadedUser as the currently authenticated user.

      Now let's go to to a place in our application that runs early in our app lifecycle and it is app.component because that
      component runs as soon as the app starts and use ngOnInit() there and call autoLogin() method in there.
      So we want when the user enters the app, autoLogin() method gets called.*/
      if (loadedUser.token) {
        this.user.next(loadedUser);

        /* We need to calculate the remaining time before the token would expired */
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  /* This is a method that sets a timer and manages that timer for automatically logging the user out.
  The callback we pass to setTimeout() as the first arg, would be called immediately after the duration we pass as second arg.

  Now when the user logs out , we need to clear that timer. Because if we logout automatically then there's no problem, because
  the timer was expired and we were logged out, so the timer was cleared. But if we logout manually, we also call logout() and we
  still have that timer in the background which calls logout() again in a later time after our logout of app.
  But we don't want to do that. So if a user logs out on his own, then the lifetime of the user's token ends anyways(because we make
  the user object to null in logout() method) and therefore we should also clear the token expiration timer when we logout manually.
  So let's store that timer in a prop of this class and the name of that is tokenExpirationTimer. Why we created a prop for that?
  Because we need to access that timer from other parts of this class and not just this method. Now use this prop in logout()
  and in there you must check if we have that timer or not because it maybe was expired. Also we need to assign null to that
  timer after logout and after clearing it, if we had it or not, doesn't matter. So I placed it outside of if statement.

  Now where we must call this autoLogout() ?
  Basically whenever we emit a new user object to our application, which we do it in handleAuthentication() and also in autoLogin() .
  So let's call this method in those places after we emit a new user object. Because, well, we must emit a new user object to
  be able to delete it after a while.

  Also note that in autoLogout() we expects expirationDuration to be in milliseconds.
  */
  autoLogout (expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}

