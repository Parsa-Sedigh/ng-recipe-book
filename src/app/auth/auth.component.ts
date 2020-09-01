import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

import {AuthResponseData, AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode () {
    /* Important: For changing a property to opposite of what it was before of this line of code, we can say:
        this.<prop> = !this.<prop>;
        So the above code, reverses the value of that prop.

       Now we also need to adjust the user interface based on the mode we're currently in it, in the auth page. So we must change
       the text of button and it's functionality based on the mode we are currently in it.
       So we must use some condition in the text of button which shows login or signup. So let's use string interpolation with
       some conditions there.*/
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit (form: NgForm) {
    if (!form.valid) {
      /* onSubmit() method shouldn't be triggered or at least shouldn't do anything if the form is invalid. Although we disabled
       the submit button of the form, so this method shouldn't be called, but even if the user hack a way into that and kind of
       manually enable the submit button even the form is invalid, which the user can do that with browser developer tools,
       but still we have another line of defence which is this if statement which this line gives us an extra validation step.
       But still the user can disable this line but even with doing that, the invalid data would sent to backend and will fail
       there.
       Important: For including a service into a component, we need to do that in () of constructor of that component.*/
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;

      /* Why I created this variable?
      The idea is that we simply change the observable(which this variable is stored that observable) in the 2 branches of if and
      else statements down there.
      So instead of subscribing to the signup() or login() in each if or else statement, instead we can assign the result of
      calling the methods of auth service which return an observable to the authObs variable and at the end and subscribe() to
      that variable outside of those if else statement.

      Because we know after the if else statments, CERTAINLY and EXACTLY one of the two observables which are result of calling
      those auth service methods, will be stored in authObs and since we want to do the same both in signup case or in login case,
      we can share the code and reduce the code we write. */
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMode) {
        authObs = this.authService.login(email, password);
          // .subscribe(
          //   (resData) => {
          //     this.isLoading = false;
          //     console.log(resData);
          //   },
          //   (errorMessage) => {
          //     this.isLoading = false;
          //     console.log(errorMessage);
          //     this.error = errorMessage;
          //   }
          // );
      } else {
        authObs = this.authService.signup(email, password);
          // .subscribe(
          //   resData => {
          //     this.isLoading = false;
          //     console.log(resData);
          //   },
          //   errorMessage => {
          //     this.isLoading = false;
          //
          //     /* In this block, we are switching on errorRes.error.error.message property.
          //      We could handle everything of errors in the component file but it's not the best possible way of doing that. Because
          //      By writing these, it moves too much logic into the component, but we knew that a component should primarily focus
          //      on updating the UI and not so much about handling the response of HTTP requests and this usage screams for an
          //      rx/js operator that allows us to handle errors in the service which we send those HTTP requests. So let's pipe() to
          //      signup() . So we want to move more logic from this component to auth service.
          //      So I commented out this switch statement.
          //
          //      So let's move this switch statement to the callback we pass to catchError() rxjs operator. But instead of assigning
          //      the error message to error prop which we haven't that prop in that service file, we can create a variable in the
          //      callback we pass to catchErr operator.*/
          //     // switch (errorRes.error.error.message) {
          //     //   case 'EMAIL_EXISTS': this.error = 'This email already exists.';
          //     // }
          //     console.log(errorMessage);
          //     this.error = errorMessage;
          //   }
          // );
      }
        authObs.subscribe(
          (resData) => {
            this.isLoading = false;
            console.log(resData);
          },
          (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
            console.log(errorMessage);
          });
        form.reset();
    }
  }
}



