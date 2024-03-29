<!-- 1. Introduction & Why Pipes are Useful:
Pipes allows you to transform output. Also there are some pipes for different types of outputs and also we have some pipes
for synchronous and asynchronous data.
EX)
Let's say we have a property in .ts file of component:
username = 'Parsa';
and we want to output in html file. So we can use string interpolation like:
<p>{{ username }}</p>

But let's say we decide we want to make the output all uppercase. BUT WE WANT TO DO THAT, ONLY WHEN WE WANT TO OUTPUT THAT PROP.
So we don't want to change the property itself to uppercase because might we want to use it in other places not in uppercase.
But you want to transform the way it is displayed once you render it to the screen in that file. So we can use the uppercase
pipe:
<p>{{ username | uppercase }}</p>

2. Using Pipes:
A pipe is only responsible for transforming the output, so the right places to use it, logically, is the template files.

3. Parametrizing Pipes:
We want to configure a pipe. For example you want to change the format of the output date which pipe date outputs those data.
We can add a parameter to configure a pipe by adding a colon.
date pipe can get a string parameter.For passing multiple parameters if the pipe supports those params we can say:
pipe:<param1>:<param2>:...
EX)
<p>{{ server.started | date:'fullDate' }}</p>

5. Chaining(combine) Multiple Pipes:
The order of pipes when you have multiple pipes is crucial.
Important: In this example, the uppercase pipe would applied to result of server.started | date:'fullDate' .
EX)
<p>{{ server.started | date:'fullDate' | uppercase }}</p>

In the las example, if you first apply the uppercase pipe and then the date pipe on a date type, it would throw an error.
Because you are using uppercase pipe which is for strings, on the date type. Because the order of pipes is crucial.

6. Creating a Custom Pipe:
Sometimes you need some functionality in pipes which isn't in built-in pipes. So let's create shorten.pipe.ts file.
Now the shortenPipe class needs to have a special method to be usable as a pipe and whilst not strictly necessary, but it's
a good practice to implement a certain interface in the class of custom pipe which by doing this, it requires you to implement
a method in that class. The interface is PipeTransform and by implementing it, you need to create the transform method.
Now the transform method NEEDS to receive the value which that value should get transformed in () of it. Also that method needs
to receive a list of arguments. But for now, our pipe doesn't take arguments anymore because currently it doesn't need to take
them. So I omit to receive any other arguments, so we only receive the value.

Important: The transform method in a custom pipe class, always needs to return something because we always put something in
 the pipe and then we get something out of the pipe. So the pipe class HAS TO return sth.
 So you need to get sth out of the pipe otherwise that pipe won't work.
Now in order to shorten that value, we can use substr() on the value we receive.

Now in order to use that custom pipe, we need to go to app.module file and add it to declarations array.
Learn: So just like components and directives you also need to add custom pipes to declarations array of app.module.ts .

Now we also have to add a special decorator to the class of custom pipe.

7. Parametrizing a Custom Pipe:
It would be nice if we could allow the user to specify the number of characters which at that point, you want to shorten the
value.Because right now we're always using characters as the limit and it is hard coded. Instead we can receive a second arg
in transform method. Now the user can pass a parameter tou our pipe.
So any args after value argument in transform method, is the args that the user can pass to the custom pipe.

8. Example Creating a Filter Pipe:
ng generate pipe or p <name of pipe>

9. Pure and Impure Pipes (or How to fix the Filter Pipe):
Angular is not rerunning our pipe on the data whenever this data is changes. So as soon as we change what we enter in that
<input> which adds a server, for example even add a blank space on that input and then remove that space, we would update the
data that is shown or our pipe.
So CHANGING the input or the data that is going into the pipe, will trigger a recalculation or in other words, will trigger the
pipe to get applied to the data again.
To be precise, updating or changing the data which that data is arrays or objects, won't trigger the pipes and this is a good
behavior. Because otherwise, if this behavior of angular didn't exist, angular would have to rerun this filter pipe whenever
ANY data on the page changes. This would be really bad because that behavior would costs a lot of performance and this is also
the reason that why no built-in filter pipe exists in angular. Because you might say filtering is a common task. But because
adding filter pipe would typically have a high performance costs if you want to enforce that pipe to being updated even if
you are in filter mode, angular team didn't add such a pipe.

Important: So by default just changing the value of filter pipe won't trigger it. But we can enforce it to work. So be aware
 that the following change will make sure that whenever we change data on the page that the filter pipe exists, our filter pipe
 would be recalculated. So this might lead to performance issues.

So you can enforce to this pipe to be executed whenever the data changes, by adding a second property to the @Pipe() decorator
and it's called pure and now you can set it to false. By default, the pure prop is true.
Now with this, if you write stable and click the button, the servers would added.
The reason is that the filter pipe gets recalculated whenever data changes. But leading to performance issues.

So by saying pure: false , so now the pipe is not purely focusing on whether it's arguments was changed or not and therefore it
also looks for whether anything on the page changes or not and then would be recalculated. By default (pure: true) the pipe
will just focus on it's args and see if it's args was changed or not and then would recalculated.

Learn: How make a pure pipe, impure without using pure: false which leads to performance issues? In other words, I want to
 fire the pipe manually. But how?
 One way to make a Pure Pipe becoming impure is add a parameter to your Pipe. So when you want to refresh, just change the
 parameter. So that pure pipe will be fired when that parameter we added to it, changes.
 Another way without adding parameter to the pipe:
 Pure Pipe will be fired when its input(the first parameter of transform() method of pipe, which is the value param) has a
 new instance. So with TypeScript 2.1+, the below code will copy the original object with a new instance, and lead pure pipe to
 be fired:
 let copy = { ...original }
-->
<!-- 10. Understanding the async Pipe:
Let's say we have a HTTP request to a server and we get the data back from that server after 2 seconds and we are using that
data in our template. So if you output the data which would be available in some time in future, you would get [object Object].
and that is true because it is a promise and an a promise is an object. But after 2 seconds it would be some data not that
[object Object] . But angular doesn't know about that because it doesn't watch our object and actually it doesn't see that
object transforms to something else in future. It just know it's a promise, I'm done! and this behavior is good because it
saves us performance.
So we can use async pipe. This promise, recognize that we have a promise or observable which in the latter case it would
subscribe to that observable automatically and when the promise is resolved or in case of observable it sees that the data
is sent through subscription, that pipe will print that data to the screen.

Learn: A promise is an object. -->

<!-- 12. Using a Service for Http Requests:
Right now, because we're using http requests in the component, our component is grown big. Also in the .ts file of our component,
we have some code which is indirectly related to the user interface(the user interface is the job of the components). Yeah,
of course we want to send a request when a button is clicked(clicking the button is related to UI!) and then we want to display
the response of that request(this is also related to UI!). BUT! Transforming the result of that request has nothing to do with
UI. So it's a good practice to outsource that work into services. So the services are part of your angular app that do the heavy
work and the dirty work and your components are releatively LEAN and are mostly concerned with the template related work.
Like isFetching property and ... .So let's create a service named posts.service.ts and in that file we export a class named
PostsService . Now when you create a service you can make it available for whole app. There are 2 ways of doing that.
1) You can add @Injectable() before exporting the class and in () of @Injectable() , you need to pass an object and in that
object we set providedIn prop to 'root'. This approach is better.

2) You could also add that service in providers array of app.module.ts file.
In that service, we want to have our HTTP request methods and we only want to get the responses in our front-end or better say
components. So therefore in this service, we can add a method named createAndStorePost() and in there we get title and content.
Also we want to fetch or get our posts. So let's create fetchPosts() {} .
Now we want the http for sending the requests right? So let's inject the HttpClient service in this new service and then save
it in a property of this class. So we must add constructor() {} of this class and ...

@Injectable({providedIn: 'root'})
export class PostsService

constructor(private http: HttpClient) {}

createAndStorePost (title: string, content: string) {
  const postData: Post = {title: title, content: content};
  this.http.post<{name: string}>(<'url'>, <data we want to send via this http verb>)subscribe(() => {

  });
}

fetchPosts () {

}

Now we can call the service methods in our component files to send the requests from components, based on some condition in
template files. So in .ts file of that component, we need to include this newly created service inside () of constrcutor.

.ts file of component:

This onCreatePost() method would be called in template file based on some click by the user or ... and then when this onCreatePost()
method is called, we call a method from service to send a http request.
onCreatePost(postData: Post) {
  this.postService.createAndStorePost(postData.title, postData.content);
}

onFetchPosts () {
  //this.isFetching = true;
  this.postsService.fetchPosts();
}

Remember: We don't need to create some props in the service file to store the results of subscribing to http requests. Because
isFetching (which is used to indicate if the results of request are came back or not?) and loadedPosts props, clearly belonged
to our component and not to the service file.

Now the logic of sending the request is outsourced in a service. But when you have a prop for specifying whether the request is
in progress or not, (like isFetching prop) , when you outsource the code for sending request, from the .ts file of component.
We would have problem. Because right now, that prop is in .ts component file but the code of sending request is in service file.
Because the component is where we use those props by displaying the incoming data from service and ... .
Important: Now if you need to be informed about the http request process or in other words, get informed about if the results
 was came back or the observable was complete or ... , we can return the sending request code which would return an observable
 in the service file and then when we're calling that service method in the component file, we can use subscribe() on it.
 Now why we are subscribing in the component file instead of subscribing the observable right in the service file and after
 using http verb? Because we want to change some props which indicates the progress or state of the observable of that request
 and we know these props are in component file. So we need to use .subscribe() in the component file and NOT in the service
 file to get informed about the changes of loading and errors and ... .


13. Services & Components Working Together:
For fixing the props which aren't informed about the result of observable, we can use a subject in the service file and in that
file, we can next our posts when we got them and then we subscribe() to that subject in the component file. But remember, subjects
are good to use if we have multiple components which are interested in data of a http request. So a better approach in this case
is to simply return the result of this.http.get() or ... in service file. So in service file, we don't use .subscribe() when
sending http request, instead, in service file we just return the prepared observable which is because of http request. So
currently the http request won't sent. Because as I mentioned, http requests are only sent when someone is interested in that
request and just by saying: this.http.get(...); the request won't sent. Now by returning the observable of http request in
service file, we can call that method which returns an observable in component file and then use .subscribe() on it to actually
send the request and in component file, BEFORE subscribing to observable we can set this.isLoading to true

So now, we moved the result handling of http requests into the component, but more heavy lifting or the part which is detached
from the UI which is sending the request and the transformation of the resulted data with pipe() to the service file.
This was the BEST practice when working with angular and http requests. So we moved the managing of loading state and calling the
actual request and getting and managing the data which is the result of sending http request.Move these tasks to component file,
therefore by doing that, be informed about the result of http request and state of pending the request by calling subscribe()
on the observable and by using a prop which handles the state of loading of request.

Sometime you can also subscribe() to observable pf http request right in the service file:
So also remember: If your component DOESN'T CARE about the response of http request and about whether the request is done or
not, in that case, there is no reason to subscribe() in the component file. For example when you create a post and want to post
it to server.

Learn: When you have some code duplication in 2 or more methods, you can outsource the duplicated code to a new PRIVATE method of
 the calss which those methods with duplicated code are exist in that class and then call that private method in those methods.
 We declared that new method, private, because we just need that method in THAT exact class and nowhere else. So why define it
 public or protected?

14. Sending a DELETE Request:
When you have a method that is responsible for deleting a post, you can define the delete operation in service and then
subscribe() to that method in service is component file. Why subscribing to it in component file and not in service file?
Because for example maybe we want to get informed about our data was cleared or deleted to change the state of the traker
properties or the properties which do other stuff.
The first arg of subscribe() which is a function, will only executed if the observable was succeed.

15. Handling Errors:
When we're interacting with severs, things can go wrong, so we need error handling when interacting with servers. For example
when you're sending a request with incorrect data, or the server is offline! or there's an error on the server or user is not
authenticated for sending that request.

Test mode when creating a database in firebase means read and write to this database is granted by everyone! Therefore no one
needs to authenticate himself for doing these works.

You can simulate that error condition by firebase! So in firebase go to database>rules . For doing that, you can set ".read" to
false, there would be no condition which under that condition you would be allowed, not even if you are authenticated. Now
if you send get request for fetching posts, you would get an error and when you get the error you see that we still have
loading... !
1) The first way of handling errors:
Learn: The first arg of subscribe() would be executed when new data is came from server. The second arg os subscribe() would
 trigger whenever we got an error and we can receive that error by providing an arg which gets the error.

Now for error handling, in the .ts file of component, we can create a new property named error and set it to null initially and
then in html template of that component we can add a <div> for showing errors and some elements in that <div> like <p> which
show the error messages to the user. Now the idea is, we only show that <div> by using *ngIf like:
<div class="danger" *ngIf = "error">
  ...
</div>
Also you can add an errorMsg property to store the error message which is written by you or ... and then show it in template.
If you need more information about the error you can dive deeper into the error object you're getting in the arg of second function
of subscribe() .
Also by doing this, we must check if we have NOT an error when showing the loading... message.
Important: Because if we have error we shouldn't show the loading... message and instead we want to show the error <div>

16. Using Subjects for Error Handling:
2) The second way of handling errors:
This other way of handling errors could be nice in cases like when you send a http request and didn't subscribe to it in your
component file. It's easy for us to react to an error in the component, if we do return the observable from the method that
is used to send the request from service file and then in component file we subscribe to that method. Because with these, we can
pass second arg which is a function for error handling to subscribe() . BUT what about when we have subscribing to the method
which send the http request in the service? How we can handle error of those cases, which we aren't use subscribe() in the
component(because the latter approach is the normal and usual approach)?
Now obviously you could return the observable in the service too and simply subscribe in the component, instead of of subscribing
to it right in the service because you might said component doesn't care about the result of this http request and this approach
would not be wrong. But we can also use a subject instead of making the subscribe() in the component in this special case which
is the component doesn't care about the result of http request.
The subjects are useful if you have multiple places in your app that you want to handle the error in those places which are using
the same method which is for sending http requests.
So let's create a new instance of Subject() in the class of service file and that subject would give us a string eventually
so: we can say <string> and when we are subscribing to that method in service file, we can give it a second arg and in that
second arg which is a function, we can call next(<the error arg>.message) and after that we must subscribe() to that subject in
all places we're interested in that error (because remember, the purpose of subjects is that we have multiple places).
So in service file which is the place we are subscribing to the method which might get an error when sending http request and
also there are some places which are using this method(so with one subject we can handle the errors of all of them) we can say:

method() {
  this.http.post or get or ... <eventually type!>(<'the url'>, <data of post or...>).subscribe(() => {...}, (error) => {
    this.error.next(error.message);
  });
}

So for example in one place we can say:

error = null;
private errSub: Subscription;

this.errSub = this.postService.error.subscribe((errorMessage) => {
  this.error = errorMessage;
});

ngOnDestroy () {
  this.errSub.unsubscribe();
}

Also it's a good practice to unsubscribe, if you get rid of that component(we do that kind of stuff when the component is
destroyed so let's implement onDestroy in that component). So therefore, we created a new pro which is named errSub and then store
the result of using subscribe() to that new prop.

17. Using the catchError Operator:
No matter how you handle the errors, what ca be useful is a special operator that assists you for handling errors and that operator
is named catchError .
Now when you are using .pipe() on .subscribe() you can add this new operator to get the error object which can be received in
() of the second arg of subscribe() and in () of catchError() you can get the error object which you can get in () of
the second arg of subscribe() and in that, you can send data to analytics server and some generic error handling tasks and
maybe not related to UI but it doesn't matter because we are in service file not component file. Also you can use Subject here
too!But maybe you have some behind the scenes stuff that you want to do when an error occurs and in there, once you're done
handling that error, you should pass it on though. So it defenitely needs to be able to reach subscribe() . So we now need to
create a new observable which wraps that error and for doing that we need to import throwError from 'rxjs'.
throwError is a function which will yield a new observable by wrapping an error. Or in catchError you can also throw a new
custom error which YOU generated.
Important: You need to RETURN the observable which is created by calling throwError() to be able to subscribe to that observable.
 Because hey! You use subscribe() to subscribe to an observable, therefore if you don't return the result of throwError()
 function which is a new observable, you would using subscribe() on nothing, because that series of fucntion wouldn't return
 anything in that case.

 The error handling of this example doesn't do anything but it's just an idea that shows you could consider catchError()
 if you have some generic error handling task that you also want to execute in pipe() .

EX)
service file:
fetchPosts () {
  return this.http.get<{ [key: string]: Post }>(<'url'>)
  .pipe(
  catchError((errRes) => {
    return throwError(errRes);
  })
  )
  .subscribe();
}

18. Error Handling & UX:
For making user to be able to get rid of the error message, we can create a button in template like:

template file:
<div *ngIf="error">
<button (click)="onHandleError()">Okay!</button>
</div>

.ts file:
onHandleError () {
  this.error = null;
  this.isFetching = false;
}

Now if you click on that button, the error message would gone but the Loading... message wouldn't.
Important: So what we can do is to reset isFetching or isLoading property whenever we get an error too. Because even if we have
 an error, we definitely not fetching data again
 When we get an error from the observable, the observable wouldn't be completed yet! So in error handler function of subscribe()
 we must set this.isLoading to false.
 So even with an error, you aren't fetching data anymore, so the loading state definitely changed and therefore it should
 reflected in the data and in the UI(template file) too.
 Now by clicking that button, you wouldn't see loading... anymore.

19. Setting Headers:
Right now we're configuring our HTTP requests in posts.service.ts file.
When you have a backend which requires authorization therefore would look for authorization header in the request we would send
to server, we must set custom headers or if you want to set your own Content-Type or you need to attach your own custom header
because your api which you are sending the request to, needs that custom header.
So we can pass an object in second arg of .get() or third arg of .post() or ... and in that object you can configure bunch
of stuff like headers. Now headers prop of that object, takes a HttpHeaders object and in () of HttpHeaders we pass a JS object,
in object literal notation which you would write key-value pairs of your headers.
Learn: So headers are key-value pairs.

EX) service file:
fetchPosts() {
  return this.http.get<{ [key: string]: Post }>(<url>, {
    headers: new HttpHeaders({
      'Custom-Header': 'Hello'
    }),
    params: new HttpParams().set('print', 'pretty');
  });
}
-->
<!-- Important: We can use Subjects to communicate between components. In one component we can emit new values in that Subject
      by using .next(<the value>) and in other places we can subscribe() to that subject in order to listen to that subject.
      Also remember when using Subjects, in the component that you are listening to that Subject or in other words you are
      subscribing to that subject, you must clean the subscription to that Subject. In order to do that, we must create a
      prop in that component which we are listening to that Subject and with that prop, we must assign the result of
      subscribe() to that subject, to that created prop and then when the component is destroyed (in ngOnDestroy()) we must
      use unsubscribe() on that prop which holds the subscription to that subject.

Always place the built-in imports of angular to top of the other custom imports which import the created stuff by ourselves.

SUPER IMPORTANT: YOU CAN USE TERNARY OPERATORS INSIDE {{}} (string manipulations).

Important: By using .slice() without any args on the array you want to create a copy from it. So for getting a copy of array,
 you can use .slice() on it which returns the copied array.

Important: For deleting an element from an array, we can use splice() . splice() allows us to start at a specific point which
 that specific point is the first arg and then say how many elements we want to delete in the second arg.
 Also remember to call the splice on a copy of the array.
-->
<!-- 20. Adding Query Params:
It depends on the endpoint of API you're sending the request to, which query parameters are supported.
You can see the previous code snippet example.
HttpParams() works a bit different than HttpHeaders() . Because you must call set() method on HttpParams() .
'print', 'pretty' will change the format, which firebase returns it's data.
If you want to set multiple query params you can create a let variable like: (why let? Because we want to mutate that variable)
We can repeat that append() method on params variable because the old params will be kept and the new ones will be added.

const searchParams = new HttpParams();
searchParams = searchParams.append('print', 'pretty');
searchParams = searchParams.append('custom', 'key');

21. Observing Different Types of Responses:
Sometimes you need to access to entire response object not just extracted body data, sometimes you need to find out which
status code was attached or you need to find out the response headers. In such cases you can change the way angular HttpClient
parses the response .
For example for post() , you can add the third arg but instead of specifying headers or params or ... we need to change observe
prop of the third arg in post().

observe: 'body' means that you would get that response data extracted and converted to JS object automatically.
If you use, observe: 'response' , when you subscribe to that observable, in the arg of first function we pass to subscribe() ,
you would get the FULL http response.

So observe: 'body' will extract the response body and convert it to JS.
Learn: observe: 'body' is the default value for observe.
The ok property of the data response we get in first arg of subscribe() would be set to true, if status is in 2xx regeion. Like
200 .
SO with observe you can change the kind of data you get back.
This was how you observe the response data. You can also observe sth different. For example when sending delete() request,
in second arg of that method you can add an object and then say:
observe: 'events'

Learn: tap() operator allows us to execute some code without altering the response data. So basically we can do sth with
 response but not disturb our subscribe() function and the args we passed to subscribe() as functions.
 You don't need to return anything from tap() because it won't interupt the normal observable data flow. Because it just taps
 in response then allows you to do sth and then automatically let the response pass through.

So if you want to check if we did get back the response? Then you can just compare the type of event you get in tap with
HttpEventType.<...> . So:
... .pipe(tap((event) => {
  if (event.type === HttpEventType.response) {
    //So if the comparison returns true, that means the event we're receiving is actually our response, so we can access the
    //response body
    console.log(event.body);
  }
}))
You can use the things that are available on events, to find out the request or response are in which phases. For example
when using HttpEventType.sent we can say the request was sent or not and ... .

22. Changing the Response Body Type:
You can also configure the response type in the configuration object of that HTTP request method.
responseType: 'json' means the data in the body of your response is JSON and that tells angular that it should automatically
parse that data in body and convert it to JS object.

responseType: 'text' tells angular please don't try to convert the data in body to a JS object. So maybe you are getting some
json but you don't want angular to parse it so we can use this option.
The default responseType is 'json'.
blob is used for files.

23. Introducing Interceptors:
Currently, whenever we want to send our HTTP requests and whenever we want to configure sth about these requests and responses
like parameters, we're doing them on per request basis and oftentimes, that is the way it should be. Because every request
might need different headers.

Let's create a new interceptor by creating a file and there we want to attach some header to every request that is required for
authentication on our back-end.
Remember: Interceptor is basically an angular service.
So let's create a file named, auth-interceptor.service.ts :
export class AuthInterceptorService implements HttpInterceptor {}

When you implemented the HttpInterceptor interface, this interface forces us to add a intercept() method in the class that
implements that interface.
intercept()() method gets 2 args

This example is a setup that you need to use, to have some code which would run right before the request leaves the app but still
let the request leave the app.
EX)
import {HttpInterceptor, HttpRequest} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request is on it's way!');

    /* By calling this, you let the request continue and you also should return the result of this to really let the request
     continue.*/
    return next.handle(req);
  }
}

Learn: HttpRequest is a generic object. Therefore you can use angled brackets to basically inform angular about the type of
 data that request will yield.
 next is an object which will forward the request by calling a function on it. Because interceptor will basically run before
 your request leaves your app.

 Important: So intercept() will run right before the request is sent and right before the response is forwarded to subscribe() .
  So intercept steps into the request flow and next is the object with a method you need to call in order to let
  the request continue it's journey.

So intercept() method will allow us to run the code which is inside it, right BEFORE the request leaves our application and
right before the response is enter subscribe(). So by saying:
return next.handle(req); you let the request continue it's journey.

Now we need to provide this service but in a special way. So let's go to app.module.ts file and add the file of this interceptor
service to providers array but in a JS object and not just add the name of that service. The first key of that object is
provide and the value of that is HTTP_INTERCEPTORS which is a type in '@angular/common/http'. So this is the token which by it,
that injection can later be identified by angular. So it will basically know that all of the classes that you provide on that
token(so by using that indentifier), should be treated as HTTP interceptors and therefore should run their intercept() method
whenever a request leaves the application.
The second key is useClass key and for the value you must point to the interceptor class that you want to add as an interceptor.
and the last prop is when you have more than one interceptor and you must inform angular about that fact which you must say
angular please don't replace this interceptor with previous one, by adding multi: true . So this was just a dependency injection
which is supported by angular that allows us to register a service under a different identifier(HTTP_INTERCEPTOR).

With that, angular will automatically grab all of your http interceptors and run their intercept() method whenever request
leaves the app. -->
<!-- 24. Manipulating Request Objects:
Important: The req object is immutable inside the intercept() method. So inside of that method you can't say:
 req.url = '...';
 that won't work and you would get errors.

So if you want to modify the request, you have to create a new one.
Inside of req.clone() , you can pass a JS object where in that object you can overwrite all of the core things.
You can add completely new headers with headers: new ... OR if you want to keep the old headers, you simply do that by using
req.headers.append() .

So a typical use case for interceptor is that you receive the req via req arg and then you change it and then return the
modified request not the original one.
EX)
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const requestModified = req.clone({
    url: 'some-new-url',
    headers: new ... OR req.headers.append('Auth', 'xyz')
  });
  return next.handle(requestModified).pipe(tap((event) => {
    console.log(event);
    if (event.type === HttpEventType.response) {
      console.log('response arrived, body data: ');

      //This would give the response body
      console.log(event.body);
    }
  }));
}

Important: type: 0 is "request is sent" event.

25. Response Interceptors:
Learn: handle() returns an observable.

next.handle() gives you an observable. Because I think it makes sense because in the end your request is an observable and you
subscribe() to it. So next.handle(<request>) in the end, is the request with response in it and all of them are wrapped in
an observable and therefore we can add pipe() which in the () of pipe() you can do sth with the response. Yeah response. Because
the response would come back from server and first it can goes to pipe() and then subscribe() .
We can use tap() to look inside the response here.
Learn: In () of tap() we always get event.
Remember that we can observe different kinds of responses with the angular HttpClient no matter what you chose there. But
in interceptor, you always get an event, so you have the most granular access to the response you could possibly have.

26. Multiple Interceptors:
Let's create logging-interceptor.service.ts file:

This interceptor is just responsible for logging. So you can comment the logging messages in prior interceptor.
...
intercept(req: HttpRequest<any>, next: HttpHandler) {
  console.log('Outgoing request');
  return next.handle(req).pipe(tap((event) => {
    if (event.type === HttpEventType.response) {
      console.log('Incoming response');
      console.log(event.body);
    }
  }));
}

Important: So the return next.handle(req) is actually the response which is wrapped inside an observable.

Important: The order which you provide the interceptors is very crucial. Because that would be the order which the interceptors
 executed.
app.module.ts:
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptorService,
    multi: true
  }
]
-->

<!--  Course Project - Http:
2. Backend (Firebase) Setup:
We use realtime database and not cloud firestore in this project and for now choose start in test mode option, so with this
option we have read and write access without being authenticated.
Now we have created our database in that firebase project.

3. Setting Up the DataStorage Service:
First we need a place to make HTTP requests.
Of course we could add (click) listeners to the save and fetch data elements in header component and then in component .ts
file of that header, we could include the angular HTTP service and make the http request of that component in that .ts file of
that component.
But one disadvantage of that is that in that header component, we have the buttons but we don't have the data that we want
to interact with it and the data we want to interact with, are recipes and those are managed in recipe service.
Therefore the better place for making those requests is the recipe.service file.
But let's create another route which is optional and create a new service for that in shared folder and that service is
data-storage.service.ts . But this is optional because you could manage it in recipe service too but we created another service
in order to really focus on that HTTP functionality. But handling the HTTP requests in recipe service would be fine because
in the end in that case, we are interacting with recipes.

Learn:
 Theoratically, @Injectable() is optional and you don't need to add it to all of your services but it is required to add it
 to the service which we inject another service to that service.
 The alternative of adding the new created service in providers array of app.module.ts file is to use providedIn prop in
 object that we pass to @Injectable()

For using angular HTTP client service, first of all, we need to import HttpClientModule in app.module file and importing of
this needs to be at top of the custom file imports in that app.module file. Now we need to add it to imports array of that
file and before the imports of custom files in that imports array.

These were crucial in order to unlock the HttpClient functionality in our application. With this, in any part of our app we can
use angular HttpClient which means we can include that module in any service or file and in the file or service you want to
use that module, you need to say:
import { HttpClient } from '@angular/common/http';
and then include it in () of constructor of that class.

4. Storing Recipes:

After sending the request for saving recipes, for the first time, firebase will create the recipes node. Because we have
/recipes at the end of the request url.
Important: Also firebase would create some cryptic keys for those data and it always does that when you POST data or
 in other words when you attach ONE data piece at a time. But if you PUT data, firebase assumes that you know what you're
 putting there and therefore if you wanted ids for the data that you PUT, you would have to generate and add ids on your
 own. But in this case, we are fine with normal indexes like 0 and 1 and ...
-->
<!-- 5. Fetching Recipes:
Learn:
 A really crucial question when we are declaring the http request in service files, after declaring them, where we want to
 subscribe() to those http requests to send it?
 The answer is where are we interested in the response of the http requests?
 For example when sending a get request to get the recipes, are we interested in response of that in header component ? NO!
 Instead, in get or fetch recipes case, it would be nice to just subscribe in the data-storage service where in that service,
 we already injected the recipes service. Because maybe we can do something with the recipe service like to push or to move our
 fetched recipes where they are fetched in data-storage service into the recipes service which in the end if the place that
 we manage all of our recipes like deleting them or ... .
 So let's subscribe in data-storage service for fetching recipes.

 IMPORTANT: When you have some things in a file, that we have got some other places which those other places are interested in
  those things too, when those things were changed, all of those other interested places must be informed about the changes
  that happen to those things. So in that case we can use Subjects in order to inform all of the interested places or files.
  Also it's better to store or keep those interesting things like our data (an array of recipes which are in recipe service)
  in ONE place. So we can call next() method on prop that is storing a Subject , in order to inform all of the places that are
  interested in those recipes and in those places, we need to subscribe to that Subject. Also don't forget to unsubscribe() from
  that Subject in ngOnDestroy() of those places or files.

6. Transforming Response Data:
Important: When you have a variable or a prop that is not initialized, and if you are pushing some elements to it in advance,
 you MUST INITIALIZE that prop or variable with an empty array like [] . Otherwise you would get an error when trying to push()
 some element into that array which says that empty variable or prop is undefined.

Right now we have a bug. Right now, if you create a new recipe without any ingredients it's fine to have not any recipes.
So generally our app works. But to prevent nasty bugs, when we fetch the recipes, it would make sense that we make sure we always
have ingredients, even if it is just an empty array. But the data that we loaded in the end has some ingredients and that
prop is not undefined. Because otherwise, if we try to directly interact with the ingredients, we could get errors and for that
we can simply add a pipe when we are fetching the recipes. In map() operator if fetchRecipes() we get our recipes, but maybe
among that recipes we have some recipes without any ingredient.
The map() javascript method is for arrays and it receives an anonymous function which that anonymous function would executed
for every element in that array.

Learn: map() operator in rxjs, allows us to transform the data.

7. Resolving Data Before Loading:
Currently if we are in recipe detail page like /recipes/2 , and you reload, you would get an error.
But the bigger problem is that when you reload, we tried to load the detail page for a recipe which that recipe doesn't exist!
Because we're fetching our recipes from back-end and if we haven't pressed fetch data button before, well then we simply have
no recipes.
So it is simple! If we are currently in recipe-detail page and then reload the page, although we had the data of recipe we are
currently seeing it before reloading, right now we can't see it. Because we need to fetch data and if we reload, the data
that we were seeing by pressing on fetch data is gone! So accessing the details of a recipe is doomed to fail!

One approach for fixing that would be to simply add a guard that prevents us from accessing recipes/2 or edit route which has
an id encoded in it's url, when we have no recipes loaded(so after we refresh the page, we would have no recipes loaded and
therefore the guard won't allow us to see that page after refresh) and instead would redirect us to /recipes for example.

The second approach is to use a guard but another type of guard, which is a resolver.
Learn: A resolver is essentially some code that runs BEFORE a route is loaded to ensure that certain data which the route that
 is going to load depends on that data, is existing. Also in the resolver class, we need to implement Resolve interface and
 Resolve is a generic interface which means we need to define which type of data will be resolved in the end by implementing
 the Resolve interface, it forces us to add the resolve method which that method gets data about the route which is type of
 ActivatedRoute which this route arg is a snapshot and also gets the current routing state which in that resolver we named it
 state which is type of RouterStateSnapshot. From there we can for example get the id we are requesting and ... .But we want to
 load all of the recipes anyway otherwise, things like editing them won't work correctly because we need to reinsert those recipes
 into an array and ... .
So let's add it in the recipes folder next to the recipes component and we name it recipes-resolver.service because in the
end it is a normal service.

Learn: We use @Injectable({providedIn: root}) to provide a service application-wide automatically and it doesn't matter that we
 are injecting another service to that service or not. Because you can even add that decorator to services which we don't inject
 other services to that service which has this decorator.

8. Fixing a Bug with the Resolver:
Currently if we fetch our recipes and then try to edit one of them, the changes are not saved! So whenever we edit a recipe and
click the save button to save those changes, we go from .../recipe/<id>/edit to .../recipe/<id> . So we go from
RecipeDetailComponent to RecipeEditComponent and we set a resolver to execute when we visit RecipeEditComponent and that
resolver fetches the recipes from database and therefore because we din't save the edited recipe, the old recipes in database
override the changed recipe and therefore the changes don't apply.
The reason for that is that the resolver which is used(executed) WHENEVER we visit the routes that we used that resolver on those
routes. That resolver fetches new recipes from server and therefore, it simply overwrites our existing recipes, including our
changes to those recipes.

The solution is to first check whether we do have recipes therefore don't fetch recipes from db OR we don't have recipes, therefore
fetch from db.
So let's inject RecipesService into the recipes resolver and then get the recipes from that injected service.
-->

<!-- 2. How Authentication Works:
When the user enters his credentials like email and password, then, that authentication data is sent to a server where the
data is processed for validation. So we can't do that validation in the browser because all of the javascript code in
browser is exposed to our users and therefore not stored securely and also the logic of that validation could be changed
by users in browser as well. So users can edit or even disable the javascript in the browser!
So we can use authentication to create a nice user experience and to kind of show different parts of our application based
on authentication status of the user BUT WE CAN'T CONTROL OR VALIDATE the authentication status in the browser and that has to
happens in the server, so in a place where the users of our application can't do anything.
Now if you think about a traditional web application, where the server would render pages for different URLs that you enter
(so where the server would render different HTML pages for different URLs), you would work with a session. But remember, with
angular, we built SINGLE page applications. That also means we decouple the front-end or the angular application from the back-end.
So for the different pages we visit, those pages gets handled by angular and it's router and javascript in the browser takes over
and re-renders pages or parts of pages as our user interface and also re-renders the current state of the user which requires
that page.

Remember that we still reach to back-end as you learned in HTTP requests, so we can still interact with a server but the server
would be a restful API and therefore we'll not use a session because restful apis are stateless(the same applies for graphQl apis.)

Important: So the core thing is that our back-end or our server will be an API. So our server would not be a server that renders the
 HTML pages that we're on them and therefore sessions can't be used. Because our server doesn't care about the clients. Why
 it doesn't care? Because the clients and server are decoupled from ea ch other, but remember, they can communicate with each other
 through the HttpClient which angular offers us but besides that, there is no connection between server and client. In other words,
 the server doesn't know about the clients and therefore, a session is not the solution about authentication. Because a session
 would be stored on the server and as I said, the server doesn't care about the clients of our app.

Instead, we will use a different approach, where in that approach the server will validate the user credential and if all of that
credential is valid, the server will send the client a JSON web token typically.
Learn: A token is a an encoded string which contains a lot of metadata and remember that token is encoded and not encrypted.
 Which means this string could be unpacked and read by the client and remember, that token or encoded string is generated on the
 server with a certain algorithm and a certain secret which only the server knows and only the server can validate incoming tokens for
 their validity. Because the idea is that the client, which is our browser or our angular app, stores that token in some storage like
 the local storage of the browser and attaches that token which server sent, to any request that thereafter of receving that token,
 is sent to the server by the browser or angular app, which that request with atached token to it, needs to be authenticated by the
 browser.
So let's say we need to be authenticated, in order to be able to store recipes, then we need to attach that token in the header or
in as a query parameter to the request we're sending to the server. So in this example, we must attach that token to store recipes
request.
The server is able to validate that token because the server itself! create that token with a certain algorithm and a certain
private key which is only known to the server not the client. That is how a token is secured.
Important: So we can't generate or edit the token, in the client. Because as soon as we do edit or generate a new one, it won't fit
 the algorithm and private key (secret) which are used on the server and therefore, the server is able to determine the token is
 valid or not and therefore the server can block access if the token of request was invalid.
 So this is why tokens are secured. Again it is, because the server knows more than the client but we give the client one crucial
 piece which is required to authenticate subsequent requests. But that crucial piece is given by the server and it can't be generated
 on the client because of security reasons.

So create token- store that token- attach that token to request and ... .

3. Adding the Auth Page:
In this project, the auth page is available in an unauthenticated state. So the user doesn't need to be logged in to visit that
auth page. Because forcing the user to being logged in, would defeat the purpose of authentication page.
On the other hand, the recipes page should be locked down and should not be available if the user is not logged in and the same
goes to the manage dropdown which is in the header. So that dropdown should only be shown if the user is logged in, because otherwise
the user shouldn't interact with it. Or maybe we could but the actions in that dropdown shouldn't do anything, because that would
send request so they need authentication.
The shopping list should always be accessible.
So let's create auth component.

Learn:
 In a component, we always export a class and then use @Component() on that class. Then in the () of @Component, we pass a JS
 object and there, we must use selector prop and for value of that we use: 'app-<name of component>'.
 Then we need to tell angular to where find the template of that component, by specifying the templateUrl prop and for value of
 that, we pass the route to the html template of that component.
 Now we need to go to app.module.ts file and add the new component to declarations array and also you must import it like:
 import {<name of class of component>} from '.../<name of component>.component';
 remember: In import code, don't use the .ts extension.

Now let's make sure we can switch between login and signup mode.

4. Switching Between Auth Modes:
In order to switch between login and signup in the auth component, we need to manage the currently active mode. Therefore you could
add a property like isLoginMode.
So the idea is that you store if the user is currently is in login or in signup mode and you adjust the user interface and ... .

5. Handling Form Input:

6. Preparing the Backend:
Our backend doesn't have to be firebase BUT it needs to offer endpoints which you can use them to create new users and to log users
in, in order to get such a token. If your api supports that, then you can use that api. But we use firebase because it doesn't need
to write backend code.

So right now, go to authentication page in firebase and now, we have to setup a sign in method. Actually before do that let's go
to realtime database page and then go to rules and in there if .read or .write are set to true, that means everyone can read(get the
data in database) or write(store some data in database) our data in database. In other words, everyone can interact with our
database currently.
But this was required in the past because we had no authentication although it's not secure.
But right now we need some authentication, so change the value of ".read" and ".write" to "auth != null"
That will tell firebase that only authenticated users should be able to read and write data in our database.
Actually we wanted to lock down everything(entire firebase database), if users are not authenticated.
Now, if you fetch data from app, you get an error which is 401 error says you're not authorized.
So let's go to firebase enable authentication so we can slowly add the logic to be able to visit our authenticated routes again.
So in authentication page of firebase, click on sign-in method and choose email/password and JUST enable the top one.
Now you got the built-in authentication which is enabled right now, where you can send requests to certain endpoints offered by
firebase, to create users and to login users and you'll see the users in authentication page>users.
-->
<!-- 8. Preparing the Signup Request:
Google firebase auth rest api and you can see the rest endpoints which firebase offers to you to creating users and logging users in.

The firebase auth rest api is different than we used before with firebase database rest api.

In the response of signing a user up, we get back idToken from firebase, therefore we don't need to sign in the user after sign in
him up. Because we automatically get that token when the user signs up.

So we need to send requests, therefore we need a service for sending HTTP requests for authentication. So in the auth folder
let's create auth service. That service is also responsible for managing the the token of the user.

The API_KEY of your firebase is in left navbar of firebase console and in that gear icon>project settings>Web Api Key .

9. Sending the Signup Request:

10. Adding a Loading Spinner & Error Handling Logic:
For creating a loading spinner, let's create a folder in shared folder and call it loading-spinner and then create the loading-spinner
component.

11. Improving Error Handling:
throwError which is in rxjs package, will create a new observable that wraps an error. Because RxJS always needs to return an
observable and catchError operator, catches the error but you still need to return a new observable and that observable should
still wrap that error so that it still ends up in second callback when you subscribe to that method which returns an observable.

12. Sending Login Requests:
First let's make sure that we can send a request to the firebase login endpoint as well.

When something is of type Observable, we know that an Observable is of type generic. So we need to specify the type of that
variable or ... with Observable<The type that the observable will eventually yield> .

13. Login Error Handling:
Currently when a user wants to login, if his credentials are incorrect, we see [object Object] in error we write to the screen.
So in login, we don't use the error handling that we use for signup. Therefore we are printing the whole error response that
firebase sent for us for login.
Now actually there would be nice to SHARE that error handling logic between both signup and login observables. So we can create
a private method which is only used in auth.service file(hence it is a private method- it is private because we use that method
ONLY in that file) which we named it handleError method.

Also it doesn't matter to have the method that we used it BEFORE the method was declared in a class. It doesn't matter. So we can
declare handleError() after we using it in a class.

14. Creating & Storing the User Data:
For storing the user data(or other specific data about sth) we can create a model for it.So in auth folder we can create user.model.ts
file. Why in that folder?
Because users are specific to auth component not other components.
Important: A subject object is a generic type. So we have: variable or prop = new Subject<...>();

Learn: tap() operator allows us to perform some action without changing the response. So it steps into that observable chain
 but it doesn't stop it or block it or change it, it just run some code with the data(response of HTTP request in this case) you get
 back from the observable.

After doing this video which we create the user and signin or login him, then we need to redirect the user in the UI and also
update the UI. When I said update the UI, I meant for example show a logout button and only show the manage button, if the user
is logged in.
So we must update the entire header, based on the auth status of the user.

15. Reflecting the Auth State in the UI:
Let's start by forwarding the user to a different route once the user is logged in and signed up. Now since we always want to
redirect the user once we authenticate him, we can do it in two different places. We can do it in handleAuthentication()
or we can do it in the component and inside of subscribe() but only in success of login! So you prefer redirecting in the
component of inside of a service? Also if you need no data from either the service or the component and you have no strong reason
for doing it one place or the other, it's up to you.
Also you could argue that you want to keep your service file a bit cleaner and don't interact with the user interface in the
service or in other words you don't want to directly influence the user interface and therefore you maybe don't want to
interact with the router in the service file. So let's do the redirection in the component file. So let's include the router
in that file.

Right now if you are logged in and reload the page, the user object is gone and therefore we are not authenticated anymore, with
just a reload!
(When we have the user object, it means we are authenticated.)
So currently if we are not authenticated, for example if we reload the app then all of the previous state is lost and we are not
authenticated anymore, because the user object doesn't exist anymore in the memory after reloading the app. So we need to add
some code to presist that user object when we reload the page.
Right now, if we are not logged in we can still see recipes. So even we write some code that makes us can't go to recipes because
we are not authenticated, we also want to even don't be able to see that recipes tab.

So the next step will be that we must correctly reflect the current authentication state in the UI.
So we can disable the recipes link if we are not logged in.
Now we need to get the current authentication status of the user in the header component. In other words, we must find out
do we have a user object with a valid token or not? and we also need to use that information to update the template correctly.

So, right now, we manage our user object through a subject in auth service. So let's go there.

Now we need to storing the users tokens and protecting certain routes(so we shouldn't visit them even if we directly enter the url-
why directly? Because right now we don't show those routes in the UI if the user is not authenticated, but we also need to
protect those routes). But before doing that, let's make sure we can use our token to fetch data because that's still not working,
even we are authenticated, but why?? We will answer this in the next video.
-->
<!-- 16. Adding the Token to Outgoing Requests:
Right now we have a problem. Why our authentication status ignored when we try to fetch or save data?
Because JUST WE KNOW THAT WE ARE AUTHENTICATED AFTER A SUCCESSFUL LOGIN and we have our token somewhere in the user object, but
firebase doesn't know that we are authenticated and we are not attaching that token into the outgoing requests and therefore
firebase has no chance of understanding that we have a valid token(because we are authenticated, we have a valid token).
Important: So we need to add that token to the outgoing request to let firebase know about we have a token and therefore we are
 authenticated. So for doing that, we need to manipulate our outgoing HTTP requests like fetching and storing data which
 need the user to be authenticated.
Hence we need to look into the data-storage.service, where we have fetchRecipes and storeRequests and those requests need to
we attach our token(the token we are storing in the user object which is a subject in our auth service) to them.

For doing that, let's inject auth.service to data-storage service and then we need to get access to the user object in those
request declarations. Now we could set up a subscription to the user object BUT we don't care about every change to the user object
which is a subject(because we knew we subscribe() to a subject in order to get informed about the changes of that subject).
Instead when we try to send store or fetch recipes http requests, we just want to get the token of the currently authenticated
user and we don't want to have an ongoing subscription to the changes of user object which is a subject.
Hence in the auth service, we now should also store the token or the user object in a way that we can access it through different
means. So not through a subject which is great for reactively updating the user interface but we also have a way of on-demand
fetching of the user object. Now there are couple of ways of acheving that, since we are only interested in the token of user
object, we could just store the token in the prop of AuthService which initially is null and eventually(after
the user authenticated- So we can set the type of that prop to string, although initially it's null) will hold a string eventually
and we will set the token to token prop whenever we also emit a new user subject.
That approach would be possible and wouldn't be wrong but we can also use a different type of subject.
So let's change the type of user subject to BehaviorSubject.
Learn: BehaviorSubject behaves just like the other Subject, which means we can call <the prop which holds the subject>.next() to
 emit a new value and we can subscribe to it to get informed about new values which that subject emits.
 The difference is that BehaviorSubject gives subscribers immediate access to the previously emitted value even if they haven't
 subscribed at that point of time which that previous value was emitted.
 This means we can get access to the currently active user even if we only subscribe after that user has emitted.
 So this means when we fetch data and therefore we need the user token at that point of time, even if the user logged in before
 that point of time which will be the case, we get access to that latest user object. Therefore, BehaviorSubject needs to be
 initialized with a starting value.

Now in data-storage service, now we can reach out to the auth service and get the currently active user and then for example in
fetchRecipes we don't want to make an ongoing subscription to the user by subscribing BehaviorSubject but still we need to
subscribe to get the user object.
So to make sure we only get the user once and thereafter we're done, of course we could manually immediately call unsubscribe()
when we subscribe() to the user BehaviorSubject like:
this.authService.user.subscribe().unsubscribe();
OR you can use .pipe() and then use take() rxjs operator.

So we didn't want to get informed about every change of user object, we just wanted to on-demand fetching of the user object.
Learn: take(1) means we only want to take one value from that observable(which in this case is user BehaviorSubject) and thereafter
 it should automatically unsubscribe. So this also manages the subscription for us and gives us the latest user and then
 unsubscribes and we won't get future users because we just want to get user object on demand when fetchRecipes() is called.
 So when fetchRecipes() is called we get the latest(because we are using a kind of subject, although we are not actually getting
 it everytime the user object changes, in this method) user and then we unsubscribe from that BehaviorSubject.
 If you used an ongoing subscription we would get the all of the users when they changes even when we don't need them. Because
 we just want to get the current user(if we have of course!) when user wants to fetch recipes. So we subscribe to that
 source but by using take(1) operator.

Important: A subject is great for reactively updating the UI.

17. Attaching the Token with an Interceptor:
We can use the same logic we used in fetchRecipes() in the storeRecipes() too. But since we are using the angular HttpClient
we could also use another feature offered by that client because what we do there in fetchRecipes() and storeRecipes() is we
manipulate all those outgoing requests in the same way and we can use an interceptor.

Important: We can use an interceptor to manipulate our requests instead of manually copy some logic for some requests multiple
 times.

So let's add that interceptor in auth folder, because it is used for attaching a token for authenticating the user for the
firebase(the user is authenticated by app but he still needs to be authenticated for sending requests to firebase.)
So that interceptor is an authentication-related interceptor it must goes to auth folder.

Now, after creating the interceptor class, in @Injectable() don't add an object with providedIn prop for it, because we will
provide this service differently than others and we have to provide it in such a way angular understands it.

The intercept() method needs to get 2 arguments- req which is a generic type of HttpRequest. That generic type means which type of
data that request will return eventually. Also we need to provide the next arg of type HttpHandler.
-->
<!-- 18. Adding Logout:
Before storing the user token in a presistant way on the user computer, so it would exist even if the app reloads(because currently
reloading the app would cause losing the state of user) and also before protect certain routes. Let's add the logout functionality
to auth service.

Now we need to presist the token so it won't gone once we reload the app.

19. Adding Auto-Login:
So we must make things up so once we are authenticated, we don't just keep that status as long as as we're navigating around in the
app, but we also keep that token when we reload the app.
Important: Because when you reload the page, your angular application restarts and the old angular app is dumped and since
 currently we're managing everything in memory, so remember currently we are storing the token(which is our identifier
 for authenticated and unauthenticated user) in the user model which happens in javascript only and which therefore happens
 in memory. Since we manage it all in memory, we'll lose all that state whenever the application restarts because that memory
 gets cleared automatically.
 There is no connection between the last time we ran this angular app on this web page and the current time we are running it.
So there is no connection and therefore memory is lost. So if we want to store that token, we have to store it somewhere else and
not in a javascript variable or a class prop. We have to store it in a persistent storage which must survive the page reloads
and browser restarts, that we can write to that persistent storage and also we can fetch data from that storage.

Learn: In a browser, you've got different storages, you can't access the normal filesystem on your device but you can work with
 cookies or local storage of browser which is an API exposed by the browser to store simple key-value pairs basically on the
 filesystem but controlled by the browser and we will use local storage in this project to store the user token.
To do that, let's go to handleAuthentication() method in auth service which that method is where we do create our user object
and emit it to our application and there, besides emitting it to the application, we also want to store it in browser storage.
localStorage.setItem() allows you to write an item to the local storage and store data there.

Important: Right now, we want to store an object in localStorage which is the user object, but you can't simply pass
 javascript object to second arg of setItem(), instead we have to convert it into a string. So we can use JSON.stringify(<object>).
 JSON.stringify(<object>) , serializes a javascript object or in other words, it converts a javascript object to a string
 version of it!
Now after authentication, if you go to application tab of devtools and then go to Local Storage you can see the userData key
which you set in setItem() method and it's value and it's a javascript object which is converted to string.

Now with all of that being stored there, we can also retreive it from there when application restarts.
For that, let's add a new method named autoLogin() in the auth service file. Why we named it autoLogin?
Because it basically is a method that will try to automatically set the user to login when the application starts and it will do
that by looking at the local storage of browser and checking whether there is an existing user snapshot stored or not.
So in that method we need to retrieve data from local storage.

localStorage.getItem() is a sync method.
-->
<!-- 20. Adding Auto-Logout:
We need auto logout too! Because our token will expire and it has an expire time of one hour from when we get it and therefore
right now we have a bug in our app because the token will expire but our application won't reflect that. So we are automatically or
manually by logging or signupping the user, logging in the users in forever. Because we have that snapshot of user object in local storage
and we never clear that snapshot. So we should clear that user object in local storage when we logout, but right now it will never
clear automatically. Because if the token expires after one hour, nothing changes in our app. So first in auth service, we should make
sure that since we store a snapshot when logging in(or sign up), in the logout we must clear that user object in localStorage.

Now we also need to set a timer which starts when we get the token for the first time, so we know when to invalidate that token
at a later point of time and for that we create autoLogout() method in auth service.

Learn: You can get the time in milliseconds from a variable or prop which is in Date type, by calling .getTime() on it.
 So for example you can say: new Date().getTime() which returns the time of current time in milliseconds.

21. Adding an Auth Guard:
We want to PREVENT the users from visiting /recipes if they are not authenticated.
Learn: A route guard allows us to run some logic, right before a route is loaded and we can deny access if a certain condition
 is not met. You can name the class of guards, like AuthGuard or like AuthGuardService, because they are technically services.
 So we need to use @Injectable() , because the guards are basically services.
 The class of guards, must implement CanActivate interface. So you also need to implement canActivate() method in class of that guard.
 Also remember, the canActivate() method, needs to be implemented in a certain way. Because it has to receive the currently active
 route(which we name it route) which is type of ActivatedRouteSnapshot. Also this method needs to get the router state
 (we named it router) which is of type RouterStateSnapShot.
 Also canActivate() HAS TO return either a boolean or a promise which eventually will yield a boolean(so we need to use generic
 type for that) or an observable which will also eventually yield a boolean value.

In canActivate() we want to return the status as we can derive it from our auth service. So let's inject the auth service in that
guard.

Learn: !!user is a trick that converts a true-ish value (in this case it's user) like an object(anything that is null or undefined),
 to true so to a real boolean or it converts a false-ish value like null or undefined to a real boolean and in this case the value of
 that boolean would be false.
Now go to app-routing module and add canActivate prop to the prop you want to protect with a guard.

We used a BehaviorSubject for user object and not a Subject because a BehaviorSubject unlike a normal Subject,
always gives us to the previous value and that helps us ensure that we can get access to the user object even if in this
part of the application where we need it, we missed the previous emitted user(missed means for example we are using a take(1)
operator and therefore we don't have an ongoing subscription to that Subject and we just need the lates emitted value. So
if you use Subject, you can't get the latest emitted value of Subject, because normal Subject don't let the observers get
immediate access to previous emitted value, so we need to use BehaviorSubject). But why in take(1) we say we are looking for
the LATEST emitted value of that BehaviorSubject?
Because we haven't an ongoing subscription to that BehaviorSubject, therefore we don't get informed immediately when a new
value of BehaviorSubject is emitted. So we can't use just normal Subjects for using in take(1) observer. Because take(1)
makes the observer to doesn't always observing that obs and when that file or that code gets executed, it needs to get the
latest emitted value. So that Subject needs to maintain the previous value in order to inform the observers which havn't an
ongoing subscription to that BehaviorSubject.-->

<!-- Dynamic Components:
Dynamic components are components which you can create them dynamically at runtime. So let's say for example you want to
show an alert or a modal, which should only be loaded upon a certain action. That modal should be implemented by using a dynamic
component. So we need to load that kind of component ON DEMAND and also we need to get rid of that component. Because a modal
or ... always shouldn't be shown!.

2. Adding an Alert Modal Component:
Let's create an alert dynamic component in shared folder.

3. Understanding the Different Approaches
Dynamic components in general just means that you wanna display some component dynamically which means that component is not
always there but it's there once sth specific happens in your code. Therefore you typically want to control programmatcially
when that component should be loaded or displayed. One way of controlling that is to use *ngIf. *ngIf way use a declarative
approach, which means you simply add the component selector in your template and then you use *ngIf to only load it when a
certain condition is true. So you use *ngIf to control whether the DOM really has that condition to display the dynamic component
or not.
RECAP: In *ngIf the dynamic component embedded via it's selector(declaratively)
       *ngIf controls whether the component is added to DOM or not.

The alternative approach is sth in the past named dynamic component loader. This was a helper utility that you shouldn't use it anymore,
but in the end, now it's a general concept about creating a component in code and then manually attaching it to DOM.
So in this approach, in the code you must control how that component is instantiated and data is passed into it and also when that
component must be removed by yourself.
SO everything that *ngIf automatically does for you, in this approach you must do on your own.
But this approach allows you to control it entirely from your ts code and don't have to touch the template for loading that component
and ... .

4. Using ngIf:
Using *ngIf approach is better where in this approach you show some component when some condition is met.

Now let's use other approach where we create the dynamic component ENTIRELY in code and also control it from there.

5. Preparing Programmatic Creation:
Let's comment the *ngIf approach for showing app-alert component.
Now we need to create that alert component programmatcially and show it programmatcially  from inside the .ts code.
For that, let's create a new private method in the component which we want to show that dynamic component. So I created showErrorAlert()
in auth component and this method in this case has to be called whenever we have an error and therefore in onSubmit() method, when
the obs throws error, we must call this new method in order to show the error alert. Also we pass the error message to that method.
Now we don't need that error prop, which we were using it in template file, but still I didn't comment it.

Important: It's better to name the attr directives: app<name of directive> . So for selector prop of directive we would have:
 selector: '[app<name of directive>]' for example: '[appDropdown]'.

6. Creating a Component Programmatically:
Now we created the placeholder directive, let's go to the place where we want to add that directive and therefore the dynamic component,
which is the auth.component.html . Now you could use a normal <div> for using the placeholder directive on it, but there's a better
element in this case which is <ng-template> .
Learn: <ng-template> is a directive which will not actually render anything to the DOM but still is accessible in the
 angular templating language. So using <ng-template> instead of adding another HTML element for a placeholder to outputting the
 dynamic component is great because we don't add the overhead of an extra DOM element there, instead we can simply just get access
 to a place in DOM in order to output that dynamic component. Now let's add our placeholder directive to <ng-template> .
 So we can get access to a place in DOM without actually render anything there with <ng-template> and using placeholder directive.

So now we have that <ng-template> element which is considered by angular when it parses the template file but which does not
render a real element to the real DOM which is useful in our case, but we will be able to get access to that <ng-template> in
DOM, because it is simply remembered by angular.

Learn: We can get access to <ng-template> directive, by using @ViewChild() and we must pass a selector to () of @ViewChild() also
 you can pass the NAME of local reference as a string to it.
 Also you can pass a type and it will look for existence of that type in the template file of that .ts file.
 So in this case, if we pass the placeholder directive as a type to @ViewChild() , it will automatically find the FIRST PLACE
 where we used that directive with the given type to @ViewChild() , in the template of that .ts file.
Important: When you want to pass in a type to @ViewChild() don't pass it as a string. Then @ViewChild() will try to find the
 first occurrence of that type in template or DOM.
 Also don't forget to add the {static: false} as the second arg of @ViewChild() .
 Then you must store that @ViewChild() into a property.
In our project, we named that prop which holds that @ViewChild() , alertHost. Because it will be the place where we host our alert
and that prop would be of type PlaceHolderDirective because that prop is holding a @ViewChild() which is pointing to a type of
PlaceHolderDirective.

So now we get access to the directive we used in the template by using @ViewChild() and we store that reference into alertHost prop.
Now we can use this prop which holds a property named viewContainerRef for the factory which is for outputting the dynamic component.
We can get access to that viewContainerRef prop because it is a public property of that directive. (You could also work with that
viewContainerRef prop without storing it in a new variable.)

Now the next step is to clear anything that might have been rendered in that reference before, by calling clear() on that
viewContainerRef.
Important: So nw you understand, as I mentioned, viewContainerRef is not just a pair of coordinates of some place in DOM, instead,
 it's an object that allows you to interact with that place in the DOM.
 When using clear() on a type viewContainerRef, simply clears all of angular components that have been rendered in that place which
 viewContainerRef points to it. So it's neccessary to clear anything there, before rendering sth new there.

After clearing everything that is inside of place we want to output the dynamic component, we can use the component factory of
that dynamic component to create that dynamic component in that reference and this is simply done by calling the viewContainerRef
of that place and calling createComponent() on it and createComponent() does not need the type of that dynamic component but instead
it needs the factory of that component. Now it will create that dynamic component in that place.
But we will get an error! Which says: "No component factory found for <type of dynamic component>. Did you add it
to @NgModule.entryComponents ?"

Remember: Each dynamic component has it's own factory. -->
<!-- 7. Understanding entryComponents:
If you are not getting the previous error that I mentioned and it just works without any errors, because you are using angular 9 or
higher.
But why we get this error?
Because it didn't find a component factory for AlertComponent(our dynamic component). But we created that factory, why it didn't find
it?
Because we need to add that factory to @NgModule.entryComponents.
For this, you need to know how angular works behind the scenes, when it comes to creating components.
Of course any components as well as directives and pipes that you plan to use them, you need to add them to the declarations array
of app.module.ts file. This is crucial for angular in order to understand what components, directives and ... you have in your
application. Because angular does not automatically scan and you need to tell it which components exist. But this alone, makes
angular aware of that component, so it is able to create such a component when it FINDS that declared component or ... in one
of 2 places. Now what are those 2 places?

The first place would be in your template files. So if angular finds a selector like <app-recipe-item> it basically looks into
declarations array, finds it there and therefore it is able to create that component.

The other place where angular will look for create a component, is in app-routing.module and in routes array. In that array, when
you point to a component, angular will also check that component in declarations array and if it finds it there, it is able to
create such a component and load it.

But one place that does not work by default, is when you want to create a component MANUALLY IN THE CODE which is what we are
doing in auth.component. There we're creating our own component factory and passing our component to it and there, angular does not
automatically go to the declarations array. So you have to deliberately inform angular that in this case the AlertComponent(the
component that we're trying to create) will need to be created at some place and angular should be prepared for this.
So now angular will prepare itself for that creation when it finds that component in a template or in the routes config(
app-routing.module file).
Now in order to tell angular to be prepared for creation of that new component, you need to add a special property to the object
you passed to @NgModule() in app.module file. So add entryComponents prop which is an array to that object. It's an array of
types of components, but only components that will eventually need to be created without a selector or the route content being used.

Important: So whenever a component is created by it's selector or you use that component in the route configuration, you
 don't need to add the type of that component in entryComponents array.

Depending on the angular version you are using, you might not need entryComponents array. So if you are working with ng9 or higher
you can omit entryComponents by default because in those versions, angular under the hood, uses a different rendering engine(Ivy).
But if you use that prop, it doesn't throw errors.

Now angular is ready to create that component whenever you prompt it to create and you prompt it, by using createComponent() .
Now you created that component, programmatically. But there are some problems.-->
<!-- 8. Data Binding & Event Binding:
Currently we do have @Input() and @Output() for getting the message from parent component and show it in that component and for
closing that alert box. But we're not using property or event binding on our component at the moment. Because we created that
component in the code, so we can't use [] or () for property and event binding.
So when you create a component by code, you can't use () for event binding and [] for property binding on that component.

Important: So how we can pass data into that component which is in parent component (passing data to a component is possible by
 using @Output() in the child of that component folder, or by creating some props in that folder and use them on that component)
 and how we can listen to an event on that component or remove that component(because it's a dynamic component)?
Well, we simply have to store the component that we created in some const or variable, so we can work with that component thereafter.
So we must store the result of createComponent() in a variable or ... . In this case, the name of that variable is componentRef.
Because it's just a reference to that component.
Now we can interact with that component by using that variable.

There's no too many use cases of using the second approach of creating a component dynamically, but if you are author of a library
and you want to give the users of your library an in-code way of showing a component, that would be the case of second approach.

The content that are inside a *ngIf, won't show up until the condition is true. So you are not cluttering your DOM with unused
content. Because they won't even show up if the condition of *ngIf isn't true.

Recap of second approach:
You create your own component factory and then you use a viewContainerRef which you can get access to it with a helper directive,
to dynamically create AND render your component and any component that are rendering like this, needs to be added to entryComponents
array in your @NgModule() .
 -->

<!-- 22. Angular Modules & Optimizing Angular Apps:
2. What are Modules(angular modules or NgModules):
Angular modules are ways of bundling angular building blocks together. Angular building blocks could be components, directives,
services, pipes.
You have to group them altogether into angular modules in order to make angular aware of those feature.
Why we have to do that?
Because angular doesn't automatically all of the files in your project, so it doesn't search all of the code you write and therefore
doesn't automatically detect all components and services and ... . Instead YOU need to tell angular what is a component, which
components do you have and you can bundle them together into modules.
Every angular app needs to have at least one module which is app module. You can't have an angular app without that module I mentioned.

Angular analyzes NgModules in order to "understand" your application and it's features. You use NgModules to define all of the
core building blocks(components, directives and ...) of your application.
Learn: So angular modules define all building blocks that your app uses.
and an app requires at least one module(app module) but might be split into multiple modules.

You also have the core angular modules which are wrapped into modules, things like formsModule. So angular itself also provides
certain features which are grouped together into such modules, therefore you don't have to declare like for example 10 different
form directives. instead that forms module gives you all of those directives.

You can't use a certain feature or building block, without including it in a module. But how you include it in a module?
You add that building block(important: A building block means a component or ...) to declarations array or providers array, depends
on the feature(building block) you are talking about.

3. Analyzing the AppModule:
We use app.module and app-routing.module to set up certain things and group them together.

We have declarations, imports, providers, bootstrap array.

In declarations array of app.modules, declarations is an array of all of the components, directives and custom pipes that
when we want to use them we add them to that array. So all of those things have to go to declarations array, otherwise you can't
use them in your templates or in your routes.

We also have imports array which allows you to import other modules into that module we are currently in it.
So imports array is crucial for splitting your app into multiple modules. Thus far, we created only one extra module which is
app-routing.module and therefore we added it into imports array of app.module . But we are also using a couple of modules which ship
with angular, like the FormsModule, the ReactiveFormsModule and ... .
Now if we look into such those modules, we would find a module with @NgModule() as well and in there, we would have a declarations
array with all the form related directives(the related directives to that module) that angular supports.
Those directives are like: automatically detecting a form element to create a form with the template driven approach or the
required or the email directives. So all of them are basically included in the FormsModule, therefore you don't have to
add all of those features which are included in the FormsModule, individually in your appModule declarations array. Because
they are already in the declarations array of FormsModule and therefore by using that FormsModule, you are already including
those features too. So we can simply import the FormsModule which speeds that process up.

The providers array we define all the services that we want to basically provide. But the relation between services and NgModules
are a bit different than components and declaration or ... . Because it's not the case that you can only use a service in the module
where you provided that service or at least that's not always the case. But we will come back to this subject. For now just
know that ANY service you plan on injecting it, needs to be provided and typically you do that in app.module OR you do that
by adding providedIn: 'root' in the object that you pass to @Injectable() in the file of that service.
That's an alternative for adding that service to your app.module providers array.

The bootstrap array is crucial for starting your app. It defines which component is available right in the index.html file
(in index.html , we instantiate app component and therefore that is the component for starting the app) and typically you only
have one component there. You could have multiple components(which is why bootstrap is also an array) in index.html but then
in that case, each component would kind of be detached from the other components. In other words, in that case(when we
have multiple bootstrap components), you would create different root component trees in your application and that's rarely what
you want. Because by doing that, it makes working those components way harder.
So therefore, you typically have one root component and you add it to bootstrap array, which by default that root component is
AppComponent.

Also we have entryComponents array in there. That array is crucial for components you create IN CODE, as you learned in dynamic
components section, that entryComponents allows angular to be aware of that dynamic component when it(angular) needs to create it
programmatically.
Also currently we have app-routing.module which we also added it to imports array of app.module file.

The AppRouting module is there to hold our route configuration. We absolutely could add all of that code in AppRoutingModule file to
AppModule file, but we only outsourced it because that's quite a lot of code and by doing that it keeps our AppModule a bit leaner
and that's already one of the reasons for why you might want to split pur application into multiple modules. It can make your
existing modules leaner and more focused and easier to edit and maintain.

The app-routing module imports the RouterModule that angular offers us in its' imports array of object that we pass to @NgModule()
and also uses a special method offered by that module(RouterModule) which is forRoot() and this method takes our route configuration
to configure the angular router with our route config and then sth crucial happens.
In the next line of that imports array, we export that RouterModule from app-routing module. Why?
Learn: We need to do that, because every module works on it's own in angular and they don't communicate with each other. So if you
 declare a component in a certain module like app module(when I say declare it in a module it means add it to declarations array of
 that module), we can ONLY use it in there and no where else.
 So when we declare a component in a certain module, we can use the selector of that component in other components of that module and
 not other module.

For smaller applications, we need our route configs which are passed into .forRoot() of AppRouting module to be available in
app.module file. In order to do that, we have to export the RouterModule which has our route configs, so that's not just available
in the app-routing module which won't be helpful at all, but by importing it in imports array of app.module, we make it available
in that module and available in components and ... that we declared in that app.module too.

Learn: So when we import module1 in a module2, we import everything that module1 exports in it's exports array.

So this was how you can configure RouterModule which ends up in the AppModule and is available in that module. This was for
small applications.

Also splitting modules is for enhance performance, not automatically by splitting components, but splitting components will be
a crucial PREREQUISITE to THEN also enhance performance. -->
<!-- 4. Getting Started with Feature Modules:
When we're working with multiple modules, instead of having one big app.module , we can split that into an app module that defines
our app.component and then we have 2 separate new modules which are called feature module

So instead of having this:

  AppModule                    AppModule            ProductsModule (feature module)
AppComponent                  AppComponent            ProductListComponent
ProductListComponent                                  ProductsComponent
ProductsComponent         =>                        OrdersModule (feature module)
OrdersComponent                                       OrdersComponent
HighlightDirective                                    HighlightDirective
....

A feature module groups components, directives, pipes that are used in a certain feature area of your application.
Splitting your app into such feature modules is the prerequisite for performance improvements and that also ensures that when other
developers work on your code, you quickly know where to look for the setup for that specific part of your app.

Now which features we have in our project?
Recipes feature area, shopping list feature area and auth feature area where we have all the components and all the logic related
to authentication.
The header and the shared components are not really the features of the app, because the header component is part of the
app component, we do render it there. So the header component definitely belongs to the root of our application(app component)
and regarding the shared components, IN THIS APP(not bigger apps) we might only use certain features in certain parts(and not all of the
parts) of the app, for example we only use the alert component in just auth component and no other places, but it would make sense
that we share that alert component across different features of our application. Because you COULD showing an alert in recipes area as
well when you failed to load recipes.
So the alert and the shared things, we'll take care of them later and they're not really a feature of this app so they don't need a
feature module for themselves.

For creating recipes module, first create a recipes.module.ts file. So just like we have the app.module for our GENERAL application,
so in app.module the core is setup for entire app, we now have recipes.module which should be responsible for defining the building
blocks of the recipe feature area.
@NgModule takes an object to configure that module. Now let's cut all of the recipes related components from app.module and move
them to recipes.module file , but it's not suffice. Because the question now is:
How we can now use our RecipesModule in the AppModule?
For that, add the exports array in the recipes.module file and export all of the components which we declared in that recipes module,
with that, now the things that we exported are also accessible in any module that imports the module that those things are
exported from that module and that could be app module too. So now, add the RecipesModule in the imports array of app.module .
Also don't forget to import that RecipeModule file in app.module and also don't mistake it with the imports array in NgModule({})
is there for angular to add features of other @NgModule()s into that @ngModule(), but the import {} ... from ...; statement is a
TS feature to tell TS where to find that type that it sits in another file and that statement has nothing to do with angular.

Now if the app compiles, we get an error which says: 'router-outlet is not a know element.' and the problems is that in the
recipes.component, I am indeed using the <router-outlet> there, the problem is that the <router-outlet> is a directive provided by
angular and it's not magically! available in the entire application. It is available by RouterModule which we imported it in the
app-routing module file.
Learn: So RouterModule is not just there to configure our routes, it also add routing features like the routerLink directive which
 we use to add a link or the router-outlet directive.

Now because we exported RouterModule from the app-routing module file and since we imported it in app.module, in the app.module, that
RouterModule and it's features are available. Now you might think, because RouterModule is available in app.module , therefore then it
should also be available in the recipes module, because we kinda add recipes through that RoutingModule, right? I mean we go to recipes route
through the help of the RoutingModule, BUT! this is not how it works.
Important: Instead as I mentioned, everything in a module works standalone. So for example you can export some components from recipes.module
 in order to be able to import those exported things, in another module let's say app.module, but that alone does not mean in the recipes module
 you can use features which are made available in app.module . You can only export sth which then CAN(by importing it) be usable anywhere else,
 but you don't automatically get access to other content. So when you import some stuff from module a to module b, in the module a,
 you don't automatically get access to the things that were imported in module b.
 So in the example that I mentioned, the recipes module and the components in there which are the things that we export them and import them in
 app.module, got absolutely NO access to all things that we import in the app.module . So we don't have access to for example the
 RouterModule that we imported in app.module, in the recipes module or the things in recipes module that we export them and import in
 app.module . -->
<!-- 5. Splitting Modules Correctly:
There are couple of ways to fix that. One way would be that we simply import the RouterModule without .forRoot() , into our recipes module.
Now if you do that, we still get an error because of app-recipe-item which uses ngFor and doesn't access to that, but the thing is, we don't
get that routing error anymore. But the new error is related to *ngFor. Because again, when you create a ne module, we don't magically
have access to all of the core angular features like *ngFor.
Thus far we got all of those features, because we had everything in the app.module, we declared all components in app.module and we had crucial
imports in the app.module which those imports, import core angular features into app.module and therefore any component declared in that module and
was added to declaration array of that module, has access to those features. But components declared in other modules don't get access to those
features and for example *ngIf and *nfFor are provided by BrowserModule or http related stuff can be imported by HttpClientModule, but this
module is kind of an exception, because by importing this module, that would only provides services and no directives or components and
services work differently and therefore indeed they're available application-wide, so even in modules where you don't import HttpClientModule.
But as soon as you use sth which is not a service and offers real! directives or any features you use in templates, as soon as that's the case,
you only have access to what you import in that module(so the services are exception in this context).
So to be able tp use *ngFor in the recipes.module, besides RouterModule, we also need to import BrowserModule in our newly created module.
BUT WAIIIIIIT!
The BrowserModule is the only special case in this context and that is the BrowserModule MUST ONLY BE USED ONCE and that is in the
app.module, because it does more than just add *ngIf and ..., also it does some general application start up work which only has to run
ONCE!
Learn: So when you need some stuff like *ngFor and ... in a new module, instead of importing the BrowserModule, use the CommonModule in those
 places. So instead of using BrowserModule, we use CommonModule in all other places of app.module .
Now with that imported, we unlock *ngIf and *ngFor and now if you see the page, we again get an error but a different one. This time,
the problem is the FormGroup directive and as I mentioned, you only have access to what you import in a module and we're not importing
the FormsModule or in this case actually ReactiveFormsModule, because we're using reactive forms in that module, not the error is gone.

So the crucial things is whatever you declare in that new module and whatever you use in the templates of the components or in services or ...,
has to be imported in that new module and it's not enough if you import those features in app.module, the only exception to this rule are
services, the services only need to be setup ONCE IN THE app.module and then you can access them in your whole application, even in components
which you added to feature modules. But anything that's used in a template of components or .ts files of components, directives, pipes , those
things need to be declared or imported into the module where you plan on using them and it's not enough to use those things in another module,
EVEN if you export those things to the other module you want to use them, so it's not enough. So angular treats and parses every NgModule
STANDALONE.

6. Adding routes to feature modules:
The only thing we're doing thus far is we're outsourcing our recipes component declarations in a separate module. So with that the app module is
a bit leaner, but we can do more than that. We can also move the recipes related route configuration, away from the app-routing.module into our
recipes module. For doing that, in recipes.module and in imports array of that and where we imported RouterModule, we call .forChild() on the
RouterModule.

Remember: forRoot() is only used ONCE essentially, where it was in app-routing.module and we called it to configure our root routes.
But in a feature module like recipes.module , which you plan on importing that feature module into your app.module , you should use .forChild() and
that will automatically merge the child routing configuration with the root routes.
Now in that feature module you can use .forChild() and pass the routes configs of that feature module to () of .forChild() , which we also
did sth similar to .forRoot() (but then we moved those configs to app-routing.module and we will do that for feature modules too!).
Now to keep that feature module leaner, we can again create a separate module which is <feature>-routing.module and we only did this, in order to
really focus on route setup in that new file and not clutter the recipes.module.ts file with those route configurations.
Now let's cut all of the recipes related routes with their nested routes from app-routing.module and move them to recipes-routing module.

Then in the object we passed to @ngModule() of new created module, we have to add the imports array and in there add the RouterModule and as
I mentioned, you need to call .forChild() on that module(so as you can see, it doesn't matter where we set up our route configs, so it doesn't
matter we set them up in recipes.module or outsource them to recipes-routing.module , you HAVE TO call .forChild() on RouterModule and in
() of .forChild() you need to pass your route configs or the variable that holds your route configs.).
Then we need to export that RouterModule, so add exports array in that object you passed to @ngModule() of newly created module and in there
add RouterModule.

So we exported that RouterModule from recipes-routing module, so now in the recipes module we can actually import our RecipesRoutingModule which
we exported from recipes-routing.module . Why?
Important: Because the feature module needs to have access to feature-routing module file. So we had to export them from feature-routing module and
 then import them in feature module.
Now we are adding the routes config of feature module into that feature module but also we currently are importing that feature module into
app module and since we registered our recipes related routes in that recipes module, those routes should still be part of our general routing
config. The routing config is now just split across two files.

So now we manage all recipes related things(including recipes related routes) in our recipes module and not anywhere else. -->
<!-- 7. Component Declarations:
A crucial not about components we load via routing:
For example the recipes.component is loaded whenever we visit /recipes and the recipes component is declared in recipes.module .
Now if you remove it from declarations array of that module, now the app doesn't work and the error says: Component RecipesComponent is not
part of any NgModule or the module has not been imported into your module. So it's really crucial to understand that it's not enough to just
point at the component you want to load when we navigate to that url, but also you need to have it at declarations array of that module.

The other thing is now that we manage the loading of our components via recipes-routing module and in no other module, there's no reason
to still export those recipes components because we're now ONLY using them internally in the recipes module and no other module and in recipes
module we use those components either embedded into other components of that same module or by loading them through the recipes-routing.module and
either cases, both the files are part of this module(recipes module). So there's no reason to export the recipes components anymore because
because we're not using those recipes components that we were exported in other modules. So I commented out those exports.

8. The shopping list feature module:
So that was our first feature module which was the recipes module.
First in the shopping-list folder, let's create shopping-list.module.ts . Then in the object that you pass to @NgModule(), you have
to declare what you're using in that module and also you have to export what you're using elsewhere. In other words, you have to export
the things which are inside this module buy you're using them our of that module(but this step is after we actually import the things that
we're using in this module by cutting them in the module(probably app.module) that they were before and cut them in our new module and after
doing it, we can see what we're using out of the shopping-list module and then export them and import them in the module that we're using them.)
Now let's go to app.module and CUT shopping-list.component and shopping-edit and paste them in declarations array of shopping-list.module .

Now we could import that shopping-list module into the app.module and of course before that we also have to make sure we add all things that the
shopping-list components need, into the shopping-list module. Now also we want to manage routing in the shopping-list module as well and in this
case we don't want to create a new module for routing of shopping-list module. So let's grab the routes related to shopping-list module and
paste them in .forChild() of RouterModule in the shopping-list.module .

Also we don't need to export the RouterModule from shopping-list module, because we only do this when we had a separate Routing-module for that
feature module. Also we need to import CommonModule and also FormsModule(because we're using template driven approach in the components that are
declared in shopping-list module).

Now let's go to app.module and add the new feature module there.

9. Understanding the shared module:
We had a look at feature modules, now let's know about shared modules. Now what's a shared module?
In this diagram of an app, we got 2 feature modules and of course we would also have an app module and as you can see these two modules only
differ in one component and all the other components and directives that they use are essentially the same.
So you can put those shared features, shared components, directives and even other modules into a shared module which then you have to
import that shared module into both feature modules. So the initial modules are:

                      shared modules
         ProductsModule             SalesModule
        ModalComponent              ModalComponent
        DropDownDirective           DropDownDirective
        FormsModule                 FormsModule
        ProductsComponent           SalesComponent

and after creating and moving the shared things to that shared module and then importing the shared module into feature modules we would have:

                      TODO shared modules
               ProductsModule            SalesModule
                              SharedModule
                ProductsComponent         SalesComponent

Currently, in our app, we have no real shared feature across our feature modules and if you look at the shoppingListModule and RecipesModule,
the only thing they have in common is CommonModule which unlocks *ngIf and ... . Now we COULD put it into a separate shared module and we will
do it but this alone would not be worth it because then we just import our shared module which that shared module has to export the things it
exposes to module that import it which in this case CommonModule.
Important: The things that module1 exposes, must be listed in the exports array of that module and without doing that, if you import that
 module into another module, actually it won't have anything to expose!

But we also have the alert, loading-spinner, placeholder and the dropdown directive as shared stuff. But the data-storage service is not a
shared thing, because important: Services are special in the shared context.
Now let's create a shared module in the shared folder. Also remember you can have multiple shared modules and therefore they don't have to be
named shared.module , but if you have only one shared module, it makes sense giving it's name as shared.module , otherwise you should give them a name
that kind of summarizes the features that you're grouping those features in that shared module.

Now the crucial thing is that you still now declare and import anything into this module that might be used by other modules but since
every module works standalone, in order to make those things available in other modules, you need to export those things from that module in order
to other modules be able to receive them by importing that other module.
Also don't forget to add the modules that the components or ... of that new module need them, in the imports array.

Then since we don't want to use the features(components and ...) only in the shared module, but also we want to import that module into
other modules, we have to export those features and also the CommonModule(because we needed that CommonModule in some of our modules,
therefore I added it to sharedModule, although the sharedModule itself needed that CommonModule-but because other modules needed that
CommonModule, we also added it to exports array of sharedModule, so with that, moreover of the components and ... that we added to exports
array of shared module, we also export the CommonModule and other modules by importing that SharedModule, have access to CommonModule, so
we can delete the CommonModule from those modules) in that module.

Now if you import the SharedModule into another module, you get an error which says:
The dropdownDirective is part of the declaration of 2 modules.
Important: The error that we get is because you can only define components, directives and pipes ONCE. You can't do that multiple times.
 But you CAN import a module into multiple modules(and that's a good thing! Because it means you're elemanating duplication). So it's fine if we
 import the RouterModule in RecipesModule and also in ShoppingListModule they are OK.
 So multiple imports are OK, but multiple declarations not!
 So for example if you declare ShoppingListComponent on the ShoppingListModule, you MUST NOT declare it anywhere else even if you need it in
 another module. The obvious solution is to export it from where it's declared and import it's containing module into the module that you need
 that component or ... .
Now if you delete the duplicated stuff that we already have them in sharedModule, from app.module, you notice we have entryComponents array in
app.module with that duplicate component. So you can add the duplicated things in app.module and add them to entryComponents array of
sharedModule.
At the end we need to import SharedModule in app.module, because we need those features in app.module for example in HeaderComponent of
app.module , but we couldn't declare them again in app.module and therefore we delete them and add them to SharedModule, now we need to import
that SharedModule in app.module .

Also even if you don't actually add the duplicated stuff in a module but still import them with TS import statement, angular will throw error.

So we use exports and imports array to share the stuff that are in one module to another module. -->
<!-- 10. Understanding the core module:
module types: 1- feature module 2- shared module 3- core module , the thing that is different between these modules is the stuff we put in
them and how we use those modules.
After feature modules and shared modules let's look at third crucial module type core module.

The core module exist to make the app.module a bit leaner. For example let's say in the app.module, we have the app component and also
we're providing two services. Then we can use a core module to move those services out of the app.module into core module which then that
core module needs to imported back to app.module (because we're using those services in app module but we just outsource them in other
module.)
Learn: The alternative to that is to use providedIn in the object that we pass to @Injectable() on the services which that means we don't have to
 add them(services) to providers array. But if you add it to providers in the appModule, well then using a core module can be an idea to keep your
 app.module leaner. Use provided in pattern because it's recommended. But if you do provide your services in providers array of app.module(means you
 didn't use providedIn: 'root' pattern), then this is a pattern you want to use:


AppModule                             AppModule          CoreModule (or use providedIn prop)
                                                          ProductsService
AppComponent                          AppComponent        AnalyticsService
ProductsService       ->              CoreModule
AnalyticsService

Now in our app.module and in it's providers array, we have the ShoppingListService and RecipeService and our interceptor and the reason
we have those services there is that we didn't use providedIn: 'root' in the files of those services.

The idea behind the core module is that we simply provide all the application-wide services(including the services that are currently in
providers array of app.module and therefore are application wide and also the services that have providedIn: 'root') that are crucial
right from the start of the application, in a separate module which we then import it inti the app.module and this task is just to
keep the app.module leaner and to have a way or a place where we can quickly see all the core services of this app(because those services in
core module are all application-wide).

As I mentioned, that core module only make sense or is only a pattern you may use, if you're currently providing a service by adding it's type
to the providers array of app.module . BUT if you're providing a service by passing an object to @Injectable where we set providedIn: 'root',
then that service is provided application-wide and you can't and shouldn't add it to providers array of app.module and actually that is the
approach recommended and it's not good to provide services in app.module , but instead we provide them by using providedIn: 'root' .
Actually the effect of both approaches are the same but the latter(providedIn: 'root') keeps the app.module cleaner and leaner.
Important: But still for interceptors you have no alternatives and therefore you have to add them to providers array.
Now let's create core.module next to app.module file and then in that new file, we add providers array and then CUT the things that we had
in providers array of app.module to that new file.
Important: You don't need to export your services from core.module because services work differently than declarations and we know that
 only declarations and other modules(also about imports array: you only export them if the module that you're importing this module into it, really
 need that thing in imported array, if not, you don't export it. For example we sometimes export CommonModule from module1, because some modules need
 it) need to be exported and services are automatically injected on root level and therefore you don't need to export them to make that
 happen, so services are an exception and now without exporting those services from CoreModule and just by importing that CoreModule into
 app.module (even though the CoreModule isn't exporting anything, but it still need to be included into app.module in order to include that
 CoreModule into our build process), we have successfully created and used core.module .

So core module is our place to see the root application services(if we don't use the providedIn: 'root' approach- but for interceptors you
should create this CoreModule(but still it's optional)).

11. Adding an auth feature module:
In the app.module , we still need FormsModule because auth.component needs it, but we can definitely remove ReactiveFormsModule.
Also we need the HttpClientModule because turns out that this is a module that only sets uo some global services, the injectable http service
and we need that.
Important: But we can drop the FormsModule and get rid of auth.component, because we can simply create a new feature module for auth.
 So now, we need to outsource the auth component and it's route into a separate feature module.

Important: When you outsource sth and create a separate module for it, if it has a related service and if that service was provided importing it in
 providers array and not by recommended approach, then you would keep that in providers array of app.module in order to have it application-wide.-->
<!-- 12. Understanding 
 




loading:
Let's dive into first optimization concept. Because thus far, that entire code splitting by separating our modules into separate modules,
was only cosmetical, it makes our code in the individual modules leaner and it can help us with maintaining that code but it doesn't
influence the performance of our app, at all. But that would change by using lazy loading, so using multiple feature modules, is a
PREREQUISITE for lazy loading. So outsourcing code into separate modules itself doesn't affect performance but it's a prerequisite for
performance.
Now what is lazy loading?
Consider this app. We have 3 routes: root route, /products and /admin and we have a user visiting the pages.
Now every route is associated with a separate module which are our app.module and our different feature modules where each module of course
might have multiple components, directives, pipes and ... which BELONGS to that module.
Now when our user visits root route, we load that module and we do the same when user visit the other pages. OR DO WE DO THAT? NO!!!!!
Important: Actually currently, which we're not using lazy loading, whenever user visits any page, we load EVERYTHING. But wouldn't it make
 more sense to only load ProductsModule when user visit that page?
 So by using lazy loading, we only load the code that belongs to those areas of our app when we really need it?
 With lazy loading, we initially ONLY load our root route content, so only the app.module and the code of all components that are registered
 in that module and we don't load the other modules and only when we visit another module, like the admin module(so the admin route),
 we load the admin module code and the code of all the components and ... that belongs to that ONLY module and the advantage of lazy loading is
 initially, user downloads a SMALLER code bundle and we download more code when we NEED it, but initially our app is able to start faster,
 because the user's browser has to download and parse less code on the first visit of a certain route.

                                user

   /                          /products               /admin
AppModule/CoreModule          ProductsModule          AdminModule
      components              components              components
      ...                     ...                     ...

13. Implementing lazy loading:
Currently we have an app without lazy loading. Now if you go to network tab and reload the app for example on the auth page and being
unauthenticated, you see that we download a bunch of files. have 4 extremely big files which are polyfills.js, styles.js, vendor.js and main.js and
we're in development mode which is why they're extremely big and they contain many debug features, with lazy loading we can decrease those huge
sizes. How we add lazy loading to the modules?
Let's start with the recipes.module . Because currently we start the work from where we're not authenticated, so we certainly don't need to
load the recipes module code, because we can't even access anything from the recipes.module . Also it might also not make sense to load the
shopping list module even though WE CAN ACCESS IT WHEN WE'RE NOT AUTHENTICATED, because UNLESS we access the shopping-list page, there's no
need to download that code.
Important: But why we started the work from auth page and in unauthenticated state?
 Well, because that's the place and the state that we arrive at the application. So users arrive at our application, in /auth page(we have
 redirectTo in routing app-routing module that direct the users to /auth even if they go to / page) and in unauthenticated state, so they can't
 even access some modules of our app and they also can access some other modules, but by navigating towards that module.
So you saw 2 things we need to fix and lazy load them now:
1) The modules we can't even access them from the start
2) The modules we can access from start but we don't need to load and download them when we arrive at application or when we even arrive at
specific part of app, we don't need to download other accessible parts of app. So let's start from /recipes area.
Important: In recipes.module we have it's own routes there in recipes-routing.module . Having the routes of a module in it's <feature-routing>.module
 or even not separated and in <feature>.module is a crucial starting point.
 For lazy loading to work, your feature module needs to bring it's OWN routes config as we're doing that in recipes.module and it needs to bring
 it's own routes by using .forChild() .
Now one thing we need to change in routes of recipes module is the path which we change it from 'recipes' to ''. Why?
Because now we need to add sth to our app-routing.module for lazy loading and in app-routing.module we add another route and that would be the
route for recipes, so the path we just removed or changed it from 'recipes' to '' from the recipes.module .
So we added that path again in app-routing.module, but now I don't add a component which I want to load but instead, we use loadChildren prop.
That's a special prop in a route config array which angular understands as: "pleas, only load the code content or the module that I will point
you at it, WHEN user visits this path there".
Now for the value of loadChildren, you use a string and not the type of a component and that string is the path(relatively to app.module) to
the MODULE you want to load when that path('recipes') is visited. So when the 'recipes' path is visited we want to load recipes.module .
ALSO we need to add the name of that module you want to load lazily(because angular can't know that and it needs to know the class name, because
technically it will go to that path and then tries to dynamically import a specific object from that file and theoretically that could be
named anything(but WE(we are good developers!) are of course following the naming conventions, but no one is forcing us to follow that naming
pattern and therefore we EXPLICITLY have to tell angular what is the name of the exported class in that file is? and you do that, by adding a
# (you shouldn't use the extension of the module file in that string)and then the name of the exported class.).
So we might have sth like(in OLDER versions, you should use this syntax): loadChildren: './recipes/recipes.module#RecipesModule'

The effect of that will be that now, the code is split at that point(where the specified module leaves) and everything at that path(so that
entire specified module) and everything that module uses(so all the declarations of that module), will be put into a SEPARATE code bundle which
is then downloaded and parsed ON DEMAND, as soon as the user visits that path, but not sooner and that's simply acheived by angular CLI essentially
analyzing this when we build our app and it will then analyzing the recipes module which we pointed to that module in loadChildren prop and it will
look at what we declare in there and ... and it will put all the things we declared there into that separate bundle which is not build
separately and would detached from our main bundle which with that main bundle our app starts.

A crucial thing for that, to have a real effect and save code, is that you have the TS import statements which are only for recipes.module in that
recipes.module and don't have those import statements also in app.module . So you must only have those import statements in recipes.module and not
in app.module , why?
Because ultimately for the build process, it's crucial what you import at the top of the file. Because the files that those imports point toward them,
all of them will bundle together into one code bundle. So in the recipes.module in the end, the build process will look at those import statements,
which are required for the declarations array items to work and whatever is included there will be included in the same bundle.
So if you have another even unused import statement, lying around your app.module , then that file(s) which that import, imports them, will be
included into the app.module code bundle, even though you're not using the things which that import statement, imports.

So to have the biggest effect and save the most code, make sure your imports at the top, are correct and they're just using in that module and
you haven't any duplicate import. If they're correct, you'll get the biggest possible effect from code splitting.

Now in the recipes-routing.module , it's crucial that you have an empty path, because we now changed the route config(in app.module) in order to
include the path of that lazy load module into app-routing module and with that, it will load that lazy module(in this case recipes module),
whenever the user visit 'recipes' or in better words '/recipes' which is specified in app-routing.module and therefore in recipes.module we ALREADY
are at /recipes and hence at recipes-routing.module , which will only kick in when we do visit that module, we should specify '' for the path of
that module because if we're visiting that module, it means we're already at /recipes which we specified it in app-routing.module .

After adding a new path and the module responsive for that lazy load path, we need to restart the ng server or whatever command we're using.

In newer version of angular you have an alternative syntax for the value of loadChildren which is the path of the module you want to lazy load
it and maybe the older syntax might fail in newer versions. So if you're getting an error like: module cannot be found when trying the
lazy loaded modules out, OR if you want to switch to more modern and different syntax you can do the following:
Instead of having sth like: loadChildren: './recipes/recipes.module#RecipesModule' to identify the module which should be loaded,
you can add an anonymous arrow function there and in the body of that function, you call import() . So you call an import statement, but
dynamically as a function. Then in () of import() you pass the path to the module and you don't add a # tag thereafter to identify that module,
but instead, import() resolves a promise. So now you need to call .then() and in that .then() , you pass in a function which RECEIVES
the module which was loaded in import() and on that received module object, you can extract your modules and in that case the RecipesModule .

So that was an alternative syntax that you can use for loading the modules which are responsible for those paths.
Now if you restart the command you're running, you get an error. Why?
Because in the app.module , we're still importing the recipes.module , but now we're trying to load the recipes.module lazily in the
app-routing.module . So we should only have the lazy load import and other imports should be deleted in app.module . Otherwise we're
importing it both eagerly and lazily at the same time and that causes error.

Also remove the import statements, otherwise it will technically work but you won't save anything in code size.

Now if you look at the network tab, vendor.js is still big because that's just angular, but main.js , actually got smaller.

Of course it makes most sense to lazy load pars of the app, if there's at least a slight CHANCE that the use never visits or using that
part of the app. For example in this app, you could argue that lazy loading the auth page doesn't make too much sense because the user
will always visit that page(actually the auth.module), though I guess that's also only correct, if we assume that the user is already
logged in, so the user will never see the auth page and therefore even lazy loading the auth page might make sense.
But if you have some page which will ALWAYS be visited or with a very very high chance of visiting that page, then lazy loading that page or
in better words, that module, might not worth it, because you have to consider that lazy loading comes with the downside of that extra code
bundle being downloaded LATER and therefore once the user needs that bundle of lazy loaded module, there might be a slight delay in
your app since that code needs to be downloaded and parsed, so you're just postponing that.  -->
<!-- 14. More lazy loading:
Before we dive into optimizing lazy loading, let's add more lazy loading.
For lazy load shopping-list module, fist we add a new route for it in app-routing module and in that route, we point towards the
file of that module WITHOUT it's extension and then # and then the name of the class of that module file we're pointing towards(the old
approach).
Remember: The path we used for path prop of that module is the same path we had in shopping-list.module and in it's .forChild() (or in the case
that you created a separate module for shopping-list module for it's routing, then still we could used that path exactly and without any changes in
the lazy load approach of shopping-list module).
So that array we pass to forChild() (or the array of routes we pass to in-module routing of our modules), is KINDA relative routes that we have
inside that module.

Remember: In import() inside app-routing , m stands for module.

Now we need to REMOVE that route I mentioned in Remember notice from shopping-list.module and in the object we pass to RouterModule.forChild() .
Because that path name not went to the GLOBAL route configs(app-routing.module) where we set up the lazy loading of our modules.

After changes in lazy loading routes and ... , don't forget to restart the command you're using. With that, the changes are picked up and
if you don't do that, sometimes those changes may get lost.
Important: Now go to app.module and make sure you remove the modules that you're not EAGERLY(not using lazy loading) loading them from imports
 array and also remove the TS import statements.
Now in the network tab, you see we have auth-auth.module and main.js(main module) and got smaller, even the vendor.js(vendor module)
got smaller. Because some parts we previously imported, are now only imported by modules. So some parts of the angular framework like the
FormsModule are now ONLY imported when the component that uses that FormsModule, is imported. Therefore now if you login and go to /recipes,
in that point, the recipes.module is coming in(is imported and downloaded by our browser) and if you go to /shopping-list, now the
shoppingListModule is imported and downloaded and you see those imports of modules is popping in the network tabs and that's lazy loading in
action.

Remember: Remove the unused import statements from your modules to optimize lazy loading.

15. Preloading lazy loaded code:
A way for optimizing lazy loading(which itself is already an optimization) is how the lazy loaded code is loaded! Right now, we load code,
whenever we NEED it. So for example as soon as we visit /recipes , we bring in the RecipesModule. The downside of that is, that's downloaded and
parsed just when we need it, leading to a tiny delay. The bigger the module and slower the internet, the longer that delay will be.
Therefore we can tell angular to preload lazy loaded modules to avoid that delay.
For that we go to our root router module(app-routing.module) and in .forRoot() , we pass a second arg which is an object where you can configure that root router.
Then pass preloadingStrategy prop. The default value for that prop is NoPreloading, but now we set it to PreloadAllModules which is a constant.
Important: With that, we know generally we're using lazy loading. Right? So it won't put all that code into one bundle, it will split it. But with this new
 strategy, it will preload the bundles as soon as possible. So when we're on the {path: 'auth' loadChildren: '...'} page, it will already preload
 {path: 'recipes' loadChildren: '...'} and {path: 'shopping-list', loadChildren: '...'}, so that these code bundles are already available when we NEED them.
The advantage is that the initial download bundles, still is kept small because there, that code isn't included and therefore the initial loading phase still is
fast. But then when the user is browsing that page and therefore we have some idle time anyways, we preload those additional code bundles to make sure that
subsequent navigation requests are faster. So we're getting the best of both worlds. A fast initial load and thereafter, fast subsequent loads.

Now if you for example are on /auth, you still see main.js bundle and auth.js bundle and ... are in network tab, but you also see the recipes and
shopping-list module is loaded! and now if you go to for example /recipes , you DON'T see download of RecipesModule when you go there or even if you
go to /shopping-list , you don't see request for downloading that module. Because they already were preloaded.
Remember: Still we had that smaller INITIAL bundle but we benefit from the future bundles downloaded when we're in /auth for example.

You can even build your own preloading strategy where you define your own logic for example controlling only certain routes should be preloaded.

16. Modules & Services:
Now we can finally understand what's special about services and modules. Let's understand where you can provide services and how that affects the instances of the
services you're working with.

1) We CAN provide services in app.module .
2) Also we can provide services in app.component or other comps by adding a providers key to @Component() .
3) We can load services or add services to providers array of any EAGER(not lazy loaded) loaded module.
4) We can add services to providers array of lazy loaded modules.
5) We can also provide services by adding providedIn: 'root' config in @Injectable() and that would be recommended for all services that you planned
on providing in app.module(so this way is better than first way)

Now when you provide a service in app.module or with providedIn: 'root', the service is available application-wide and with the service, I also mean the
same instance of that service is available app-wide. You're always working with the same single instance.

If you provide a service in a comp, no matter if that's the app.component or another comp, then that service is ONLY available for DI inside of that component tree
and then all these comps will again share the same instance but we're talking ONLY about that comp tree and if you provide the service in multiple sibling comps of
your app, then all those sibling comp tress have access to the service but each comp tree has access to it's OWN service instance.

If you add a service to providers of an eager loaded module, you might think that service is only available INSIDE of that module and that every
module where you add a service to it's providers, has it's OWN instance of that service, but actually that's NOT the case.
If a module is eager loaded, everything is bundled together initially and therefore any services you add to providers in an eager
loaded module(for example RecipesModule isn't lazy loaded and therefore it needs to still eagerly loaded by importing it into the app.module),
will be available application-wide with one and the SAME instance.
Important: So adding a service to providers of an eagerly loaded module, has the exact same effect as adding a service to providers of app.module or as adding
 providedIn: 'root' in @Injectable to that service and by doing this, it will provide the same instance of service to the entire app.

Important: But a huge difference can be seen if you add a service to providers of a lazy loaded module. There, the service is ONLY available in that
 loaded module and it gets it's own instance.
If you do provide a service both in the app.module and also in the lazy loaded module, then the service is of course available application-wide, but the
lazy loaded module will get a separate instance and not the same instance you use in the rest of the app(because as I said adding service to providers of app.module,
makes that service available in application-wide, but here because we also provided it in a lazy loaded module, inside that lazy module, we get a separate
instance of that service). Sometimes this can be desirable but in other cases, it might lead to a strange behaviour where you would have expected to work with
one and the same instance when you didn't. The reason for that is when you do provide in app.module or in @Injectable() , you use the root injector, so the root
DI mechanism of angular. When you do provide it in a comp, you use the comp specific injector, which isn't the root injector and therefore not the entire
app has access to that. In an eagerly loaded module, the root injector is used automatically, but with a lazy loaded module, a separate child injector is created by
angular for that module and therefore, that module has it's OWN instance of that service.

Therefore, the default should be that you use the app.module or, providedIn: 'root' in @Injectable.
You of course might have scenarios where a comp tree needs it's own service, for example if that comp tree somehow has a service that only matters for those comps and
it doesn't matter app-wide, then there's no need to provide that service app-wide, instead you can provide it in that comp.

Eagerly loaded modules should never provide services and you should avoid it. Because the effect is the same as in the app.module but it's kind of unexpected
and it's harder to detect services there and therefore you might look for a service and go to app.module(because that service is app-wide but we didn't provided it
in app.module but in an eagerly loaded module, which is unexpected) but don't find it there and therefore confused. Because you might get confuse whether
that service is not intended to be available app-wide or only to that module.

In a lazy loaded module, you can add a service to providers but only do this if you deliberately want to have a separate instance of that service in that module.
Otherwise you can have strange bugs.

Important: So as a rule, generally you want to ensure that services are always available app-wide by using providedIn: 'root' or by adding them to providers
 in app.module , unless you have a strong reason for adding them only in a comp tree or in a lazy loaded module. BUT ANYWAYS, NEVER add services
 in an eager loaded module.

Services and modules:
      AppModule                                                 AppComponent(or other comps)
service available app-wide                                  service available in comp tree
Use root injector                                           use component specific injector
Should be default(it's better to use providedIn: 'root')    use if service is only relevant for that component-tree

  eager loaded module                                         lazy loaded module
service available app-wide                                  use child injector
use root injector                                           use if service should be scoped to loaded module
avoid this!-->
<!-- 17. Loading services differently:
When you provide a service app-wide, all of the instances of that service are the SAME! and it's looks(actually is!) like you're working with
one instance of that service in whole app. So the data of the app-wide service is equal to all of the places it's being used, because we're using the
same object of that service in all places.

Important: An eagerly loaded module is imported in app.module . But lazy loaded modules wouldn't be added to app.module .
 CoreModule and AppModule are eagerly loaded modules.

When you provide the same service both in app.module and a lazy loaded module, you might get some unexpected results and that's because the
instance of service we're using in that lazy loaded module is different than instance(object) of that service in rest of the app. So the data of
instance of service in that lazy loaded module is different than the data of instance of that service in rest of the app. Because the instances
of that services in those places are different. So we have two different objects(instances) of same service. So that lazy loaded module doesn't use
the app-wide instance of that service, instead that lazy module and all of it's comps, use they're own instance of that service which that
instance is created by child injector.
Now if you need that behavior, use it.
But in general, you should think twice before you provide a service in ANY other module than the app.module . Because often it's not the
wanted behavior and you have bugs when using different instances in your app.
Important: So be aware that there are differences in instances you get when you provide services in lazy loaded modules. This rule also is true in
 modules that you import them into lazy loaded modules.
For example, we know SharedModule has a very good possibility of being imported into lazy loaded modules and it also is imported in app.module .
So if you add a service to providers of SharedModule, we know SharedModule is imported into app.module(or in other words, is imported by app.module) and
therefore it's an eagerly loaded module. But it's ALSO imported into shopping-list module . So in there, the SharedModule TO ShoppingListModule is also an
eagerly loaded module but ShoppingListModule itself is lazy loaded which TURNS that SharedModule in that place where it's imported, into a lazy loaded module.
So SharedModule in that place where it's imported turned into a lazy loaded module.

So in our project(possibly in your project too, because it's common to import SharedModule into lazy loaded modules), the SharedModule is both. Meaning it's
lazy loaded in shopping-list.module or through shopping-list.module and it's eagerly loaded into app.module and the effect of that is, we have the issue that the
shopping-list module still uses it's own instance of service provided in SharedModule. Because ShoppingListModule is importing the SharedModule into it and then
it's using the service which was provided in SharedModule, into itself and that leads to use it's own instance of that service in itself(ShoppingListModule), which
leads to bug.

So when you provide services in other modules you get that bug.
You might provide a service in sth like SharedModule, where you think: "yes I'm gonna put all my shared services into shared module". But you might still have
shared services that should use the same instance across entire your app(if they don't need to, well don't worry! But it's rare). Well AS SOON AS you
import that shared module which has some services that they need to use the same instance, into a lazy loaded module, the services provided in the shared module
will be recreated for that lazy loaded module and all of a sudden, you might have a behavior that you don't want.

So whilst providing a service directly in a lazy loaded module MIGHT be sth you control deliberately(because we don't import lazy loaded modules into other modules),
but providing that service in a SharedModule(which can be imported into a lazy loaded module) is a common gotcha where, you think you're using the same service instance
in the entire app, but you actually don't!

So if you don't use providedIn: 'root', you should have a strong reason and you should either be able to rule out that this module you're adding the service in it,
is loaded lazily or you deliberately WANT multiple instances of that service.

18. A head of time compilation:
AOT vs JIT(just in time) compilation:
One other optimization technique before ship our app to production. So before deploying our ng app onto a server.
Our templates include some special angular syntax. The templates are not one to one snapshot that's gonna get rendered into real DOM. Instead
ng will parse our templates and then update the real DOM based on the instructions we places in our templates. So all comps and directives are
translated to commands that will be used to alter the real DOM.
So whilst we use the TS compiler, we also have another compiler in that build process working behind the scenes as part of ng serve which is
angular compiler. The angular compiler is part of the angular app you're seeing in browser with ng serve.
Angular compiler takes the compiled JS code and your templates and translates all the logic there, into concrete instructions that
update the real dom.
This by default, happens all in your browser. Because the ng compiler is part of the ng code you're shipping. This process is called JIT
compilation because ng templates are compiled just in time, when the rendering occurs in your browser. So the angular compiler runs in browser
at runtime. The downside of this, is that 1) this compilation process takes time and also 2) the ng compiler itself(the entire code that is just
responsible for compiling your templates,) is big! It's part of your angular app, even though it has no purpose and it has nothing to do with your
business logic, other than bringing it onto the screen which arguably is crucial but still a bit annoying that it HAS to be part of your app.

    Your code and templates(includes syntax that only angular understands e.g: *ngIf)
              |
              | (downward)
    TS compiler compiles your code to JS
              |
              |
    Angular compiler(automatically included in built code)
    compiles template syntax to JS DOM instructions
   |                                                        |
JUT compilation                                           AOT compilation
Angular template compiler runs in browser(at runtime)   ng template compiler runs during build process(before app is deployed)

The good thing is, it doesn't have to be part of your app, since ng compiler is responsible for converting your template code and your template instructions
into JS commands that the browser understands, we can do that during development, as part of build process and that process is called AOT compilation.
Because we compile the ng templates a head of the execution time.
Then the ng template compiler runs during the build process, BEFORE the app is deployed and not in browser.

The ng serve process as of now by default uses JIT compiler because that's better for debugging and fast updating of the running app and there's nothing wrong with
that. During development, we have no problem with shipping a too big app where the compiler is part of the code, because we're not optimizing the code size during
dev, we just want to have a good development experience with rich error messages. For optimizing run:
ng build --prod
This command uses AOT compilation. Also maybe during the AOT compilation, you face some errors that didn't occur earlier because JIT compiler is a bit
forgiving than the AOT compiler. The AOT compiler does some extra checks.

EX) The tudor gets this error: Property 'controls' doesn't exist on type 'AbstractControl' and the line that threw error was:
*ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls"

So that part works with JIT compiler but the AOT compiler basically doesn't understand that the recipeForm.get('ingredients'), gives us
a FormArray that has a controls prop on it. But it doesn't know what we get back there, it knows we get back an AbstractControl. But we
know FormArray is an AbstractControl but basically an extended version with that extra controls prop but other controls don't have a
controls prop.
The solution is to remove that code from template file and move it into the TS code. There we can add a new getter property.
Learn: A getter property is like a function which you can use like a property in a template or other places and you can't set a value to it
 and you can only read it. The signature of it looks like the function signature with the parentheses and the {}.

After the build is finished, you can run ng serve but it will build the app again.
The dist folder, contains the project name folder.

You can see the size of downloaded files in network tab of devtools.

The ng build --prod , removes the angular compiler from the final bundle. So AOT compilation is a crucial optimization, because it removes the
ng compiler.

19. Wrap Up:
We used lazy loading to optimize our initial bundle size.
We have some special notices about services and their special relations with modules.
You can use preLoadingStrategy to optimize lazy loading even more.
AOT compilation is another crucial optimization that you should use before shipping your app to a server.-->

<!-- SECTION 23. Deploying an Angular App
1. Module Introduction:
Now let's ship our app onto a server that it has it's own domain and people can visit it from anywhere in the web.

2. Deployment Preparation & Steps:
Steps:
1- Use and check environment variables
2- Polish and test your code(code optimization like lazy loading).
3- Build your app for production and that means you run a command that takes all your TS code, compiles it to JS, then bundles all of your together, translates it
into angular language, so that the angular renderer can work with it in the browser and bundle everything up and optimize it to be as small as possible. Because the
app you're shipping has to be downloaded by every user using your app and you do all that with: ng build --prod
That command also implement AOT compilation and that's just one of the many optimizations that the ng CLI does for you behind the scenes.

4- (deployment) Once you built your app, you can DEPLOY those build artifacts or those generated files, to a static host. A static host is a web server that is capable of
serving html, css and JS BUT that's not capable of running any server side language, like PHP or node. WHY?
Because you ONLY NEED html, css and JS. Because an ng app is made up of JUST those 3 things. Of course you CAN have some back-end code, but firebase isn't
our own backend, but you can have your own back-end, but if you're JUST working with angular or in other words, if you're just building a SPA and you're not working
on the backend on your own(firebase isn't our own!), then you in the end, have just html, css and JS and all you need for that is a web server that is capable of serving
those files.

3. Using Environment Variables:
Let's assume that our code is already optimized and we tested it, therefore the only thing that's missing is that we deploy this app.
Before doing that, in environments folder, we can add key-value pairs to that constant(const environment) in those files.
For example, if you were using an api that requires some API keys, then you can store that API key there and you can import that env const into your files in order to
use that API key and what the ng CLI does for you is that it will automatically swap those two files (environment.ts and environment.prod.ts) when you're building for
production. So during development, that environment.ts file and the value you have in that environment obj will be used and during production, that const in that
prod file will be used instead and that would be swapped AUTOMATICALLY. So you don't need to write any special code for that behavior to occur.

Now why is that useful?
You might have certain values that differ from development to production. You might have some API keys that are meant to be used during development and then
you have different keys(which maybe are more restrictive) for production. Or any other value, you can store anything in there, so any value which you need in
your other files and you have the option of using different values for production and development.

Currently, we are using such an api key. In auth.service . In there, we're sending reqs to the firebase backend APIs and there, we're using firebase API key.
That key is the same for signing users up and signing users in and therefore, we could of course manage that key in a constant inside of that file(auth.service) ,
but especially if we were using that key in other files as well, it's definitely worth moving that into environment file. So we added firebaseAPIKey in
environment.ts .
Now after you stored that key-value in environment.ts file, we should ALSO copy that into environment.prod.ts file, because that's the file that will be
used when you build for production.
Now go to the files where you want to use the key-value pairs stored in those env files and in those files, you need to import the exported things from the env files and
we know that in those files, we exported const environment, so we can import it in the files that we need it.
Important: When you're specifying the name of the file for importing that exported environment variable or any other exported thing from those files, you should specify the
 environment file and not the environment.prod file. Because it will be swapped AUTOMATICALLY for you by ng CLI when you build for production. Then you can use that
 imported stuff.

The advantage of that is you can swap values from development to production. It can help you with development.

4. Deployment Example Firebase Hosting:
With the env variables added, we can build the project by running: ng build --prod .
What that cmd does, is
1- it compiles your TS code to JS
2- it also compiles all your templates to JS instructions, so in the end, only JS code is generated, so the JS code that runs in the browser and contains all the
logic for updating the DOM in the way you defined in your multiple components and all the logic you added in your app. That is all done by the bundled up app which
takes the advantage of the ng framework that of course powers all of that.

In dist folder, you have a folder of your project name and in that folder, in browser folder(if using SSR), you have bunch of assets that you might have
included and you also got your main.js, polyfills.js, runtime.js and a couple of other JS files like 6.18ed... .js which essentially contain your angular app. So
they contain all the logic of the angular framework and of your code and you will find some elements which you have stored in your template files.
So you can definitely also search those files for some snippets of your templates.

So everything in the dist/<project-name> is the code which you need to deploy. For example in there, we have index.html file with a bunch of
<script> tags and those <script> tags make up all your app that starts and also there, we have the <link rel="stylesheet"> for the styles which for example can
contain the bootstrap styles.

Now let's deploy the app.
AWS S3 which uses a special service of the AWS, allows you to host static websites.
Also we can use firebase hosting. Now you don't need to have the rest of your back-end on firebase to use that hosting. It was a coincidence that
in this project we used firebase for authentication and for database. But even if you use your own backend of if you use a totally different API, you can
use firebase hosting to host STATIC websites.

First we need firebase CLI which is a tool to automatically deploy your firebase app. So run: npm i firebase-tools -g to install firebase-tools which is the
firebase-CLI in the end. TODO till 3:50-->

<!-- 26. Angular Animations:
We can use the animation system of angular in order to for example render adding items to a list or the conditional attaching or
detaching of elements to the DOM. Because these things are hard to handle with normal css transitions or animations. Why they
are hard?
Because if you add sth to the DOM which wasn't there before and you want to animate that work, it's hard to do that with css
transition style.

3. Setting up the Starting Project:
For example we have a button that by clicking on it, an item will be added to a list. Also we created an empty <div> which I
want to animate it in this case.

4. Animations Triggers and State:
Angular animations are set up in object we pass to @Component() , so we can use them in template file of that component.
So in object we pass to @Component() , add animations array and in that array we define the animations that this component
should aware of them.
Each animation has trigger() . With trigger() we tell angular that we want to define a certain name which we can place it in
the template of that component which by placing that name, it would trigger a certain animation for that element it placed on it.
Since I defined an empty <div> to animate it, I named that animation, 'divState' . Now we must attach some animations that
this trigger() will do, because trigger('<name of animation>') itself and alone, won't do anything if placed on an element.

The second arg of trigger() defines the animation which that trigger() should toggle it and that second arg is an array.

For placing that trigger on an element in DOM. We use [] like we are doing property binding and then place:
[@<name of animation>]
Which the name of the animation is in trigger('<name of animation>')> . Now we need to bind that [@<name of animation>] to sth.
Why we must bind it?
Because the animation we define, shouldn't run all the time for that element.
Important: So we used property binding for showing animations in order to kind of bind the condition for displaying the animation.
 Which that condition is in "". So we have sth like this:
 <div [@<name of animation>]="<condition for showing that animation, till that condition is falsy and also controls which part
 of that animation should run?>">
For this example we bind that animation to a property called state which we initially set it to 'normal', the value of that prop
is up to you, but we will use that prop which would have different values it can have in trigger() . Now how we use that prop in
second arg of trigger() which that second arg is an array?
Let's say we want to define 2 states. First state is 'normal' which is the default one for that trigger() and then we want to
give it another state which is 'highlighted'.
Important: So we want an animation between 2 states and that is how angular animations work. So in angular animations,
 you transit from state1 to state2 in other words, you work with states. So because of this, we named the property which controls
 the state of animation, state. But you can name it whatever.

Now in second arg of trigger() , we define state() and we would have at leas 2 state()s! Because well, in simplest animations in
angular, we transit from state1 to state2 so we would have 2 state()s.
Now we need to give those state()s a name. For the first state() we gave it 'normal' and the name we pass to first state() should
match the initial value of the state property. So we have initial value for the property which controls the state of animation, which
we named that property, state, which has an initial value of 'normal' and this initial value should match the name we pass to
the first state() and the name we pass to state() should match the state we use in template file.
Important: The names that you pass to state() is up to you but make sure you use them in value of the property which controls states
 and also in template file. So for example if you use 'normal' and 'highlighted' in state()s, make sure you use those names for
 initial value of the prop which controls the state of animation which that prop would bind to the [@<name of animation>] in template
 file. So other crucial thing is that we bind the [@<name of animation>] to the prop which controls the state of animation.

Now how should the 'normal' and 'highlighted' states look like?
We specify that in second arg of state() . In that arg, we pass the style() method which we pass an object to it and in object
we pass to style(), it's almost like writing css code but don't use any dashes. But if you want to use dash, you must enclose that
css property in single quotes, OR by using camel case without ''.

Important: An animation always is a journey from one state to other state.
Right now we are just in beginning state which in this case is 'normal' state and now we want to go to 'highlighted' state.

So we need to get to highlighted state and also we need to animate the transition or in other words, the movement between
two states.

NOTE: We used 'transform': translateX(0) in 'normal' state and you could say: "Hey! We know that in the initial state of any element,
that element is always is in it's initial place, so writing 'transform': translateX(0) for the initial state of an element is vain!"
No it's not vain! Because the animation would also be reverse. So the animation would also have a transition from 'highlighted' state
to 'normal' state, so from 'state2' to 'state1' and they're not always limited to 'state1' to 'state2'. So we must write that
'transform': translateX(0) too, if we have plan to also transit from 'state2' to 'state1'.

5. Switching between States:
Right now in our app, we are able to display one state for animation which the name of that state is 'normal'. Or if you change the
value of the prop which controls the states of animation to 'highlighted', it would show the 'highlighted' state styles which are
defined in style({}) of 'highlighted' state.

Now we want to animate the TRANSITION between those 2 states. So we somehow need to change the state prop from our code.
Because that prop is responsible for changing the states of the animation.

In our template we have a button which when we click on it, it calls the onAnimate() method.
So let's create or hook up on the onAnimate() method in our .ts code and in that method we want to switch the state of animation.
In that method, we are checking if this.state is equal to 'normal' then we set it to 'highlighted' otherwise(otherwise means
this.state is not 'normal' right now and therefore it is definitely 'highlighted', so we set it to 'normal').


EX)
.ts file of component:
@Component({
...
animations: [
  trigger('divState', [
    state('normal', style({
      'background-color': 'red',
      'transform': 'translateX(0)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      'transform': 'translateX(100px)'
    })),
    transition('normal => highlighted', animate(300)),
    transition('highlighted => normal', animate(800))
  ])
]
})
export class AppComponent {
  state = 'normal';
  ...

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
}

.html file of component:
<div
style="width: 100px;height: 100px;"
[@divState]="state"
>
</div>

After creating that method, if you click on that button, the <div> would be gone! and that's a bug with angular because we are
using 'background-color' which has single quotes so it is a string and also another background-color which is backgroundColor which
isn't a string. So let's make it also a string. Also we need to use the dashed version of that property too, moreover both
must be string. So:
Important: You must use the very same versions of a css prop in your style object in angular animations. So for example if you used
 'background-color' in one of the states, you must use the exactly version of that css prop in other states too! So it must have
 '' and also - (not camel case).

Now by clicking on that animate button, the <div> would toggle between those two states(why toggle? Because we are toggeling between
those states in onAnimate() method. So that's why we used 'transform': 'translateX(0)' in 'normal' state. Because we are actually
toggeling between those states. So we want to go back to first place of that animated element too!).

But now we want to animate that toggle between states. This means, we don't want to instantly switch between those states which
currently we are doing that, but now we want to animate that. Because if you don't animate that transition between states, well
why you are using angular animations at all?!! Because just appending different styles to 2 different states without animating the
transition between those states can be done without angular animations and in just pure css.

6. Transitions:
Now we are able to kinda hard switch between states which means there is no animation when changing states. So we need to animate
it. So in second arg of trigger() which is an array, let's add transition() method which would sit next to the state() methods.

transition() method allows us to describe how the transition from one state to another state should work or look like or how should
be animated.
transition() as the first arg expects the name of the starting state and then a fat arrow and then the next state.
For the second arg of transition() , we specify the animate() method. The simplest thing we can pass t animate() is number of
milisedonds which that transition() should take. Also we can define some in between styles during the animation of transition too.-->
<!-- 7. Advanced Transitions
If you have same timing for both toggeling transitions, instead of saying:
  transition('normal => highlighted', animate(300)),
  transition('highlighted => normal', animate(300))
you can say:
transition('normal <=> highlighted', animate(300))

The latter means in back and forth, use the same animate() function.

Let's say you need to control the styling of the element which we are animating it, DURING the transition between states of that
animation. So NOT just control the beginning and the end state stylings, but during those states too.
For doing that, we need another state(because we want to add some styles during the transition between the prior states, so I added
another state for this purpose), so let's just use the last example with some extra stuff added to it:
EX)
@Component({
...
animations: [
  trigger('wildState', [
    state('normal', style({
      'background-color': 'red',
      'transform': 'translateX(0) scale(1)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      'transform': 'translateX(100px) scale(1)'
    })),
    state('shrunken', style({
      'background-color': 'green',
      'transform': 'translateX(0) scale(.5)'
    }))
    transition('normal' => 'highlighted', animate(300)),
    transition('highlighted' => 'normal', animate(800)),
    transition('shrunken' <=> *', animate(500))
  ])
]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  ...

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }

  onShrink() {
    this.wildState === 'shrunken';
  }
}

.html file of component:
<button (onClick)="onShrink()">Shrink!</button>

<div
style="width: 100px;height: 100px;"
[@wildState]="wildState"
>
</div>

But right now with that code, the shrinking is not really animated and it happens instantly when we click on the shrink! button.
So we need a third transition(), because currently we're only targeting the 'normal' and 'highlighted' states.(Therefore I added:
transition('shrunken' <=> *', animate(500)))
Why we used * in 'shrunken' <=> * ?
Because we don't care if we go or come from normal state or highlighted state, we want to play the same animation.
Important: 'shrunken' <=> * means 'shrunken' to any state and 'shrunken' from any state, should play that same transition.
Also the wildcard state is useful when you derive the state dynamically and therefore you might don't know which state that
animated element could have in that moment.

In angular animations * means any state that we have.
Also <=> means transit FROM and TO those states. eg: 'a' <=> 'b' means transition from 'a' to 'b' and from 'b' to 'a' state.

Now we need to add some in between styles between the transition() .

8. Transition Phases:
In animate() we can control the whole animation and define styles that the ANIMATION should TAKE DURING the animation. So pass the
second arg of animate() which is style() function and as we can define style() in the second arg of state() , we can also define the
style() during the animation and inside the animate() .
Now the styles we define in style() in animate() function, which those styles are kinda in between styles would taken during the animation.

EX) animations: [
  trigger('wildState', [
    state('normal', style({
      'background-color': 'red',
      'transform': 'translateX(0) scale(1)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      'transform': 'translateX(100px) scale(1)'
    })),
    state('shrunken', style({
      'background-color': 'green',
      'transform': 'translateX(0) scale(.5)'
    }))
    transition('normal' => 'highlighted', animate(300)),
    transition('highlighted' => 'normal', animate(800)),
    // transition('shrunken' <=> *', animate(500, style({
    //  borderRadius: '50px'
    // })))
    transition('shrunken' <=> *, [
      style({
        'background-color': 'orange'
      }),
      animate(1000, style({
        borderRadius: '50px'
      })),
      animate(500)
    ])
  ])
]
Now if you hit shrink! button, it's kind of ugly, because we let that border-radius to make the shape more round, but once that
transition finishes(after 500 milliseconds), it INSTANTLY jumps to the end state, which in the end state we have 0 border-radius.
So we want to SMOOTHLY have that in-between styles(in-between means the styles that we defined for the animation itself, which are
defined in style() in animate()) or in other words, NOT just animating the chainging of border-radius and then INSTANTLY
JUMP to the end state.
For doing that, we need to replace the animate() function with an array.
Learn: We can pass an array as the second arg of transition() and in that array, we can define starting and in-between states, DURING
 the transition. So we have general start and end states which animation takes place between them, but the animation itself has also
 starting and ending states, because animation itself has also styles during it's happening and therefore we need to animate the
 transition from styles of animation and styles of ending state(the general state) which animation ends there.
 So we can pass style() in array that we pass as second arg of transition().
So I commented out the third transition and wrote another one.
The first element of the array we passed as second arg of transition() in order to make the transition of styles of animation to
ending general state, smoothly, is the style() function and the second element of that array is animate() function and in there,
we place the styles that we want to smoothly change them during the transition of animation ends, to the ending state.
Important: So in our case, we should INSTANTLY see background-color of orange, thereafter we should border-radius is developing or
increasing(because any other state hasn't got any border-radius) over 1 second and thereafter we should see an animation of 500ms where
during that time, we remove the border-radius again, then turn the element from orange to the background-color of ending state.

Important: So when we pass an array to transition as the second arg, that array allows us to define different phases IN THAT transition.
 So in our case, the starting phase is that
    style({
        'background-color': 'orange'
      }),
 and it instantly applied to the latest styles that we had on that animated element(which that latest state is the latest state of
 that animated element, before entering that last transition which that transition itself has some phases). After that first phase,
 we do animate, therefore we apply styles of the new phase but over some time, so it's smoothly applying and if we have animate() without
 any styles in the last phase, that means basically transition to the GENERAL end state of the transition().
 In other words, when you pass an array as second arg of transition(), we have different phases during that transition between general
 states which those phases might have different styles and we can also define a smooth transition between those phases by using
 animate() for each phase and also we can define an animate(x) which hasn't got style function in it, in order to make the transition of
 last phase of our transition()!(in our case the last phase of transition was the border-radius) to the ending state, smoothly.
 So we defined that animate(500), in order to make the transition of last phase of our transition, smoothly to the ending state which
 that ending state is * or 'shrunken'(because of <=>).

So the crucial thing in those phases of a transition() is that you END the process of adding styles to transition, by using an animate()
function without any style, to get smoothly to the end state, otherwise it INSTANTLY snap back to the end state.
-->
<!-- 9. The void State:
Currently we're able to animate elements that we already have in our html or code. But what if we want to animate the ADDITION or
REMOVEMENT of html elements of our code?
For doing that, we can add a new trigger() and it should be of course on the same level of other trigger()s in array of animations.
There, we only have one state which is when the element IS in the DOM currently. The other state is that we don't have the element,
because we(user) just removed it OR we JUST ADDED to DOM so it kinda should now APPEAR in the DOM and that state is handled by
angular.
So 'in' state is how the element should looks like once finally IS THERE(it's in the DOM).

transform: translateX(0) means the place we ACTUALLY placed the element.

The first transition() is for when the element comes IN the DOM, so when it's added to DOM. There, the end state is 'in' but
what is the beginning state, where an element is adding to the DOM?
Well, we could use the *, but there's a specific state for the case that the element hasn't been yet added to DOM, which is 'void'
state. So 'void' is a reserved state name that you shouldn't override it.
Learn: So 'void' state is provided by angular, for cases where you do have an element and an end state which that element wasn't added
 to DOM at the beginning and of course you can add 'void' to end state, when you remove an element from DOM.

So with transition('void => *', animate(300)), the element should slowly appear to the DOM and we can see this animation by going
to where the element lives, for example <li> and on that, we add: [@<name of trigger without any quotes>] and we don't need to bind
that to anything. Because I don't CARE what the state currently is and 'in' state that we defined is just a dummy thing there.
Of course we could have some logic in our code which changes the state of our <li>s (changes the state of element that we defined
the animation on it), but for the entering animation or in other words, when we add a new <li>, I don't care what the initial state is and
therefore I never set it in our code and I never apply the 'in' state and I don't set a property for managing the state of elements that
need that state to use that animation. Because we want to animate from 'non existant' or 'void' to any state(*). Therefore we don't need
any state or state management prop for that trigger().

But right now if we try to add a <li> which has that animation to the DOM, it's not working. Why?
The issue is that we have no starting state. So we need to define a state() for 'void' right? NO!! It doesn't work that we set up
the starting state which in this case is 'void' like this:

EX) trigger('list1', [
  state('in', style({
    opacity: 1,
    transform: translateX(0)
  })),
  state('void', style({
    ...
  })),
  transition('void => *', animate(300))
])

This doesn't work in this case(but in previous triggers we have to define the starting state like that), but since 'void' state is
kinda built-in state,it works differently and we need to set it's state differently.

So as you can see, the 'in' state is a dummy state for the example below because we don't need it when adding or removing elements
in this case(because we are using * not 'in' state, so in that case we would need that 'in' state).

For doing that, in the transition() that you used the 'void' state, we must pass AN ARRAY as second arg of transition() where in there
animate() is present, but BEFORE executing animate() in that second arg of transition(), we need to write another style() where I set
the initial state of transition() itself and this style() will now be applied by angular RIGHT IN THE BEGINNING. So when we add a new
element, it's appended to DOM and it will INSTANTLY get that first style() in the transition() by angular and then transition over
x duration that we set in animate() in the transition() to it's final style which we set it in state() in example below
EX) trigger('list1', [
  // The style() functions that we write here can't be used for 'void' state.
  state('in', style({
    opacity: 1,
    transform: translateX(0)
  })),

  // This is incorrect for void state:
  state('void', style({
    ...
  })),
  transition('void => *', [

  // This style is for the 'void' state:
    style({
      opacity: 0,
      transform: translateX(-100px) // It kinda flies in
    })
    animate(300)
  ])
])

Also by using code above, when you refresh or enters this component, the elements that have this animation on them, would have that
initial state for 'void' in other words, by entering the page, they would flies in.

Now for deleting an element, let's add another transition(). For styling of ending state which is 'void', we need to do it in the last
phase of transition() which we defined those phased in second arg of transition() which is an array.
But for defining the styles of final state, we can define that final style in last animate() of transition() . But will we
get that instantly changing the styles when transit from final phase of transition to final state problem?
NO! Because in this specific case we don't have that problem of snaping to end state because the style() that we're defining there in
the last phase of transition() is actually our FINAL STATE! Why? Because the final state is void and we know that we define the style() of
a void state in the transition which is inside the transition() of that second arg array. So we are ACTUALLY defining the styles of final
state so we won't have that problem.

transition('* => void', [
  // In this case we don't need to define style() for the starting state(because the starting state is not 'void' but other states which
  // the styles of those states are set inside their state() not in first arg of transition() which is where I commented below)
  //  style({
  //    opacity: 0,
  //   transform: translateX(100px)
  //  })

  // Here we define the styles of void state(when this happens? When the void state is our final state)
    animate(300, style({
      // Styles that we would have in the end state and to get that styles it takes 300ms:
      transform: 'translateX(100px)',
      opacity: 0 // Fade out transition(fade out happens when the final state has opacity of 0)
    }))
  ])

Important: Fade out happens when the final state has opacity of 0 and fade in happens when the starting state has opacity of 1 which
 both happens over time.

These examples can used for *ngIf which we also have the behavior of some new elements being added to the DOM. -->
<!-- 10. Using Keyframes for Animations:
We can have a more detailed control over the individual steps during the animation process, we already saw that we can define multiple
phases inside each transition() as the second arg of that transition() which that second arg is an array of multiple phases of that
transition() which each phase can have animate() and for second arg of animate() we can define the styles for that phase.

And when we define multiple phases, each phase gets the same importance. It would be nice if we could define some keyframes to
specificly say: "ok, you animate over 1second. Duration that 1 second, after 200ms you should have this state, after 500ms you should
have this state and ... ."

So when we specify an array for second arg of transition() we're defining some equally weighted phases. But instead, we can still
pass an array there, but there, in the animate() function, we use the keyframes() as the second arg of animate().
Learn: Now the keyframes() in animate(), allows us to be more precise about which part of multiple styles that we set up, should occur
 at which timing. For example in animate(1000, keyframes()) , the overall animation will take 1 second but with keyframes(), now we can
 control which state INSIDE of that animation should take how long. Therefore we would have an array in keyframes() and in that array
 we would have individual phases.
In this example in keyframes() we are saying, when the element entered the DOM, it should comes in from -100px of x-axis with 0
opacity.
Now we want another style, during that fly-in animation(because we're still in the transition of void to *-so we're still in fly-in
animation). So let's add another style().

Now if you see the entrance animation, it starts slowly going in, but at near the real place of element, it goes very fast!
The reason for that is that by default all of the steps in keyframes() take long EQUALLY. In this case, we have 3 style() in keyframes()
and every style() is triggered after the another and each one is taking 1/3 second. Because we have 3 style() and the overall animate,
takes 1 second.
Learn: So by default, the overall time of animate(), distribute by each style() in the array of keyframes().
But we can overwrite that default, by passing the offset prop to the object we pass to style().
In offset, we say at which timing of our overall time of animate()(which in this case, the overall timing of animate() is 1second),
should we be at that style().
Important: 0.3 means at 30% of that animate() time.

Learn: Now for getting rid of that jumping of added element to it's place that we have currently, we can add a final style in array of
keyframes().

EX)
trigger('list2', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),

  // Coming in:
  transition('void => *', [
    animate(1000, keyframes([
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0
      }),

      // Halfway to the actual place of element(because the end is translateX(0) which for example 'in' is our final state-the 'in' state
      // is one of the * states):
      style({
        transform: 'translateX(-50px)',
        opacity: .5,
        offset: 0.3
      }),
      style({
         transform: 'translateX(-20px)',
         opacity: 1,
         offset: 0.8
      }),
       style({
         transform: 'translateX(0)',
         opacity: 1,
         offset: 1
      })
    ]))
  ])
])

<li [@list2] *ngFor="...">{{item}}</li>

So we can use keyframes() to PRECISELY control which style() we wanna have at which timing of animate(), during the transition().
Important: The crucial thing is that keyframes() are for the DURING the transition. So over the times of animate()s in one transition().
Of course you can have multiple animate()s in one transition() and each animate() function can have multiple keyframes() .

If we wouldn't have keyframes(), we needed to write multiple animate()s. Let's say we want an animation takes 1 second. So we need to
write multiple animate()s which each takes some time and sum of those times, would be the overall time of animation and in each
animate() would have different styles for itself.-->
<!-- 11. Grouping Transitions:
For animating the removement of an item, let's say we want it have 2 different animations(so we can add 2 animate() functions for a
transition()) which each one takes a different amount of time.
Now if you add another animate() after the first animate() which at that first animate() we have a style which is opacity: 0; ,
you wouldn't see that item during the second animate() or animation. Because, well, during the first animation we completely make
that item transparent and any other styles after that animation wouldn't be visible to us! So the animated element would be invisible
BEFORE we see the color turned to red.
For solving this problem, we can switch the order of those 2 animate() functions. So instead of this:

EX) trigger('list1', [
    transition('* => void', [
      animate(300, style({
        transform: 'translateX(100px)',
        opacity: 0
      })),
      animate(300, style({
        transform: 'translateX(100px)',
        color: 'red'
      }))
  ])

We need to write this:
EX) trigger('list1', [
      animate(300, style({
        transform: 'translateX(100px)',
        color: 'red'
      }))
  ]),
  animate(300, style({
    transform: 'translateX(100px)',
    opacity: 0
  }))
])

So now in the animation, the item first turnes to red and also moves to right, then it would get the styles of second animate()
over the specified time.

But what if we wanted both animate()s at the same time, but with different timings?
Learn: So we don't wait for the first animation to finish before starting the next, which is the default behavior when having multiple
 animate()s.
For that we can use group(). In group(), we pass an array of animations(animate()s) that we want to perform SYNCHRONOUSLY, or at
the same time.
EX) trigger('list1', [
      group(
        animate(300, style({
          transform: 'translateX(100px)',
          color: 'red'
      }))
    ]),
  animate(800, style({
    transform: 'translateX(100px)',
    opacity: 0
  }))
])
      )

Now those 2 animate()s are happening both at the SAME TIME.
I gave the second animate() a longer time so it turns red and takes other styles in 300ms which the second animate() is also happening
with the first one but slower(because it takes 800ms!)

So we use group() to group multiple animations(or animate()s) with possibly different timings(because if the timings are the same,
why the hell we're using multiple animate()s? We can merge them in one animate()!), to have them happening at the same time.

12. Using Animation Callbacks:
There are a couple of callbacks that you can LISTEN to them, with doing that, when an animation finishes, you can execute some other
code.
For that, go to the where the element that you want them to listen those callbacks, lives and set up event binding but with @ sign,
why @ sign?
In order to indicate we're in an animationable and there we have the .start: (@<name of trigger>.start) and the
((@<name of trigger>.done) triggers(or events??? TODO).
The start method will be executed whenever the animation starts and we bind them to a method(WHY?
Because we have an event binding there). Let's see what's inside $event which is exposed by angular to see what's inside of it in
that case.
Also I want to listen to the finishing of animation by using the .done event on our trigger.

<div [@divState]="state"
 (@divState.start)="animationStarted($event)"
 (@divState.end)="animationEnded($event)"></div>

App.component.ts:
animationStarted(event) {
  console.log(event);
}

animationEnded(event) {
  console.log(event);
}

So these callbacks are useful, if you have some code which animates sth but after the animation finishes(or when it starts) you
wanna execute some other code and you can do that by listening to built-in start and done events on the trigger of animation-->

<!-- RXJS youtube academind:
RxJS what and why?
For using rxjs, first we need to install it and for this case, I won't use npm because the instructor sticks to a web based editor
(jsbin.com) and he used a cdn link and in that cdn link remove the @version in order to get it automatically replaced with the latest
version of that library. Then at the end of the <body> say: <script src="<link to rxjs cdn with replaced @version with nothing-which
gives us the latest version>"></script>
Then create a <button> and select it.
const button = document.querySelector('...');

The vanilla JS way o handle click events:
// React to clicks on the button(because we added an event listener on the button not document or ...)
button.addEventListener('click', (event) => console.log(event));

Now let's rebuilding that using rxjs:
So instead of using addEventListener(),  we write:
Rx.Observable.fromEvent() , which this, creates a new observable based on an event source which we need to specify that event source
in parentheses of fromEvent() . In this case, we specify button variable, which is where we I want to listen to that event and then
we specify the type of that event as a string.
Now with that, I already got my observable, BUT NOTHING WOULD HAPPEN RIGHT NOW! Why?
To react to an event, we need to subscribe to that observable which is coming from that event.
The first function that we can pass to subscribe() gets the event data(in this case). So the result of this code is exactly as
the prior code with addEventListener() and it's callback that we passed to it.
Rx.Observable.fromEvent(button, 'click')
  .subscribe(
    (event) => {console.log(event);}
  );

By using observables, we have a funnel-like setup. So our event data travels from top to bottom, so from data source which we specify
that data source in the fromEvent() which in this case that data source is the click event on the button variable, to the code that we
execute in the subscribe() (that is the bottom!). In this case that funnel is very short.

The powerful thing about observables is the operators, which allow you to transform the way that the data is handled, used or
looks like, immensely.

EX) let's say we want to MAKE SURE that we only react to click events, once a second. So if the user SPAM(rapidly clicks on that
button which is the data source) that button, we omit or we drop all of the events which happen more than once a second.
TODO till 5:30

---------------------
Observables, observers and subscriptions:
An observable is basically a wrapper around some data source and data source typically means a stream of values.
So we have that stream data which possibly is asynchronous, so async data source is possible multiple values over time and
now we want to do sth whenever a new value of that data source occurs. This is the job of observer.
So the observer is there, to execute some code WHENEVER we receive a new value or also an error or if the observable which
we're observing reports that it's done. Therefore we need to connect the observer to observable. We do that by subscription.
Subscription basically means with subscribe() method we tell the observable(or our wrapper around that stream of values) that
someone is caring about those values or someone(observer) is listening to them.

The observer can implement up to 3 methods. You can implement some of these methods that you want. Those methods are next() ,
error() and complete() .
Important: The next() method will be called by the observable whenever a new value is emitted, so whenever we receive
 a new value.
 The error() will be called, whenever the observable throws an error and the complete() will be completed when the observable
 is done. So whenever we know that no more values will be emitted in the future.
 But remember: Some observables will NEVER finish. For example if you wrap an observable around a click listener on a button.

But how does observable know that it should call next() error() and complete() ?
Well that is a kind of contract that the observable and observer sign through the subscription. The observable knows that
it could fire a next() error() or complete() on an observer and on the other hand, observer knows that the observable will
only fire one of these 3 methods. So you can easily implement them on the observer and react to them whenever they fired.

So that is the invocation of those 3 methods which allows us to communicate and handle our data. But a better depiction is
as stream.
As I mentioned, an observable is a wrapper a stream of values and we can have one value which instantly occurs to have a
synchrounos data stream or better say it's not a stream anymore, because it's async.

Important: So the observer has 3 methods where we can handle any values in those methods.

In subscribe() we pass the observer.
The subscribe() method takes 2 possible args.
---------------------
RxJS operators like map() or throttleTime():
---------------------
RxJS6:
---------------------
switchMap():
It allows us to trigger some value emissions, whenever ANOTHER obs emits a value.

An interval, is an obs which emits a new value every x milliseconds.-->

<!-- My notes:
Important: When a router navigates to a route that renders the same component, the component isn't initialised again.
 So for rendering that component again, we can declare the dynamic segments of the url in that component and change it reactively
 by saying:
 this.route.params.subscribe((params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
      });

Learn: Any properties on the component's class, are considered as reactive state and when the value of those props change,
 that component will be re-rendered.
For example we can bind the properties of that component to html template of that component by using {{}}.

When you on a component and want to implement the loading, if you are subscribing to route.params, you need to set isLoading to
true, because if the route changes, that subscription would emit a new value and you need to set isLoading to true and only
set it to false, when the data you want to use in that component or in general the data you want in any component is received.
Also there is no need to set isLoading to true inside ngOnInIt() too(so there is no need to set isLoading to true, both inside
ngOnInit() and also inside the subscription to route.params obs.). LOOK AT THE darsad-site and in it's detail-page component .
There, we are subscribing to route.params() inside ngOnInit() , by doing that, when we entered another url which that url is
handled by the same component that we were before on that component, the data would be updated, because when url changes, the
route.params subscription would emit a new value which is the new url and we send another http request for new data and update it
and also we set isLoading to true in that subscription to route.params . So whenever the url changes but that new url is also
handled by the same component, we set isLoading to true and we set it to false, when the data we requested is received.
So that is an important pattern.
-------------------
A note about pipes:
An Angular pipe is pure by default. It only triggers an update when any of the input parameters change. It's the only way that
you can "activate" the pipe (update its result). So for example if we have a pipe like:
EX) @Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    constructor(private filterService: FilterService) {}

    transform(array: any, start?: any, end?: any): any {}
}

Important: So in the example above, only when Angular detects a change in either array, start or end, then it runs the pipe.
 Once again, changing the parameters of transform() method is the only way to control the re-running the pipe.
the first parameter to the pipe always specifies the target that the pipe acts on, usually an array (non-scalar). When
that parameter which usually is an array is changed, the pipe should be activated too, but there's a gotcha!  Since arrays are
passed by reference, when you wanna update the source array, like fetching a new page of items, if you want to trigger update,
it is important to change the array itself, not just mutate its content. So it is a good way to ASSIGN the new values to the array,
in order to change it completely. For example:
array = [...array, newItem];  // This won't update the array completely: array.push(newItem);

So stick to that rule then your pipe will behave well.
-------------------
If you're using a library in your angular application and you want to style some parts of that library or package, PROBABLY you
must put those styles in styles.scss file not the scss file on the component which is using that library.
-------------------
When you want to implement back button in your angular app, you need to use RoutesRecognized and pairwise(); in a way that after
subscribing to router.events , in the first arg of .subscribe(), you need to place an if() {} statement, which in that if() {} statement,
you need to check if the evt is instance of RoutesRecognized and if so ...TODO
But remember, if the user refreshes the page, the RoutesRecognized isn't available when the page loads, because of using pairwise()!
Because pairwise() for emitting value, needs to have at least 2 emitted values of source observable.
So RoutesRecognize will only available if at least user navigates in our app, therefore when the app loads, the user didn't navigate
through our app and therefore we can't implement that back button BUT if you really need that, you can save the URLs that
user navigated THROUGH OUR APP with localStorage and therefore when the app reloads, we still have the latest place that user
where there, before reloading the page.-->
<!-- 4 different ways to share data between angular components
1) parent => child : via @Input()
When you declare a prop via @Input() in the child component, that decorator allows that prop to BE RECEIVED FROM THE PARENT
COMPONENT TEMPLATE file. After declaring that prop in child component, you can go to parent component's template and bind that
@Input prop to some code which will return sth to that binded @Input prop or just bind to a value.
Important: You can ONLY bind to the child component's @Input props not other props of that child component and ALSO you can
 only bind to that @Input() prop of child component, on INSTANCE of the child component in it's parent's template. For example:
child component.ts:
@Input message: string;

child component.html:
{{message}}

Parent template:
<app-child [<name of @Input of the child component or the other name of @Input prop that you specified in () of @Input>]=
"<some prop or code of this parent component>"></app-child>

2) child => parent : via @Output() and EventEmitter<>()
In this case, we're emitting data from child component which that data can be listened in parent component.
This approach is ideal when you want to share the data changes that occur on things like button clicks, form entries and other
user events.
In this case, we declare an event prop in the child component with @Output and set it equal to: new EventEmitter<>() . Then
we create a method in that child component that calls .emit() on that event prop and in () of that .emit() we put the data that
we want to emit or send to parent component. Then we create an event listener like (click) and bind it to our newly create method
which that method calls .emit on our EventEmitter<>() prop.
So when that event triggered(in this case the (click)), our method will be called and it would call .emit() on the EventEmitter()
and that EventEmitter() will send the data to parent component.
Now we must receive that emitted data in parent component.

In parent we create a method to receive that emitted message from child and of course it must have a parameter to actually
receive the emitted data in that parameter and then you can create a prop in that parent, in order to save the data which was
emitted from child.
Now we must somehow call this newly created method in parent. But where? In template of this parent component and again on
the instance of the child component and there, we use event binding syntax and bind to the name of the EventEmitter prop of
child component and then when that event triggers, we execute some code, which that code is that newly created method in parent.
Why when that event of child triggers we execute that newly create method of parent?
Look at the example: Because we want to RECEIVE the data which would emitted by the
EX)
child component.ts file:
@Output() messageEvent = new EventEmitter<string>();

sendMessage() {
  this.messageEvent.emit('hello');
}

child component.html file:
<button (click)="sendMessage()"></button>

parent component.ts file:
receiveMessage(data) {
  this.message = data;
}

parent component.html file:
<app-child (messageEvent)="receiveMessage($event)"></app-child>
{{message}}

3) child => parent: via @ViewChild()
@ViewChild() allows one component to be injected into another, which causes the parent component to gets access to all of the
props and methods of child component. However one caveat is that the child component won't be available to parent until after the
view is fully initialized. That means we need to implement AfterViewInit to receive the data from child. Then in body of parent
component, we use @ViewChild(<the name of import statement of child component>) <name of prop> and then inside ngAfterViewInit(){}
we have access to all props and methods of the child component which we can access them by using the prop that we choose for
@ViewChild()
EX)
child component.ts:
message = 'hello world';

parent component.ts file:
import {ChildComponent} from '...';
...

@ViewChild(ChildComponent) child;
message: string;

ngAfterViewInit() {
  this.message = this.child.message;
}

4) any => any: Share data between any unrelated components:
When passing data between components that lack a DIRECT connection, such as siblings, grandchildren and ..., you should use a
shared service. When you have data that always need to be in sync, BehaviorSubject() is very useful. The benefit of this kind of
subject is that it ensures every component that is consuming the service which that Behavior Subject is in it, receives the
MOST RECENT UP TO DATE data.
For doing that, in the service we create a PRIVATE BehaviorSubject<>() that will hold the CURRENT data which you want to
share that data. Then we define a current<name> property in that service which is set to an observable which will be used by components.
Then we create a method in that service which it's job is to call .next() on that BehaviorSubject() to change the current value of
that BehaviorSubject and the name of method can be: change<main name of prop>.

The parent, child and sibling components all receive the same treatment. Now for example let's go to any component that needs this data
and also needs to get the latest value and inject this service in it's constructor. Then subscribe to the currentMessage
observable and in it's first arg, we would receive the message string and then we can save that received value inside a prop of
that child component.
Now we can create a method in ANY of those components which subscribed to that BehaviorSubject() and that method would change the
data that we share between those components. But how it will change that data?
That method will call the changeMessage() method of service which that changeMessage() method calls next() on the messageSource and
we will pass the new data which that data will automatically broadcast to all of the components that subscribed to the currentMessage.
For example let's do that in parent component.

EX) TODO: Write all of the example
The data.service.ts file:
private messageSource = new BehaviorSubject<string>("default value");
currentMessage = this.messageSource.asObservable();

changeMessage(message: string) {
  this.messageSource.next(message);
}

child component.ts file:
message: string;
constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.currentMessage.subscribe(
    message => this.message = message;
  )
}

parent component.ts:
message: string;
constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.currentMessage.subscribe(
    message => this.message = message;
  )
}

newMessage() {
  this.dataService.changeMessage('Hello from parent');
}

parent component.html:

<button (click)="newMessage()">Send message</button>

After clicking that button in parent component, ALL of the components that are subscribed to that currentMessage will get the
latest message.
--------------------
The DoCheck gets called every time something async happens within the zone. Like an event firing.
--------------------
When refresh the page on the component that has @HostListener and go to other components it still applies TODO WHY?
--------------------
It's good to check <object>.hasOwnProperty(<key>) in 'for in' loops. Also for get access to value of a prop in a 'for in' loop,
instead of using <object>.<key> , you need to use <object>[<key>] .

--------------------
academind Angular Image Upload:
<input type="file"> allows us to get file inputs. Also remember: If you're using this kind of <input> in an angular form, this CAN'T
be registered as a form control where the attached file would automatically sync to your form object. No that won't work. You ALWAYS
have to fetch this differently and you fetch it, by adding a (change) listener on that input with type of file. That event will trigger
whenever the file selected by the user, changed which is the point where you're interested in the file. So let's write:
<input type="file" (change)="onFileSelected($event)"> and then if you choose a file and log the $event and look at target prop of
logged data, we have some interesting data. target is the input element in this case and because of <input type="file"> we have a special
key which is files key and it's an array of all the files that we were selected in case you have a multi select tool, but in this case, we only
have one element. In that files key and in it's first element we have the file that we just choose and that's the file we can upload.

Now we need to write some logic to immediately upload the file whenever that (change) event occurs or maybe you want to wait until user
presses some button. So maybe you have an upload <button> and it of course could be a submit button in a <form> and therefore when that
<button> is inside a <form> and is type of submit, it needs to have (ngSubmit) . But in this case, we don't have an <form> element, therefore
I used (click) listener for upload button.

Now because we created more than 1 method and we need the data of a method which that data is received in that method, when that method triggers
and in this case, that method(onSelectedFile()) calls, when the (change) event fires, we need the data of one method(that data receives in
that method) in another method(onUpload()). therefore we need to STORE the data which onSelectedFile() method receives, in a property of
that class, in order to be able to use it in another method which in this case, that another method is onUpload() method.

Recap: Because the data we want in onUpload() is received in another method(onSelectedFile()), we need tp store that data in a PROPERTY,
in order to get it in other methods or other places of that class or template file of that class.
So now we can grab the file object by saying: event.target.files[0]

Now how do we upload a file?
We upload a file through angular HTTPClient. For that, we need to go to app.module and import HttpClientModule and then add it to imports
array of that module. After doing that, we can inject the HttpClient into any service or component we want to use it.
Now you could create a service or directly inject it where you want to use it.
Now go to onUpload() method which gets called, when the upload button gets clicked and there, send a post request. Now the url we want send
the request to is the url of firebase cloud function or ... which must accept incoming post requests with foreign data payload where we can
extract the file from it.
Also remember: event.target.files[0] would be of type File.

Here we're casting to get some auto completion:
this.selectedFile = <File>event.target.files[0];

Important: The body of post request you want to send for upload, must be of type FormData(). So we need to instantiate a new FormData() and
 then append some fields to it.

When you're sending this request, the content-type should be set automatically.

Then we can subscribe() to that this.http.post() .

Now for testing, first you need to choose a file from <input type="file"> which triggers (change) event and that event would set the
selectedFile prop and then by clicking on upload button, it will send the http request to upload that selected file.

Now if you go to storage of firebase, you can see the uploaded file.

Note: In the data you send to backend, instead of formData, of course you can send the binary itself. So instead of instance of formData and
then append() data to it, you can just send the binary in body of request which sets in http.post() , IF the endpoint accepts that binary.
So it doesn't requires formData but directly wants the binary.

Now let's say we want to track the progress of upload. For that, you can pass an object as THIRD argument of post() method. TODO till 8:00-->

<!-- When you're using lazy loading and have <x>-routing.module and <x>-module , you HAVE TO ALSO import <x>-routing.module.ts in imports array of <x>.module.ts and also
include the components which you defined in <x>-routing.module.ts inside <x>.module.ts's declarations array.

When wanna show form errors to user, it's good to give him a chance to actually CHANGE the value of that input or control and then if it causes some errors, show those errors,
for doing that you can write:
EX)
<div *ngIf="name.invalid && (name.dirty || name.touched)"
    class="alert alert-danger">

  <div *ngIf="name.errors.required">
    Name is required.
  </div>
</div>

If the templateRef of @ViewChild() is equal to the local property of your component, it might be overwrite it! Be careful about naming of templateRefs.

Error description:
TypeError: Cannot read property 'ngOriginalError' of undefined
This error was caused because of unhandled errors in subscribe(), so basically there isn't any handler for thrown error and it  doens't matter if you're in
SSR mode or CSR(client side rendering).-->
<!-- When using angular's httpClient library WITH OPTION of: observe: 'response' for GET reqs, the body object of response belongs to angular itself not our API!!!
The actual response of our API is in the content property of angular's http client. If you don't use observe: 'response', you won't get that body object of angular's
http client library.

When you add some css asset or other asset or even some settings to angular.json file, in order to see the effects, you need to re-run the build or serve commands.

When you have a switch case, if you use return keyword inside your case statements, it will return from the WHOLE method and NOT JUST that switch case. If you want to 
ONLY get out of the switch block and not the whole method, you need to use break keyword instead of return. So if you want to return sth from that method or function,
you need to use break.

When you have a reactiveForm and also a form control which is INSIDE a <ng-template> you have to place the <ng-template> INSIDE the <form> tag, otherwise it won't 
find out that it's a control of that group and will throw error.

When you wanna submit a reactive form for getting the whole form module, you have 2 options: 
1) Directly console.log() the formGroup property which is in TS file.
2) Pass the [formGroup] from html file to the called method for (ngSubmit) and receive it in that method by providing a parameter and then logging that param.

When using angular material and you have sth like bottom-sheet, you can't access route or route.params or sth like that, INSIDE the component that is used for 
content of that bottom-sheet. The soluton is to PASS down those route.params from the creator of that bottom-sheet to the component which is used for content 
of bottom-sheet.-->
<!-- When you wanna test the service worker, it's good to use watch script of angular BUT with one crucial difference which is make that script to work in production
mode not in develoment mode. So change the default watch script to: ng build --watch --configuration production
Also for source map: ng build --configuration production --source-map

When you want to execute some code in ngOnChanges() ONLY ONCE, you need to use the firstChange property of simpleChanges inside ngOnChanges and use it inside 
an if statment.

Errors in reactive forms:
In angular reactive forms(doesn't matter you're using normal api or formBuilder api), the OVERALL errors array is meant for the WHOLE form. If you've just set Validators
for INDIVIDUAL controls and you think the errors are not showing in that OVERALL errors array, you're wrong. As I said, that OVERALL errros array is for the validators
of OVERALL form not individual controls. So for errors of individual controls you must see the controls property of that form.

material mat-form-field errors:
In angular material when you want to write the html for the errors of form, typicall you do sth like:
EX)
<mat-form-field>
  <input matInput>
<mat-error *ngIf="<form field name>.errors.required && ...">...</mat-error>
<mat-error>...</mat-error>
</mat-form-field>

Now that would cause some errors in the console of browser when you have not errors. Because we're accessing errors property that doesn't have required property on it.
So we have 2 options: 
1) Using ? after errors: <form field name>.errors?.required to silence the error.
2) Wrap <mat-error>s inside a <ng-containe *ngIf=""> or sth else...

The second option would cause <mat-error> to go inside the input, so it's good to use the first option.

When you have some @ViewChild() properties and in html of them, they have some *ngIf on 'em and in the beginning, those *ngIfs are false, in this case,
if in some method, the condition of those *ngIfs turnes to true, the elements inside that *ngIf must be shown immediately right? 
Well maybe, but they're @ViewChild() properties in the class of that component, won't. Therefore, you need to use rxjs timer(0).subscribe() and pass a callback
function to subscribe() and it's inside that place which those @ViewChild() properties are defined and ready to use and without using timer(0) , they would be 
undefined.
 EX)
    We need for change detection to finish it's work and after that, do our DOM manipulation. Here, we're actually `locking` the steps.
    timer(0).subscribe(() => {
      this.step1.completed = false;
      this.step2.completed = false;
      this.step3.completed = false;
    });

A note about bindings with [] or without []:
When you want to pass in a boolean, you HAVE TO use [] binding and you shouldn't use a binding without []. Because if you use the second case, the type of boolean that 
you receive in child component would be string and not boolean. 
EX)
<app-child [someBoolean]="true"></app-child>
<app-child someBoolean="true"></app-child>

In first case, if you log the received @Input() in child component, you will get: true (boolean!), but in second case, you will get: "true" (a string!!!)

Remember: The errors propert of overall reactive form, is the errors for WHOLE form and not the individul controls. So for a BASIC reactive form, the whlole errors property,
after submitting that form, would possibly be null , but the form itself would be in invalid state. Because by default, there isn't any validator function for WHOLE 
form to add some errors to that whole errors property.-->
<!-- When you have multiple checkboxes and by clicking on other checkboxes than the first one, you see that, ONLY the first checkbox is affecting and not that ACTUAL checkbox,
it probably has to do with id attr of those elements that are identical. Try to give unique id attributes to all of those checkboxes and shall this problem would be solved.-->

<!-- In JS, doing array push() method on a property of an object which that property on object doesn't exists would be done like:
  shop.priceOptionColumnNames = [...this.priceOptionDefaultColumnNames];
and not like:
 shop.priceOptionColumnNames = this.priceOptionDefaultColumnNames;-->
<!-- note about service-wroker:
for disabling service worker, after running build:ssr, do:
  1) delete ngsw-worker.js
  2) rename safety-worker.js to ngsw-worker.js-->

<!-- universal and parsing JSON:
 When you have universal and you wanna parse a JSON you shouldn't do this in server side, instead for both parsing and rendering in template, of that JSON, you must add a 
isBrowser condition to only do both of those tasks in browser. Because doing them in both server side and browser side would throw error.
 -->


