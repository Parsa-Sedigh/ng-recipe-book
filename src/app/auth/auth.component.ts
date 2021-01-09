import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {AuthResponseData, AuthService} from './auth.service';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode() {
    /* Important: For changing a property to opposite of what it was before of this line of code, we can say:
        this.<prop> = !this.<prop>;
        So the above code, reverses the value of that prop.

       Now we also need to adjust the user interface based on the mode we're currently in it, in the auth page. So we must change
       the text of button and it's functionality based on the mode we are currently in it.
       So we must use some condition in the text of button which shows login or signup. So let's use string interpolation with
       some conditions there.*/
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
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

          /* Because we couldn't use a link in the template for navigating the user around, we need to use programmatic
          navigation with navigate() method. In programmatic navigation, we want to navigate, once some action is done and
          you don't want to navigate when a user clicks something but only when the user click the button AND the login is
          done. Therefore we need to run some code before navigating so we need to navigate from the code and not with template.
          Because in the code, we know the login is done not in the template.*/
          this.router.navigate(['/recipes']);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          console.log(errorMessage);
        });
      form.reset();
    }
  }

  onHandleError() {
    this.error = null;
  }

  showErrorAlert(message: string) {
    /* In this method, the goal is to create our alert component. For doing it, you need to manually instantiate the component you
    want to add it dynamically.
    Now a simple approach is to import the alert component .ts file, in this file and then you COULD think that you simply create
    an alert component by calling new AlertComponent() which is the class of that component and save it in a const in this method.
    So:
    const alertCmp = new AlertComponent();

    This is a valid ts code but it's not a valid angular code. This won't throw an error if you compile it but it won't work.
    Because angular does a lot of other things than just create an object when it instantiates a component. Angular needs to wire it
    up in order to change detection into the DOM and ... , but this object we created in prior snippet, it's a normal JS object and
    that is not angular needs. So therefore you can't create your own component like that.

    Instead, you need to let angular creates that component and for that angular gives you a tool which is component factory.
    To get access to this tool, you need to inject sth in () of constructor of this file and you don't inject the component factory
    itself, instead you inject a componentFactoryResolver. It is up to you to how name the arg, but the type of it is
    ComponentFactoryResolver.

    Now we use this injected resolver to get access to component factory. Sounds strange! Because first you need to use the resolver to
    get access to component factory.
    Learn:So we use resolveComponentFactory() method on the componentFactoryResolver to get access to component factory.
     Now to resolveComponentFactory() you have to pass the type of the component you want to create which that type in this case is
     AlertComponent. So remember, before doing all of this, first you need to create that component files and register it in app.module.
     Now, angular knows where to look for that component which then it should create that component for you.
     resolveComponentFactory() returns an alertComponentFactory. So not the component itself, just the factory.

    So alertCmpFactory in this case is essentially an object that knows how to create alert component.
    Now we can use that factory to create a concrete component but for that we also need a place where we can attach it to the DOM
    and we don't have that place yet.
    So we need to tell angular where we want to add that component and for that you could think you can use some way of getting access
    to an element which already exists in DOM. So you could think let's add a <div> with a local reference on it in where we want to
    output this dynamic component and then by using @ViewChild() you can access to that local reference. But this is not how we can
    output that dynamic component to DOM!

    For that task, angular needs a view container ref. A view container ref is essentially an object managed internally by angular,
    which it gives angular a reference to a place in the DOM which with that place, angular can interact and this object has more
    things than just a coordinates where it sits, it has methods like "hey, create a component here".

    Now to get access to such a view container ref, we can create a helper directive. So let's create placeholder directive in shared
    folder. Why we named it placeholder?
    Because it's like a placeholder for the place we want to output the dynamic component in DOM. */
     const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
     const hostViewContainerRef = this.alertHost.viewContainerRef;

     hostViewContainerRef.clear();
     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

     /* componentRef has instance prop which gives us access to the concrete instance of componentRef component which was created
     here and this instance prop should have props that we defined for the .ts file of this dynamic component and in that .ts file
     we have message and close props for this dynamic component.(Remember: We define a dynamic component within .ts file for
     that component, but the creation of that dynamic component is happening here not in the definition file of that dynamic
     component.) and if you add dot after instance prop, you see auto completion indicates those props. Because those props which
     are defined in definition file of this dynamic component, are belong to this dynamic component and it's instances.

     Important: Whenever you want to MANUALLY subscribe() to sth, you must use a subject. But here is the only exception to
      that rule. So here we can subscribe() to EventEmitter and it is OK. So because we are MANUALLY subscribing to sth, we need
      to store that subscription and we need to clear that subscription too.
     Remember: EventEmitter<>() is based on the subject and therefore it has the same type of subscription like Subjects<>(). */
     componentRef.instance.message = message;
     this.closeSub = componentRef.instance.close.subscribe(
      res => {
        /* Clear the reference of dynamic component:
        Also here, we cleared the subscription because I know that this component will be removed(because we clicked on the close
        button or we clicked on the backdrop) so therefore before removing the alert component itself, we must clear the
        subscription to all of it's EventEmitters() , therefore I called unsubscribe() on the close prop.

        The idea is, we defined the dynamic component in it's folder and we are using it in auth component. Also the onClose()
        method is in the definition folder of the dynamic component, so whenever the user closed the alert component, we must
        inform the place where that dynamic component is used, which is auth component. For informing, we used EventEmitter() .

        Also we need to clear the subscription to close prop of alert component, when we get rid of auth component. Because if the
        auth component is removed, we don't want to have the old alert component subscription which depends on auth component
        anymore. So let's implement ngOnDestroy() for auth component. That's why we defined the subscription of close prop of
        alert component, by using a property and not a const variable. Because we need to access it through multiple parts of
        this class.*/
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  ngOnDestroy() {
    /* We need to check if we have a subscription to close prop, because maybe a user logged in without any errors! So first
    we need to check the existence of this subscription before unsubscribing from it.*/
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}



