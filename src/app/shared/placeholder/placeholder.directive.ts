import {Directive, ViewContainerRef} from "@angular/core";

/* The selector for this directive should be an attribute selector, therefore we can add this directive as an attr to any element.
Now in this container we need viewContainerRef to be injected.

Learn: viewContainerRef automatically gives you access to a reference to a place where this directive sits. So viewContainerRef will
 allow you to get information about the place where you use this directive and that information wouldn't be just a coordinates of
 the place but viewContainerRef has useful methods, for example what we need currently which is for creating a component in the place
 that this directive sits.

So by using viewContainerRef and use this directive, you essentially get access to the place where the directive is added to that
place and you not just get access in the sense of where is that place but ALSO in a sense of please add sth there.

Important: You need to turn that injected viewContainerRef into a public property and we are using the .ts shortcut which the arg in the
 () of constructor() is stored in a property of same name. So when you have: constructor(<accessor> <arg>: <type>){}
 it will create a prop of that class with the same name of <arg>.

Now we are able to add this directive in our templates and then get access to it by using @ViewChild() and then access to viewContainerRef
to work with that viewContainerRef of this directive. So we need to make viewContainerRef , public to be able to get access to that prop,
outside of it's class. So we need to use explicit public accessor in () of constructor() .

Also add this directive to declarations array of app.module. file.

*/
@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
