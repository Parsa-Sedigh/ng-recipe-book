import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

/* You can use @Injectable({providedIn: "root"}) for the service instead of adding that service into the providers array of
app.module.ts file. But the first approach is optional.
When you inject a service into another service, @Injectable() is necessary.*/
@Injectable({providedIn: "root"})
export class AuthService {
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
      }).pipe(catchError(errorRes => {
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
        a better place for that. So now, our component is very leaner.*/
      let errorMessage = 'An unknown error occurred!';
      console.log('errorRes is : ', errorRes);
      if (!errorRes.error || !errorRes.error.error.message) {
        return throwError(errorMessage);
      } else {
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'This email already exists.';
        }
      }
      return throwError(errorMessage);
    }));
  }
}

