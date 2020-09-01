import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from 'rxjs';
import {User} from "./user.model";

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
   */
  user = new Subject<User>();

  constructor(private http: HttpClient) {
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
  }
}

