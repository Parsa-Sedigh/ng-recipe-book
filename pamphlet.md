<!-- Running npm i <package> will install the LATEST version of that package.
When you add a new production dependency (a dependency that is crucial for running the project), you need to inform the
 angular cli that the newly installed package must be included into the final bundle that it creates. Because the cli bundles
 all of our script files and also the style files and by default it would not include that newly installed package.
 Important: So to inform CLI about the new installed package which is crucial for running the app, we should go to angular.json file
  and in case of added bootstrap package, in styles array, we can add a new global stylesheet that we want to add to our whole
  project.Also from the beginning in styles array, you have styles.css file which is the styles for whole project.
  ALSO REMEMBER TO ADD THE 3rd party packages BEFORE your files. So for example we must add the path to bootstrap file BEFORE
  the path to our styles.css file.
  In bootstrap file, the min version is lying inside the main version so instead of: .../bootstrap.css/bootstrap.min.css you must
  say: .../bootstrap.min.css . So we learnt that is better to include the path to minified versions of 3rd party packages in
  our config files like angular.json .
Not every component should have a folder on the root level of app folder. You should also nest the components based on their feature
inside each other.
Remember: you have to register all of the features you're going to use, in app.module.ts file.
To prevent the creation of .spec.ts file when you are creating components using cli, you can use --skipTests true .
If you don't want to create the new component inside app folder when creating a new component with cli, you can easily tell cli to
create that component in a sub directory by basically passing a path with the name of that new component. So it should be like:
ng g c recipes/recipe-list --skipTests true but that recipes directory which is the parent directory of our new component must
exist before. Now the last command will create recipe-list component inside recipes directory.
We nest the recipe-item folder inside recipe-list because a recipe item is just one item in the list of recipes which is recipe-list .
  -->
<!-- We need to pass data between components.
We can use property in event biding not only on html elements and their native attrs and events, but we can use it on directives
and we also did this with ngClass and ngStyle. So we can use it on our own components and bind it to our own custom properties
and custom events.
So property and event binding can be done on 3 things:
1) HTML elements 2)Directives 3) Components
For HTML elements we bind to their natural attr and events but for those other two, we bind to their custom properties and
events.
So we can use property binding to bind to component properties.
property: {} With this syntax we make sure that this property just get the type that is defined inside {} .
SO {...} is not the value of property.
 Binding to a property of a component outside of folder of component (binding to a custom property):
 Let's assume that we have a property in the class of our component and we want to bind to this property outside of folder of
 our component. So it would be like: [property] = "..." , now this would throw an error and the error would say: 'Can't bind to
 <property>, since it isn't a known property of <selector of component>'. You might say. That isn't true. We defined that property
 to be a property of it's class.It's even public because I even didn't manipulate the accessor of that property. But the problem
 is by default all properties of components are only accessible INSIDE of their components and not from outside.So:
 By default we can't access properties in components from other components(even from app component we can't access properties
 of other components) and generally this is a good thing. Because we don't want to make all of our properties bindable from outside.
 So you have to be explicit about which properties you want to expose to other components.
 So if you want to allow parent components to be able to bind to this property, you need to add something to that property of
 component. A decorator. So we learnt that decorators are not only available for classes. So here we're going to add a decorator
 to a property of component. The decorator in this case we want to use is @Input and here we need to execute it, like a function.
 So in the end of decorator add (). Now we need to import that decorator from '@angular/core'. So for example:
 @Input <property>: ...;
 With these things, now we are successfully exposing this property to the world! So now any parent component of this component(child)
 which has a @Input() for it's property, is now be able to bind to that exposed property.
 When a component is parent of another component, we say that parent component is hosting that child component or is
 implementing that child component through it's selector.(Of course if the selector of that child component is instantiated in
 it's parent component.)
 IMPORTANT: You can only use the properties of the child component in template of parent components JUST ON THE INSTANCE OF THAT
  child component not on other component. For example if the selector of component is: app-server and it's exposed property is
  @Input x; and you want to bind this property in the parent component of this component, YOU MUST FIRST INSTANCIATE this
  component and then use this property on that instance not anywhere else.
  We instanciate a component by using it's selector.So if the selector is: 'app-server' , we instanciate this component
  by saying: <app-server [x] = "<a expression which maybe it's result's would change>"></app-server>
  So here, we're binding an exposed property of a child component in parent component and we know that when you bind a property,
  the value of that property would change based on the thing that is in ""(double quotes). So for example, in above piece of
  code we binded x which is an exposed of property of a child component to "<...>" . So as you can see that expression which is
  inside "" , can affect the x property. In other words we're changing the property of child component. So parent component is
  affecting the properties of child component with property binding of child component.
  Now you only can the properties of this component ONLY ON <app-server> not anywhere else.
  So this was custom property binding.
  Now custom event binding:
  In this kind of binding, we want to inform the parent component(which implements child components) of this component,
  So we want to emit our own event to inform the parent component. So it would be good if in the template of parent component or
  in other words the place we implement that child component, we could listen to a custom event which is in the child component
  and on the right side of equal sign, we would execute some code after that event was triggered. For example we would call
  a method which is defined in the parent component once the custom event which is defined in the child component is triggered
  and also we can catch the data which was emitted because of triggering the custom event.
  What is crucial is that the custom events which are defined in child component are PROPERTIES THAT WE CAN EMIT THEM LIKE
  THEY ARE SOME KIND OF EVENT. Of course we want to have an access to these properties from parent components of this child
  component but instead of using @Input() for these properties to mark them as properties that we can have access them from
  parents of this component, instead, we want to do the opposite! We want to mark these properties that like they are kind of
  events which we can emit them. So for making them an event, we need to assign them a new object of EventEmitter() class,
  then we need to import EventEmitter from '@angular/core'.
  So EventEmitter is a class that we can instanciate an object from it which allows you to emit your own events.
  Now you can use .emit() method on those event properties and pass that method some stuff that can be received in
  parent component, using $event variable.
  But currently one piece is missing. Remember that we added @Input() to make a property, bindable from outside to change
  that property from it's components. So now we need to add something to these properties to make them listenable from
  their parent components. So we need to use @Output() decorator and import it. Because we're passing our custom events OUT of
  this component. So the name of this decorator is right.
  RECAP:
  A)
  Now our components can communicate with each other. The first kind of communicate is parent to child and we can do it
  by binding properties of child component in parent component to some code and by executing that some code, we can change
  or affect the properties of that child component. So in this kind of communicate the parent component is affecting the child
  component by binding the properties of child component in template of parent component. So in this kind of communicate,
  the parent component can communicate with child component by executing some code in "" of right side of binding the
  property of child component.
  Example:
  [<A property of child component>] = "<an expression that maybe pass some data to child component or other kinds of work>"
  B)
  Another kind of communicate is that child component can affect the parent component or in other words can send or emit
  some data to parent component by making the properties of child component, a custom event which can emit some data.
  So now other components can listen to your custom event.
  Example:
  (the property of child component which is a custom event that emits some data) = "<a method of parent component which gets
  the data that the property of child component emits by passing it the $event variable and in defenition of this
  method in .ts file of parent component, we can receive this $event variable by passing the definition of method an arg with
  any name>"
  EventEmitter is a generic type which is indicated in typescript by using <> and in between those <> , you simply define
  the type of event data you're going to emit.
  You can pass in a name in parentheses of @Output to use that name in parent components and use the real name of property inside
  that component.
  It can get complicated to emit an event in child component and receive that data which that event emits and then maybe
  change something in parent component and pass some data down to child component.So these chains of inputs and outputs
  can grow complex.
  So There are some use cases where the distance between two components that should talk to each other is so long so building a
  chain of inputs and outputs would be complex. So in services we have another approach of having components talk to each other.
  -->
<!-- Assigning an alias to custom properties:
 You can pass an argument to @input with the property name that you want to use that new name of property outside of
 that component. So: @Input(property2) <property1>: ...;
 So in this example, we still use property1 name in that folder of component, but now we MUST use property2 in the components
 that implement this component(parent components of this component).-->
<!--  We know that css normally doesn't really care in which css file you define a rule, it simply is applied to
      the whole document NORMALLY. BUT WHEN YOU ARE USING ANGULAR, THIS NORMAL BEHAVIOR OF CSS DOESN'T WORK ANYMORE.
      Important: So every css file is just for that specific component and no other component. Even if you select all
       <p> elements in css file of one component, that rule won't apply to <p> elements in other components. This behavior
       is ENFORCED by angular. Why enforced? Because the default behavior of css is opposite of this behavior.
       So we can say, each css file for components, encapsulate the styles for that specific component.
       For example, when you select .p {...} in the css file for one component, because of default behavior of css it would
       apply to whole application. But angular doesn't want this. So it had to add an attribute for each component to make
       the styles of each component, specific for that component and not anything else. That attribute is special for
       each component and it would be like: [_ngcontent-ejo-<i>] . i can be 1 2 or ... .
       So all of the html elements which are in one component, have a specific attribute like above. So when we add css rules
       in css files, angular add that special attribute to all of the html elements which are in one component, therefore
       the styles that we define in css file of a component, ONLY apply to html elements in DOM which have that attribute.
       So in DOM, we have elements with [_ngcontent-ejo-3] so we find out those elements are for one component and will
       share one specific css file which is only for that component.
       So we find out angular enforces css encapsulation, but it can't do this encapsulation magically right?!
       So what does it do is it simply gives the same attr to all html elements in a component and it does it for each
       component with different unique attr and also it would give all of the selectors that are in css file of a component
       that exact attr which it gave to elements that are in that component, so those styles only get applied to elements of
       that component and no other component.
       So if angular gives attr of [_ngcontent-ejo-3] to all of the html elements of a component, it also adds this
       [_ngcontent-ejo-3] attr to all of the selectors of the css file of that component to make sure ONLY the elements if
       that component receive those styles and no other elements in other components. This is how angular enforce that behavior.
       It kind of emulates the shadow DOM. The shadow DOM is a technology which is not supported by akk browsers. In shadow
       DOM, each element has it's own shadow DOM behind it. But here it kind of simulate this shadow dom by using attrs.
       You can override the encapsulation of styles for each component. For this, you can add sth to @Component in .ts file
       of component. It's a property in object of @Component and it's called: encapsulation and for value, you give
       ViewEncapsulation which ViewEncapsulation needs to be imported from '@angular/core' and then you can choose between
       3 modes of ViewEncapsulation. emulated is default one. If you say ViewEncapsulation.None , now the component which has
       encapsulation: ViewEncapsulation.None hasn't the view encapsulation anymore, so it's elements and css rules haven't
       special attr anymore. Now if you declare styles in this component, if those styles are applicable by elements with even
       a special attr, they will ALSO get that style which is defined in another component!
       So imagine we have a component which has ViewEncapsulation.None and in it's styles we declared:
       P {
        color: "blue";
       }
       .someClass {
        ...
       }
       The styles which are in p selector would apply to all of the <p> elements that are in other components. But the
       styles for .someClass , would also applicable to elements in other components IF they have this class.
       So by using ViewEncapsulation.None , all of the styles which are in css file of that component have potential of
       being used in other components even in other components we would have a special attr for their elements and their
       css code.
       Because when you for example select .p in css and give it some styles, it doesn't matter an element has a special
       attribute. Because .p will MATCH that p element with special attr so it would apply to that element even if that
       element is in another component. But if the selector would be: .p [<special attr>] , this selector would match with
       p elements that have this special attr.
       ViewEncapsulation.Native uses the shadow DOM technology. This should gives you the same result as before with emulated
       but only in browsers that support . So in most cases you would use ViewEncapsulation.Emulated which you don't need
       to use this because it's the default behavior.
       RECAP: So by default, ONLY YOUR component would receives the styles that you define for it and not other components.-->
<!-- Using local references in templates:
 If you don't want to use two-way data binding in a template file, so instead of using [(NgModel)] = "..." , we can use
 local reference on that element. A local reference can be placed on any html element.
 Learn: So when you define a local reference on an element, that reference will hold a reference to the element that it is
  defined on that element. So it's a reference to that WHOLE HTML element with all it's properties and not just only
  a reference to the value of that HTML element(for example we defined it on <input>).
  The type of a local reference is: HTMLElementInput
  Now you can use that local reference everywhere on that exact template and not in /ts file or not anywhere else. But
  for example you can pass that local reference to () of a method call in that template and use that local reference in
  .ts file, where you define that method, bu defining an arg for that method to receive that local reference.
  Recap: A local reference is a very nice feature to get access to some elements in your template and then use that reference
  either directly in that template or you can pass it to a method call and ... .
  So for getting using the local reference we just write it's name without #.
  -->
<!-- Getting access to template and DOM using @ViewChild:
 There's also another way of getting access to local references or in other words to any element actually. But with this
 approach we can also access that reference DIRECTLY from .ts code . Right now we can only use the local reference in .ts code
 by actually calling a method in template and pass the local reference to that method which is defined in .ts code and
 receive it in .ts code by defining the method an arg. But sometimes you want to access that local reference. before
 calling that method. For be able to do this, we must add a property to the in class of .ts file by adding it a decorator
 called @ViewChild() and then import it from '@angular/core'. But @ViewChild() like this, won't work. We need to pass it
 an argument and that arg is how we want to select that html element in .ts file. But not like a css selector, but we can
 pass in the name of the local reference that we used on that element to @ViewChild('<name of local reference of that element
 we want it in this .ts file>', {static: true}) decorator. But also you can select that element by passing the type of
 component not as a string. So for example if we have shopping-list component, we would pass in shopping-list (not as a string)
 to @ViewChild() . But important: it will only select the first occurance of that element in template file.
 So it's better to use the local reference of that element which we want to access it in .ts file instead of type of that
 component. Because the goal of all of doing this, is to make components communicate to each other.
 But now the difference between passing the local reference to a method of .ts class and passing local reference of
 that element which we want to use it in .ts file, to @ViewChild() , is in the first approach, the type of local reference in
 first approach is HTMLElementInput but in second approach the type of property that you were used
 in .ts file which is like: @ViewChild(<'local reference'>, { static: true }) < name of property>, would be ElementRef.
 Which HTMLElementInput is element itself but ElementRef is a reference to that element not the element itself.
 So if you want to specify the type of those properties in .ts file, you need to first import that type from '@angular/core'.
 Although the ElementRef type is not the element itself, but we can solve it and actually get access to element itself by using
 the property which is the type of ElementRef and then use nativeElement property on it.
 So with nativeElement property we get DIRECT access to
 elements in DOM by using @ViewChild() decorator, which wasn't possible before by using just the property in .ts with type
 of ElementRef alone.
 When you add @ViewChild() on a property, the type of that property would be ElementRef and the properties that have ElementRef
 type, have a useful special property called nativeElement property. With this property we can get access to underlying element.
 So now without 2-way binding and by using local references passed to .ts methods or by getting local references in @ViewChild() ,
 our app works again.
 It's better not to change the element through using @ViewChild() and it's property. So you shouldn't access DOM through this
 approach. Because angular offers you a better way of accessing DOM with directives. So generally you should use string interpolation
 or property binding if you want to output something in DOM and you shouldn't mess with any element itself if you even CAN do it through
 angular.
 -->
<!-- Another way of passing data around:
 Everything you place between opening and closing tag of your own component is lost by default (is simply removed from the DOM.) and
 angular won't even care about it.
 For example:
 <app-server>
    <div>...</div>
    <div>...</div>
    <div>...</div>
 </app-server>
  So all of the 3 divs and their content won't be in DOM.
  But you can change this behavior. We can use a special directive (it's directive even though it's looks like a component, but
  it doesn't have it's own template) and you can add this directive where the codes that you placed in between of opening and
  closing tag of component, would be actually.
  So imagine you want to put that p element where you USE the component itself.
  First cut and paste that p element in between <app-server> tags. But right now it doesn't displayed on the page. Because
  by default we can't put anything in between where we use our component.
  For fixing that, we place <ng-content> opening and closing tags where the <p> elements where.
  <ng-content> serves as a hook where you can place in your component template to mark that place where you put it for angular
  to ell it where it should add any content if it finds in between opening and closing tag of component selector.
  But with this tiny addition, everything would work but there's a difference and that is the <p> element that you put between
  the opening and closing tag of component, would be projected into your component.
  Property binding would be an alternative to this approach and in property binding, angular would escape html tags because of
  cross site scripting attacks but there's a workaround for that.
  server-component.html :
  ...
  <p>
  </p>
  ...
  app.component.html :
  ...
  <app-server>
  </app-server>
  ...
  -->
<!-- Component lifecycles:
 ngOnInit() is a lifecycle hook and angular supports a couple of lifecycle hooks.
 If a new component is created in angular and instanciated(by using the selector of that component in it's right way. For example
 if the selector was a =n attr selector we must use that component in attr of an element and ...),
 angular goes to a couple different of phases in this creation process and it will give us a chance to hook into those phases and
 execute some code. We can hook into these phases by implementing some methods that angular will call those methods if they
 are present and exist.
 The first phase or the first hook that we can hook into it, is ngOnChanges and this actually maybe executed multiple times.
 It's executed right at the start when a new component is created but thereafter, it's always also called whenever one of our
 bound input properties changes(properties which are decorated with @Input()- so whenever these properties receives new values).
 So it's called after a bound input property changes.
 The second hook is ngOnInit() . This method gets executed once the component gets initialized. Initialization finished does NOT mean
 that we can see that component on the page. Because it hasn't added to the DOM yet (it has not been displayed yet). But it means that
 angular finished the basic initialization and the properties of that component can now be accessed and are initialized.
 So you can say the object is created in this phase and still we can't see the component itself.
 Also ngOnInit() will run after the constructor() .
 Third hook is ngDoCheck() . This will also run multiple times, actually this method will executed a lot. Because that will run
 whenever change detection runs.
 Change detection is the system which angular with this thing detects whether something changed on the inside of a component or
 not?(so whether it needs to change something in the template or not?) . So whether value of properties changed and also that
 property is output in the template. So because the property's value has changed and that value is used in the template, well
 of course angular needs to re-render that part of the template and ngDoCheck() is a hook that gets executed on every check that
 angular makes. Now important: On every check. So not if just something changed, but also a lot of times ngDoCheck() will run because
 you clicked some button which doesn't change anything, but still it is an event and on events, angular has to check if something
 changed. Because how else would it know?!! We don't tell it right?! So it has to check on certain triggering events like you
 clicked somewhere or a timer fired or an observable was resolved, on all of these occasions angular will check your code
 and ngDoCheck will run.
 ngDoCheck is a very good method to use if you want to do something on every change detection cycle. Like in ngDoCheck maybe manually
 we inform angular about some change it would not be able to detect otherwise.
 ngAfterContentInit(): This is called whenever the content which is projected via @ngContent has been initialized.
 So not the view of the component itself but instead the view of parent component especially the part which will get added
 to our component through @ngContent from the view of parent component into our component.
 ngAfterContentCheck: This is executed whenever change detection check the content we're projecting into our component.
 ngAfterViewInit: This is executed once the view of our own component has been finished initializing. So once our view has
 been rendered.
 ngAfterViewChecked(): This is executed whenever our view has been checked. So once we're sure that either all changes
 which had to be done, were displayed in the view or no changes were detected by angular.
 ngOnDestroy() :If you destroy a component, for example if you placed *ngIf on component and the value of *ngIf gets false and
 therefore it removes it from DOM, at that point ngOnDestroy is called and in that method is a great place to do some clean up
 because this method is called right before the object itself will be destroyed by angular.
 Whenever a new instance of a component is created all of those hooks would executed again, if the right time for them would come.
 Because it's a brand new instance and doesn't have anything in common besides the class that it was created from, with the
 previous instance of that component.
 Remember: When you are using ngOnInit or other hooks, it's a good practice to show you're implementing those interfaces by
 saying: export class MyClass implements onIt, onChanges ... {}
 and then you must import onChanges and ... from '@angular/core' .
 But if you don't do this it wouldn't throw an error, so implementing the method like ngOnChanges will do the trick but it's better
 to be explicit about which interfaces your component is using. So we added implements onChanges and ... interfaces and also
 we need to import all of these interfaces from '@angular/core'
 ngOnChanges() is the only hook that actually receives an argument. We receive changes argument which is the type of
 simpleChanges and we need to import this type from '@angular/core'. Now if you log to the console the changes arg,
 it would be an object  which has element, which is the type of simpleChange and element is our bound property (the property
 which has @Input() decorator on it) and angular simply gives us some information about this bound property, like what's the
 current value of this property.
 It also specifies if this was the first change?
 Also it gives us the previous value and if it is undefined, it means we didn't change this property before.
 -->
<!-- Lifecycle hooks and template access:
 With Angular8, in @ViewChild('<The reference to the element in template>') you must use {static: true} since we'll also
 use the selected element in ngOnIt.
 You can access to template elements ONLY AFTER ngViewInIt() so if you want to use the elements in for example ngDoCheck()
 it wouldn't give you anything. But you can access them in ngViewInIt() and after this method.
 The order of running hooks by angular:
 ngOnChanges(), ngOnInit(), ngDoCheck(), ngAfterContentInit(), ngAfterContentChecked(), ngAfterViewInit(), ngAfterViewChecked()
 -->
<!-- In Angular 8 and +: To @ContentChild() and @ViewChild(), you must pass a second arg which is {static: true} if needed.
TODO write the full notice...-->
<!-- Getting access to <ng-content> with @ContentChild:
 If you want to access to the projected content which is the content that is in between of opening and closing tags of
 component which this component is used in other component in the template where this content would end up or in other words,
 which is the template of component that this content is in it, first you must give those elements a local reference like
 #<name of reference> . Now remember that you can access to this content that you use a local reference on it from the template
 that it currently lives in it, by using @ViewChild(). Because this content is IN the template of this component even though
 it WILL END UP in the template of the component which this content currently lives within it.
 Since we know it would end up in the template of component which it currently lives within that component, it's good to
 access this content from .ts file of that component. But in that .ts file, @ViewChild() won't work because that content is not
 part of the view of that component instead it's it's part of the content of that component. Which is why we also have
 separate hooks for them. contentInit() and viewInit() . So instead of @ViewChild() we can use @ContentChild() which also
 must be imported from core. In this director, for it's first arg we pass the reference name and the second arg is:
 {static: true} . Why we must pass in second arg? Because we'll use the selected element in ngOnInit() too and just
 like @ViewChild() , we need to add a property in front of @ViewChild() to store that html code which in this case is content code
 and it's the type of ElementRef and we can't access to that content or the properties of element that we declare a local
 reference on it, before we reach ngContentInit() .
 Remember that we use nativeElement on the property which we use @ViewChild() or @ContentChild() on it.
 We use lifecycle hooks to run codes at specific times.
 Learn: So we @ContentChild() to get access to content (which is some html of a component) which is placed in another component
  but then would passed on to template of it's original component via <na-content> .
 When you want to make an event which is inside the template of a component, listenable from outside of that component, first
 you have to create a property for that component which would be a property that we can make that property to be a new instance
 of EventEmitter<type of that property>() class. Now this property (event) can be caught from outside of that component and then
 you have to use @Output() on that property. Now in other components you can listen to this event by first instanciate
 that component and then use this piece of code as an attr of the instanciated component:
 <instanciated component (name of event(property) = "<what happen when this event triggered? Maybe call a method on the component
  which we are currently inside of the template of that component and the name of that method can be started by 'on...'.>")>
 </instanciated component>
 Also you can receive the data that we emitted in the parentheses of .emit(x) which in this case is x, in the method of component
 which that method is calling when the event is triggered by passing $event variable to () of that method and by passing an
 arg to definition of that method to get that $event.
 When data would come from outside of a component, we must use @Input() on the property in the component that gets
 that data from outside.
  -->
<!-- We need to manage which component should be displayed between <app-recipes> and <app-shopping-list> and we should determine
which one is displayed in the header component. So we should kind of pass information that specifies which link was clicked.
So then we can switch a property to only display one of those components in this template.
After we find out which link was selected, we must inform the template that we want display just that component which is
in relation to the clicked link. So we can use an event emitter.
Then in header component we're listening to the that event and receives it's data by passing $event to () the method which must
be executed(onNavigate() method) if that event was triggered.
We defined onNavigate() method in app.component and not in header component because we want to use that method to change DOM in other
parts of page not in header. So we define it in overall component.
Remember: For using the properties of a component inside the template of that exact component, it doesn't need to emit that property
of component. We can simply use it without anything else!
IMPORTANT: When you define an EventEmitter<>() on a property of a component you can use that event ONLY ON THAT COMPONENT and
 not on any other element or component which are in that template.
Learn: For making a property which is now an event by using EventEmitter<>() on it, we can use @Output() on that property
 to make this property listenable from parent components of that component.
Learn:
 When you add a for example click event to an element, it's better to call the method that would run after this event is
 triggered: 'on...' .
 -->

<!-- Directives:
Difference between attr and structural directives:
Attr directives are called like that because they sit on elements! Just like attributes sit on elements and structural directives
basically do the same but they also change the structure of DOM around the element that they used on that element. For example,
if you have *ngIf on a <p> element, if the condition of *ngIf goes false, the paragraph would removed from DOM. So overall view
is affected.Whereas about the attr directive, you never destroy! an element from the DOM. Instead you only change properties
of that element. For example the background-color.
So attr directives only affect the properties of the element that they sit on that element and:
They look like a normal HTML attribute (possibly with data(property) binding or event binding)
Only affect/change the element that they have sit on that element.
Structural directives:
They also look like normal html attrs but with having a leading * (for desugaring)
Affect a whole area in the DOM (elements get added or removed)
What does the * means on the structural directives?
-->
<!-- When you have:
<p *ngFor="let number of numbers">
...
</p>
 You can use that temporary number variable anywhere inside that the element which *ngFor is sits on so in this case <p> element.
 Important: We can't have more than one structural directive on a single element. So you can't have sth like:
  <p *ngFor="..." *ngIf="...">...</p>
 Important: You found out that we can use directives also on normal html elements and not only on components.
 Ex)
 Here we're saying: If odd %2 === 0 , add the class1 to this element (we defined odd property in the .ts file).
 <p [ngClass]="{class1: odd % 2 !== 0}">...</p>
 When you use [] on an attr, it indicates that we're binding on that prop. So [ngClass] means we're binding to some property on
 ngClass directive.
 ngStyle allows us to pass an object again like ngClass:
 Ex) <p [ngStyle]="{backgroundColor: odd % 2 === 0 ? 'yellow' : 'red'}">...</p>
 You can use as many attr directive on a same element as you want. -->
<!-- Creating a basic attr directive:
 Let's create a directive which simply highlights an element that we hover on it. Of course we can acheive this task by using
 ngStyle or ngClass simply! So let's create a folder inside app folder and call it basic-highlight and in there we create
 basic-highlight.directive.ts and in that file we export a class called BasicHighlightDirective and now to make it a directive
 instead of normal .ts class , we add
 @Directive({
 })
 and we need to pass in an object to configure this new directive.
 The one thing all of the directives need, is selector property in that config object. Because remember: We place directives in
 our template to attach them to elements. So we need to have some way to give angular that instruction and that is the selector.
 That selector also needs to be unique. Typically we use camel case for selector of directive. Like: 'app<CamelCase>'
 Now that string that I wrote would select the newly created directive by element. Therefore for using that directive we must use
 it like <directive></directive> . So it's better to write the selector in attr way. So we write it like '[appCamelCase]' instead of
 'appCamelCase'. So now we can use this directive like normal attrs.So like: <p attr>...</p>
 In other words, think selector just like kinda css selector. In css when we select elements like [attr] , the elements which
 are like: <element attr> would be selected and it's just like here.
 So now this new directive would be recognized whenever we add appCamelCase without square brackets to an element.
 Now let's change the background-color of the elements that this directive sits on them. For doing this task, we need to access
 to the element the directive sits on it and angular gives us this access.
 We can inject the element that the directive sits on, into this directive.
 Injection is basically is an easy way to get access to some other classes (.ts classes not css classes!) without having them
 to instantiate on our own.
 Now for creating this directive, we list a couple of args we want to get, whenever an instance of this class is created and
 of course angular is responsible for creating those instances. So therefore if we tell it to please give us a specific type of
 arguments (which are specified in () of constructor()), this is what injection is. Angular will try to create this thing we need
 and give it to us. Well 'this thing we need', in this case simply is a reference to the element that the directive was placed
 on it. So we made a name for arg of constructor but it's type is important. It must be ElementRef
 In @ViewChild() we also had a reference to an element which it's type was also ElementRef. Now in order to use the data we get
 everywhere in the class, we must store it in a property but also we can use typescript shortcut of adding private accessor,
 in front of the arg that is coming in the constructor(so it is in the parentheses of constructor). So this shortcut will make
 the args which are in () of constructor of class, a property of class and also automatically assign the arg which is instance
 we're getting from () of constructor to a property of class with same name.
 (so like: this.<prop> = <arg in () of constructor>)
 Now with this, we got access to the element, so we can use it.
 Learn: Just like components, the directive also has the ngOnInit() lifecycle hook.
 import {Directive, ElementRef, OnInit} from '@angular/core';
 @Directive({
    selector: '[appBasicHighlight]'
 })
 export class BasicHighlightDirective() implement OnInit {
    constructor(private ElementRef: ElementRef) {}
    ngOnInit(){
    So what we're doing here is we're getting access to the element that directive was placed on and we're overriding the style
    of that element.
      this.ElementRef.nativeElement.style.backgroundColor = 'green';
    }
 }
 To use this directive we have to do 2 things.
 First, like for a component, we have to inform angular that we have a new directive. Because just like for components, angular
 doesn't scan all of our files, so it doesn't know we created a new directive or component. So we have to go to app.module.ts
 and in declarations array, we have to add the name of that directive and also add an import in that app.module which is
 pointing towards the created directive. Now we informed angular, so we can use that new directive.
 Now we can use our directive without setting any value for it and also we don't use square brackets for this created directive.
 Because the directive name is just the selector string which is inside those [] and those square brackets are not part of
 directive's name but they are part of selector style telling angular, "please select this directive as an attribute" so those
 [] are not part of directive's name.
 <p appBasicHighlight></p>-->
<!-- As you can see in the previous comment, we are accessing the element by using nativeElement property and it's not a
 good practice. You should use a different tool because angular is also able to render your templates without a DOM and then
 these properties(like nativeElement) might not be available. It could do that when using service workers. So it's not a
 good practice to directly access your elements.
 There is other helper that you can inject. It's the renderer.
 Learn: You can create new directive files with:
  ng g directive(or just d) <name of directive>
  then you can put files into their folders. Or also you can create a directives folder.
 Now you need to pass renderer with type of Renderer2 into () of constructor. Also don't forget to import it from '@angular/core'
 Now with inject that renderer, we can use it in ingOnInit() again.
 On renderer, we have couple of methods that we can use to work with DOM. Like setStyle() . Now in order to use this method,
 we need to have the element for which we want to set the style for it and there are some ways to get such an element and in
 directive, we can simply inject the element reference which is by using an arg for that which with this new shortcut, this new
 arg would be automatically assign to a private property, we called it elRef and it's type would be ElementRef. Also we need
 to import ElementRef. Now we can pass the reference to that element which is a property in our class too (by using that shortcut)
 by passing it to setStyle() method.
 Remember that we can't pass the reference itself to the setStyle() method, but we need to get access to the element itself.
 So therefore I used nativeElement property on reference of that element as the first arg.
 In first arg we define which element we want to style by passing the element itself. In second arg we say which style we want
 to set.
 In fourth arg, we pass in flags object and this is optional. So maybe you want to add !important tag.
import {Directive, ElementRef, OnInit} from '@angular/core';
 @Directive({
    selector: '[appBetterHighlight]'
 })
 export class BetterHighlightDirective() implement OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    }
 }
 ALso don't forget the app.module in this case too!
 <p appBetterHighlight></p>
 Why using a renderer is a better approach?
 Angular is not limited to running in the browser, it also works with service workers and service workers are environments
 that where you might not have access to DOM. So if you try to change the DOM as you did in the first example of this highlighter
 directive, so by directly accessing the nativeElement and the style of element, you might get an error in some circumstances.
 So it is good to use renderer for DOM access and also to use the methods that renderer provides like setStyle() and ...
 to access the DOM. -->
<!-- Using HostListeners to listen to host events:
 Now we only want to change the background of that element, if we hover over that element and if we move the mouse away,
 it should go back to transparent.
 So now we need to react some events that occurring on the element that directive sits on it and an easy way of doing this
 inside the directive is to simply add a new decorator and we want add this new decorator to a method we want to execute.
 In this case, that method is mouseover.
 Now that code inside @HostListener will occur whenever the event specified in the () of @HostListener() is triggered which we
 pass the name of that event to () of @HostListener, as a string.
 Remember: The name of mouseover is desired and you can choose whatever name you want. The name that is important is
 the name of the event in () of @HostListener() .
 mouseenter is one of the events that is supported by DOM elements which this directive sits on those elements.
 You can also listen to custom events and retrieve the data that by triggering that event would emitted by adding an arg in
 () of mouseover.
 So @HostListener is just a convenient way of listening to events on that element.
 So in this example, we are listening to mouseenter event and we get the data by triggering that event by using eventData arg.
 Now we say whenever mouseenter event occurs, we want to change the background-color of the element.
 import {Directive, ElementRef, OnInit} from '@angular/core';
 @Directive({
    selector: '[appBetterHighlight]'
 })
 export class BetterHighlightDirective() implement OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){
    }
    @HostListener ('mouseenter') mouseover(eventData: Event) {
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    }
    @HostListener ('mouseleave') mouseleave(eventData: Event) {
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    }
 }
 So now with @HostListener we're reacting to user events or to any custom events. -->
<!-- Using @HostBinding() to bind to the host properties:
 We have another decorator which allows us to not use the renderer. We can get an even easier way of simply changing the
 background-color in this example. So we can use @HostBinding() decorator . First of all we need to bind this decorator to
 some property which the value of that property will become important. So we created a new property for that decorator which in
 this case is backgroundColor.
 In @HostBinding() we can pass a string to it, defining which property of the hosting element we want to bind. Now properties
 of the hosting element, that is what we also access in BasicHighlightDirective . style would be an example of such a property and
 on that style property we have for example, backgroundColor property. So in () of @HostBinding() we can say 'style.backgroundColor'
 camelCase of backgroundColor is important because we're accessing the DOM property which doesn't know dashes.
 So with this we're telling angular that on the element this directive sits, please access the style property (which usually
 all of the elements have, but for example for other directives which access sth like value property, this property is mostly on
 <input> elements not all of the elements), but again, the style property is available on any element. So in () of @HostBinding()
 we're accessing the style property which has a sub property called backgroundColor and we set this property equal to whatever
 backgroundColor is set to.
 So in the @HostBinding('style.backgroundColor') backgroundColor: string ;
 we are assigning the value of 'style.backgroundColor' of the element to backgroundColor property in this class.
 Also we need to set an initial value to backgroundColor property to not get an error when we mouse over the element for the
 first time. So we set it to 'transparent'
 Learn: DOM properties don't know dashes.So we use camel case for them.
import {Directive, ElementRef, OnInit} from '@angular/core';
 @Directive({
    selector: '[appBetterHighlight]'
 })
 export class BetterHighlightDirective() implement OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){
    }
    @HostListener ('mouseenter') mouseover(eventData: Event) {
      this.backgroundColor = 'blue';
    }
    @HostListener ('mouseleave') mouseleave(eventData: Event) {
      this.backgroundColor = 'transparent';
    }
 }
 So @HostListener() and @HostBinding() are great way for working with the element inside of directive definition and
 of course in @HostBinding() you can bind to any property of the element that this directive sits on that element.
 -->
<!-- Binding to directive properties:
 Right now, the colors of backgroundColor are hard coded, now we can make them dynamic by custom property binding.
 Also custom event bindings work in custom directive definition. But you probably won't use them in directive definitions.
 So now let's add 2 properties which we want to bind. But also again we are assigning some default colors for properties we
 defined because we MUST have default colors for them to not get errors.
 So we would have some default values for our dynamic backgroundColors but they can be overwritten from outside.
 @Directive({
    selector: '[appBetterHighlight]'
 })
 export class BetterHighlightDirective() implement OnInit {
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';
    @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){
    }
    @HostListener ('mouseenter') mouseover(eventData: Event) {
      this.backgroundColor = this.highlightColor;
    }
    @HostListener ('mouseleave') mouseleave(eventData: Event) {
      this.backgroundColor = this.defaultColor;
    }
 }
 Now it still is like before, but now we can bind those properties from outside which have @Input() on them.
 So on elements from outside of this file, we can use this newly created directive. So first you must use this directive on
 an element and then after that we can bind to those 2 properties. So like:
 <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'"></p>
 Notice that the directive's name itself is not in square brackets when you want to use this new directive.
 But we get a bug because initially before we mouseover to the element that uses this directive, the background color of that
 element is not set, but after first time mwe mouse over it and mouse leave on it, it would get it's default background-color.
 The reason for that is when we assign default color in:
 @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor; line,
 this.defaultColor is transparent for the first time. To prevent this, so let's take this line inside ngOnInit() so the
 properties of any element which uses this directive is initialized with the colors that we bind to it's properties before
 we see the actual element. Because now that element which uses this new directive would be initialized before anything has
 rendered but after our values here are available.
 So:
 ngOnInit(){
   this.backgroundColor = this.defaultColor;
 }
 Right now we have two looking-like directive things on the elements which are using this directive. An example of an element
 which is using this directive and passing it the colors of background color to overwritten the default values would be:
 <p appBetterHighlight [defaultColor] = "" [highlightColor] = ""></p>
 So we have those 2 kind of looking directives in this example, so how angular knows that we want to bind to 2 properties of
 <p> element which are default properties that are available on all <p> elements which don't have a defaultColor on it.
 Or to a property of our custom directive?
 The answer is that angular simply checks our own directives before it reaches the native properties of elements.
 We can bind to properties of our own directives by simply placing them in [] .
 But for ngClass , you see that somehow the directive itself is enclosed in [] and that's a typical use case specially
 when you have only one property to bind or at least one main property, then you can provide an alias. So like ngClass
 we can do that wrapping [] for name of selector of directive for our custom directive.
 For doing that, let's provide an alias for let's say highlightColor property. So we give it an alias by adding a string inside
 the () of @Input and that string would be the selector of our directive. So now if we set that as the alias for highlightColor,
 using the directive like <p appBetterHighlight [defaultColor] = "" [highlightColor] = ""></p> won't work.
 Instead you must enclose the name of directive in [] and set it to for example 'red'.
 <p [appBetterHighlight]="'red'" [defaultColor] = ""></p>
 But by default the directive name (which is used by selector of directive), is not enclosed in [] and that really happens
 if you want to bind to a property which has the same name or alias as same as name of your directive(name of directive is
 shown in selector property).
 One thing that is true about property binding in general:
 If you pass down a string like [appBetterHighlight]="'red'" (where we have [] and '' which is inside ""), we can remove
 [] and '' . So it would be: appBetterHighlight="red"
 So it's a special use case if you're passing down a string, you can use property binding without [] also you have to omit
 the single quotation marks which are inside double quotation marks.
 So if we use property binding like this, it's really clear and therefore no one thinks that this could be a REAL attr which
 is existing by default for this element.
 -->
<!-- What happens behind the scenes on structural directives:
 Why the * is required at leading of structural directives?
 That * indicates to angular that this is a structural directive but the question is why angular needs to know?
 Because structural directives with that * actually are just a nicer way for us to use them basically. Behind the scenes
 angular will transfer structural directives into something else because there is no * in angular syntax when using
 directives or using property binding or anything else. So there is no * operation. So behind the scenes angular needs to
 transform *ngIf into something like property binding, or two way binding or string interpolation and ... .
 For example if we want to write this code differently:
 <div *ngIf="!onlyOdd">
    ...
 </div>
 Alternatively:
 Inside <ng-template> we must put the content that conditionally we want to render it.
 <ng-template> is an element which itself is not rendered but allows us to define some code when the condition is true.
 So now on <ng-template> we place ngIf but not with * . Because this is the form actually the *ngIf with * will transformed to
 this form because of *. But now we place that ngIf without * inside [] and bind it to the condition.
 <ng-template>
    ...
 </ng-template>-->
<!-- Building our own structural directive:
 Let's create a directive which would execute when the condition is false. So it's opposite of *ngIf .
 Now in the body of class, we need to get the condition as an @Input() and then bind the condition we get to a property
 named unless(the name is desired), so the condition would saved to this prop.
 Whenever the condition changes, we want to execute a method and therefore we can implement a setter by using set keyword.
 By using set on a property, that property would now a method so we must give it () too. But still it's a property but it's just
 a setter of the property which is a method and gets executed whenever the property changes and it changes whenever this prop
 changes outside of this directive, so whenever the condition we bind to this directive was changed or some parameters of this
 condition was changed. So the unless property need to gets the property as the input so we added condition to GET the to it's () and
 now because it's the opposite of *ngIf we check for !condition .
 Keep in mind that our unless directive, will sit on such a <ng-template> component IN THE END because that component is what it gets
 transformed to by angular, if we use the * operator. So we can get access to this <ng-template> and also we need to get
 access to the place in the document where we want to render it.Both can be injected.
 We injected <ng-template> (because our directive would be end up in <ng-template> so we need this element therefore we need
 to inject it to the class.) in () of constructor() by using an arg like templateRef(you can name it anything you want) and
 it's type is TemplateRef.
 Learn: So just like ElementRef that gave us access to the element that the directive sits on it, TemplateRef does the same for
  template.
 The second information we need to inject is view container(where we should render it? that's what the view container shows us)
 In other words, the template is what and now the question is where?
 So in this case, vcRef marks the place that we placed this directive in the document.
 Now we can use vcRef whenever the condition changes to call the createEmbeddedView method which creates a view in the passed
 view container.
 We call .clear() method to remove everything from that place in the DOM.
 @Directive({
    selector: '[appUnless]'
 })
 export class UnlessDirective() {
    @Input() set unless(condition: string);
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {
    }
 }
 Don't forget to add the new created directive to declarations array in app.module and also import it there.
 <div *appUnless= "onlyOdd">
    ...
 </div>
 Using * is important, because although this is a custom directive but it's still a structural directive. Otherwise if you
 didn't want to use *, we would have to manually write <ng-template> syntax like we did before.
 Now we get an error that says we can't bind to appUnless because it's not a known property. Why?
 Because with @Input() we're binding property which named unless but keep in mind that angular will automatically transform
 this directive when is used on an element by using the selector of this directive to <ng-template> syntax which this syntax
 would using the name of the property which is ???TODO
 TODO WHY??? So we have to make sure that our property which is currently named unless, have the same name of directive. Exactly the
 same as selector property.
 -->
<!-- ngSwitch structural directive:
 First we bind to ngSwitch like property binding but without * at this point, and then in "" is what we want to check.
 So:
 <div [ngSwitch] = "<what we want to check>">
  <p *ngSwitchCase = "1">message1</p>
  <p *ngSwitchCase = "24">message2</p>
  <p *ngSwitchCase = "35">message3</p>
  <p *ngSwitchDefault>message4</p>
 </div>
 Now we need to add something to those <p> elements to control which <p> gets shown. That something is *ngSwitchCase
 So if you find yourself creating a lot of *ngIf s , it's good to use [ngSwitch]-->
<!-- Remember: Always select a UNIQUE name for selector property which is in the object that we pass in to @Directive() or
 @Component() . So it won't intefere with an officially existing attr name.
 -->

<!-- Using services and dependency injection:
 When you're duplicating code in two or more different components or if you write some code that you don't know you will use
 it in some other parts of your app, in both use cases so duplication of code and providing data are typical use cases for
 a service. Because a service is another class you can add which acts as a central repository or as a central business unit or
 something you can store and centralize your code into that.
 Also when we want to communicate between components, services can be helpful.
 Why would you need services?
 Create a logging service:
 Now we want to create a logging service. Since it is a simple service we create it in app folder. Also you can create that file in
 shared folder and the file name would be: logging.service.ts
 Remember: A component becomes a component by attaching @Component() decorator and also a directive becomes a directive by
 attaching @Directive() decorator to it's class.
 But this isn't true about services. A service is just a normal ts class.
 But how use services?
 You might think, you can import the service file in the file you want to use that service and then instantiate that service's
 class and then call the method on the object you created. This would worked But this is wrong because this is not how we use
 services in angular.
 Injecting the logging service into component:
 We can use angular's dependency injector
 A dependency is sth that a class of ours depends on it. For example the account component depends on loggingService because
 we want to call a method in that service and the dependency injector simply injects this dependency or in other words,
 injects an instance of this service into our component automatically.
 All we need to do is to inform angular that we require such an instance. So we add a constructor to the component.
 So we pass in an arg named loggingService and then we must add a type assignment and that type has to be the class you want
 to get injected. In this case that class is LoggingService and this simple task (adding an arg which it's type is the
 class that our component depends on it) tells angular that we will need an instance of this LoggingService.
 Why this matter if we write it in the constructor?
 Well we know that angular is responsible for giving us the instance of this component?
 Angular because we're placing the selectors of components in our templates and when angular comes acrros these selectors,
 it gives us instances of the components it see in the templates. Now since angular is responsible for instantiating our components,
 angular will need to construct them correctly. So if we define in that constructor that we require some args, angular will
 recognize it and now it tries to gives us that arg and in this case it would try to give us the type. So it knows that we want
 an instance of the loggingService class because we defined the type.
 Now angular knows WHAT we want but it doesn't know how HOW to give us such an instance. So we need to provide the service.
 Provide means we tell angular how to create it. All we need to do is to add one additional property to @Component decorator
 and it's providers property. The providers property takes an array and in there we need to specify the TYPE of what we want to
 be able to get provided. Now with that, angular when analyzing that component, recognizes that it should be able to give us such
 a LoggingService and when it actually builds the component (or constructs it), it sees that we want to have such an instance
 and now in our component we can access loggingService property and call it's methods. So now instead of prior approach
 we are NOT creating the instance MANUALLY, angular does it for us and why is it better?
 Recap:
 So first we need to add an arg in constructor of the component that simply gets the service and also the type of service we
 want to inject is super important to tell angular about what we need in this component and add the type of service to providers
 array.
 @Component({
    selector: ...,
    ...
    providers: [LoggingService]
 })
 export class <someClass> {
    ...
    constructor(private loggingService: LoggingService) {}
    this.loggingService.logStatusChange(accountStatus);
 }
 Now we're injecting the LoggingService into our component.
 -->
<!-- Creating a data service:
 export class AccountsService {
    accounts = ... (some data);
    addAccount (name: string, status: string) {}
    constructor () {
    }
    some methods for updating the data
 }
 IMPORTANT: Most initializations of a component shouldn't be done in the constructor() but in the onInit() hook. For example
  storing the args we get in () of constructor() should be done in ngOnInit() . If you don't use the .ts shortcut that we simply
  add the accessor of properties in () of constructor and it will do the rest.
 Understanding the hierarchial injector:
 The angular dependency injector actually is a hierarchial injector, that means if we provide a service in some place of our app,
 let's say on a component, angular knows how to create an instance of that service for this component and also all of it's
 child components and actually this component and all of it's child components and their childs and ... will receive the
 same instance of that service.
 There are other places that we can provide a service too. The highest possible level is app.module.ts and if we provide a
 service in that file, the SAME instance of the class of service is available in our WHOLE app.
 The next place is app.component so in app.component and all of it's child components would have the same instance of that service
 which we provided.
 Learn: So generally if we provide a service in one component, all of it's childs also get the same instance of that service.
 You might have an application where you want to have many different instances of the same service but you absolutely
 don't want to have same instance.But sometimes you do want to have same instances. So it's possible to have 3 different instances
 of one same service on a component that is like a child of some components.So maybe the first instance gets created in
 app.component . So app.component receives it's own instance of that service and therefore all of it's child components get
 that exact instance and again in hose child components we're providing the service and therefore they get their own instance
 of service. So we are overwriting the instance we would get from the app component in it's childs.
 So if you again use providers array and pass in the type of service in childes of app.component , therefore the child components
 have their own instances of that same service.
 How we can fix it? We just remove the type of that service from providers array in child components. But don't remove the
 arg and it's type of service in () of constructor in child components.Because that arg tells angular that we want an
 instance of service in this component, but providers array tells WHICH instance. So in there we need to remove it.
 So leave the arg of service in child components and also the import statement of the file of that service in child components.
 But remove the service type from providers array in child components.
 So now we're using JUST ONE INSTANCE OF THAT SERVICE, by providing it in app.component file. Instead of creating different
 instances and overwriting the instance that is coming from parent component and use different instance in each child component.
 So it would be messed up.
 So now let's add the service class we want to have, inside app.module and delete it from our component files. So now ONLY
 app.module.ts file have the type of service class inside it's providers array. So now WHOLE application receives the SAME
 instance of service. Now with this, we can even inject a service into another service because that's not possible by providing
 the new service that we want to inject to another service, on component level. So we can't just provide the service that we want
 to inject into another service, into a component. For example if we want to inject service2 inside service1, this code is
 incorrect if we write it in component level(app.component or it's children):
 providers: [service1, service2]
 Instead we need to do this in app.module file. So we write all of the services in there.
  -->
<!-- Injecting services into services:
For doing this, you must add an arg for the service you want to inject and also it's type in the () of constructor and also
import the file of service you want to inject into this service at the top of this service file.
Learn: So for injecting service1 into service2 , you must add an arg for service1 and it's type in constructor of service2
 and if you want to use shortcut, you can say: constructor(private service2: type of service2) and then import the TYPE of
 service1 at top of the file of service2. Also don't forget to add the services in app.module.ts file.
 Now you might think that you can use the service1 inside service2 and for example call the methods of service1 and ... .
 BUT NO YOU CAN'T.
 It would throw an error which saying: Can't resolve all parameters of service2.
 Important: The reason is if you inject a service into something, this something needs to have some metadata which is attached
  to it. We knew a component has some metadata because we have @Component() before the class of component also a directive
  has some metadata because we have @Directive() .But currently our services doesn't have any metadata.
  Now you must add @Injectable() to the service that you want to service2 , or to the service that you want to inject another
  service to it. This decorator tells angular that this service is injectable or in other words it's something that can be injected
  So we added @Injectable() to the service that receives another service and you don't need to add this decorator to service1.
  So if you don't want to inject anything in a service, you don't need to add @Injectable() to that service. So only add
  @Injectable() , if you expect to something be injected in that file.
  In other words, you really need to add @Injectable() if you would inject something into this service.So do not use @Injectable()
  for this service if you just inject this service somewhere else and nothing would be injected into this service.
  But it's a good practice to always add @Injectable() to ANY service.
 -->
<!-- Using services for cross-component communication:
 Let's say when you click on a button which is in a componentA, you want to output something in componentB .
 Normally, without services, we would have to emit an event in componentA and catch that event and then we would have to pass
 the new data down via property binding to the component where we want to handle it.
 Instead, we want to provide some event in service file which we can trigger in one component and listen to it in another
 component. So we can use a service that create a new EventEmitter() and then inject the service into the component which we want
 to emit that event from that component, so in that component file we use the service which is stored in a property of class of
 that component and use .emit() method on it.
 So now in component file, we are emitting the event that we set that event in service file.
 So event emitter lives in service file but using emit() method for emitting that event, lives in the component file and now
 in the component that we want to listen to this new event, we must get the service (we can do this by using an arg in
 constructor() of this component and then store that arg which is the service type into a property of this component) and
 when we get the service, maybe you call a method of that service and on that method, you use .subscribe() method and then
 inside () of .subscribe() you can receive the data which the event you used .subscribe() on it, emitted.
 Why .subscribe() ?
 Because EventEmitter() in the end kinda wraps inside an observable.
 So now with this approach we're not creating a chain of property and event binding for cross component communication,
 instead we have cross component communication through a service which in that service we are creating an instance of
 EventEmitter() class and then using .emit() in the component that emit the event and using .subscribe() in the component
 which catch or receives the event or data.
  -->
<!-- We should place services, next to the feature or in the folder which is holding the feature that those feature belong
 to that folder. So if we want to create a recipe service, the recipe folder looks like a good place for that service. -->
<!-- Routing:
 What if we want a page that you actually displays several pages. Now you might think for doing this task, we need actually
  multiple pages or in other words you need multiple index.html files in order to have multiple pages in this website.
  But you don't. Because angular ships with it's own router which allows you to change the url and still only use one page
  but then exchange major parts or a lot of parts of that page. So to the user, it seems a new page was loaded because a lot
  of things were changed. But behind the scenes, it is still JS which is changing a lot of parts in the DOM and therefore make
  that page looks like a new page.
  Why do we need a router?
  Angular router needs to know which routes our front-end app has?
  Now where we must define the routes for our app?
  It's better to define our routes in app.module.ts file, because routes are application-wide and we know that the app.module.ts
  file is an application-wide file.So in that file and above @NgModules() decorator, we add a new variable for our routes and this
  variable which holds the routes of app must have a specific type and that type is Routes, which this type needs to be imported
  from '@angular/router'.
  Now this const should holds an array. Because we will have multiple routes and each route is a JS object.
  Now the question is how a route must be configured in an angular app?
  A route must follow a specific structure or pattern, so angular would be able to use that route and this structure always needs a
  path. The path prop is what gets entered in the URL after the domain of website and make sure you don't add / at the beginning of
  path prop. For example: path: 'users' means: localhost:4200/users and you shouldn't use / at the beginning of 'users'.
  const appRoutes: Routes = [
    {path: 'users', component: <some component that is looks like the PAGE you want to display>}
  ];
  Now you should define what should happen when that path is reached. The action typically is a component, so with this property
  you inform angular that once this path is reached, a certain component should be loaded and that component will then be the PAGE
  which gets loaded.
  So in your app, you must configure the components that you want to use them as pages, so they must have all the content you want
  to have on that page. So those components must ACTUALLY LOOK LIKE PAGES.
  Also you can have '' for the path. Which is for base url. So like: localhost:4200 and for that you must use a component that
  looks like the home page and of course you don't need to have such an empty string for handling the home page with this approach,
  but then you somehow have to handle this route in a different approach.
  Now they are defined but they alone won't do anything. How would angular know that you want to use that appRoutes constant?
  So we must add a new element in imports array in app.module.ts file. We need to add RouterModule there and also import it from
  '@angular/router'. So with this, we are adding the routing functionality to our app, but still our routes are not REGISTERED.
  That is why RouterModule has a special method that we can call which allows us to register some routes for our main application
  and the name of that method is forRoot() . Now we pass that constant to that method.
  Now the missing piece is we need to have some place to render the currently selected component. Because if you look at the
  app.component.html file, we still add our components with their selectors there. Now ok! We visit '.../users' , so angular
  knows that we want to load the users page but how does it know where to display that users page in app.component.html?
  So we must specify where we want to display the components which are for routes, in the app.component.html.
  Therefore we need to use a special directive <router-outlet>. Now it's looks like a component but it's a directive.
  Because we knew that directives may have selectors which make them look like components or also have selectors that make them
  look like attrs and now with <router-outlet> we marked a place in our app.component.html where we want the angular router to load
  the component of the currently selected route. So in <router-outlet> maybe the home component would be placed by angular IF the
  user requested the home route and ... . So <router-outlet> is a place for placing the components which we specified them in
  component property of the route objects in app.module.ts file.
  Now if users write those routes in the url, they can see the app.component.html with the special component which we specified
  for that specific route. -->
<!-- Navigating with router links:
 Right now we can navigating around by typing the url of that page manually in the url. So we need some links to navigate around
 with them. So yeah! YOU COULD have some <a> elements with their href attrs which are like:
 <a href="/users"> or <a href="/"> for home page. But currently if you click on those links the app would be refereshed! It means
 for each click on those links, a new request gets sent to the server and as result, the new page is returned and since the
 returned page from server is still on OUR angular app with the routes registered on it, it is able to gives us the correct route.
 Also the same thing happen if we enter the route we want manually in the URL.
 Therefore this is not good. Because this behavior our app on every navigation or entering a new url and that means the state in
 whole app would be lost. So that is not how you should implement navigation(by using '/users' on href and ...).
 Instead we must use a special directive. So first let's get rid of those href attrs on <a> elements. That directive is routerLink
 and this directive is able to parse the string which is just a /... . Now this routerLink = "/" tells angular that the element which
 this directive is currently on it, will serve as a link in the end, but it will handle the click event differently.
 So for example: routerLink = "/users"
 For example: routerLink = "/users" but this example is incorrect. Because:
 this would search for a prop named /users which is even an invalid name in javascript and we don't have this prop.Instead
 we have to pass a string with '' inside of "" . Or we can do better by adding [] inside of "" for value of routerLink directive and
 also bind the directive itself. So we can also use property binding for routerLink too!
 Because with this array, it would give you more control over routerLink. Now in that [], you specify all the segments of the
 path, as elements in this array.
 Important: In this case the first element of array NEEDS the leading or beginning / whereas when we were defining the routes
  in app.module.ts and that's because by providing that / in FIRST ELEMENT of routerLink, we make that path an absolute path.
  But the next elements of route shouldn't have /. So for example if we want to specify the users/profile path,
  it would be:
  routerLink = "['/users', 'profile']"
  So we used array notation for value of routerLink's value, because by using [routerLink] = "['...', '...', ...]" notation instead of
  routerLink = "''" notation, it allows you to construct complex paths very easily.
  Now we haven't any reloading the app when we clicks on the element. Because routerLink catches the click event on the element
  that it sits on it and prevents the default behavior of <a> which is it would send a request and instead of that, routerLink
  analyzes what we passed to the it (that array of elements of path or url) and then parses and checks if it finds a fitting route
  in our configuration in app.module.ts .
 -->
<!-- Understanding navigation paths:
 What happens if we use the first segment of array of paths, without / . So like: [routerLink] = "['users']" instead of
 [routerLink] = "['/users']" . Or routerLink = "'users'" instead of routerLink = "'users'" ?
 Now if you click on links, you see they still works.
 But now if you create a dummy <a> element which it's href is pointing towards the current page which itself is on that page.
 So it's kinda a link for referesh that page. For example: If you're on .../servers page , let's create an anchor element which
 it's ref is pointing towards this page again. So like: <a routerLink = "servers"> or <a [routerLink] = "['servers']">
 Now if you click on this <a> element, it would give you an error and the error occurs because it doesn't find a route which is
 'servers/servers' . Now this error won't happen if we change <a routerLink = "servers"> to <a routerLink = "/servers"> and ... .
 In other words we must change that path to an absolute path (we changed it from 'servers' to an absolute path which starts with
 / . So '/servers'). So we turned the path from a relative path to an absolute path. So now if we click on that <a> it would go
 to .../servers instead of .../servers/servers
 Learn:So by using relative paths, it always appends the path you specified in routerLink to the end of your current path and
  the current path depends on which component you're currently on. That is why we COULD remove that beginning / from
  app.component.html . Because that is in our root component.
  The app.component is not loaded through the router. So this app.component is the root component which always sits at
  localhost:4200 or localhost:4200/ . So that component is always at the root level and this is why we can ALSO use relative paths
  in that component. But even one layer below this root level, once we loaded a route, that page is loaded if we are at
  /<page> and if we use <page> instead of /<page> , the <page> segment would APPEND to the route that we're currently on that.
  So it will try to load <page>/<page> and therefore it gives us error. Because we haven't registered <page>/<page> .
  Learn: You can also use relative paths by using ./ at the beginning of path. It's same as writing nothing. So:
   './servers' is the same as 'servers' and both are relative paths.
  In angular you can even navigate around like when you're in folder directories. So like using ../ . So '../servers' means
  first go one level up in directories and then append(WHY append? Because here we're using relative path) 'servers' to the path.
  But for example if you were on: '.../servers/something' route and you go to '../', the path would be .../ . So it didn't go just
  one level up but it went 2 levels up and removed both segments.
  Learn: So '../' does not neccisirly only remove one segment in path, but instead it would REMOVES THE CURRENTLY LOADED SEGMENT.
  So absolute paths always append to the ROOT DOMAIN and relative paths add the segments to the currently loaded path.
  -->
<!-- Dynamically add a kinda active class to the path which we're currently on it:
So it would be good if we could dynamically add that class to the active path. Angular gives us a specific directive for this
task and it;s routerLinkActive = "" directive. We can add this directive to the wrapping element or to the element itself
(the element itself is the element which has routerLink on it.) . For example:
<li>
<a routerLink="..."></a>
</li>
So in the example above, you can add routerLinkActive to the wrapping element of the element which has routerLink which in this
case is <li> or you can add that directive to the element itself which is <a> and that directive will atach the class that you
specify in between of "" to the element which this directive sits on.
When using bootstrap and you want to add active class to show the current path you're in it, you shouldn't add it to <a> but
instead you must add that directive with it's value to <li> .But this depends on the css or css library you're using.
Now if you use this directive on this snippet in below, the home <li> always has the active class and it doesn't matter we currently
are in which path. But if you are in .../users , the servers <li> hasn't active class and vice versa, but home <li> always has
active class. WHY?
Learn: Well, routerLinkActive directive does one thing. It analyzes your currently loaded path and then checks which links
 LEAD to a route which uses this current path.
 So if we are on .../users , well we have .../ in this path. So the empty path segment is part of all paths. But we don't want
 to home page being mark, even when we're in ../users path. For fix that we can add some configuration to routerLinkActive directive.
 The solution is, on the same element which routerLinkActive directive was placed on, we can add routerLinkActiveOptions and this
 needs a property binding, because we don't just pass a string to this, instead we pass a JS object inside "" for the value of
 routerLinkActiveOptions and that wouldn't work without enclosing routerLinkActiveOptions with [] .
 So if you want to pass an object to a directive, you must bind that directive by enclosing it in []. Like what we did here.
 So with by enclosing directive in [], we can pass anything that resolves dynamically to that directive.
 Now in the object that you are passing to routerLinkActiveOptions create a property named exact and set it to true.
 So that prop, basically tells angular only add that routerLinkActive class which is on a same element with this
 routerLinkActiveOptions, if the EXACT or the FULL path is whatever that routerLink leads to that path. So the paths which
 are PART of the path we are going to, won't get that routerLinkActive class.
 But if you're on .../ , .../users or anything else are not kind of inside the .../ path.
-->
<!-- Navigating programmatically:
What now if we want to load a route programmatically?
In other words, we don't have a link which user can click but instead we have finished some operations or user clicked some button
and then we want to trigger the navigation from our typescript code(programmatically).
For example you have a <button> element which has a click event on it which would executed a method from the .ts file of that
component.Also IN THE END we want to navigate to another component or service. So of course we could use routerLink on that button and
don't create that method, if we want to JUST go to that file. But because we want to do some complex stuff and ... , FIRST we want
to execute some code and THEN go or navigate to that file. So in this case we can't use routerLink directive. Because it would
gets us to that file without we could execute our codes before going to that file and this is not what we want.
But still you can use routerLink in this case but you must also add (click) = "method()" event to the element which you added
routerLink to it. So with that first that method would called and then routerLink would direct us to that route. So this was another
approach. But for the first approach which in that, we don't use routerLink on that element, we can simply bind a method to
click event.
So first in that .ts file which that method exists we must inject or import the angular router. Because we want to navigate to
other places so we somehow need the angular router. Because we need to tell it, "hey please navigate us somewhere else!"
So we can import this router in .ts file.
For doing that, first we need to bind it to a private property and you can choose any name you want for that binded prop.
Also we can use the shortcut for creating and initiallizing the binded property. Now we can call the navigate() method on
that binded prop which is binded to angular router.
navigate() method takes an argument which allows us to navigate us to a new route and in () of navigate() , we must define an
array of single elements of that new path which we would navigated to that path. In this array, the first element of the array
is simply the first segment of your path. So if you want to go to '.../servers' , we must add '/servers' as the first element
of that array and this is an absolute path. Also you could define some relative path in there too.
But with that approach you must also control to what, this relative path should be relative?
So that .ts file should be:
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({...})
export class HomeComponent {
    constructor(private router: Router) {}
    ngOnInit() {}
    onLoadServers () {
       //Some complex calculations...
       this.router.navigate(['/servers']);
    }
}
and the html file:
<button (click) = "onLoadServers()">...</button>
So this was how we programmatically routing to a different page and still it doesn't reload our page and it is the same behavior
as we used routerLink() on that element which was clicked. But instead with .navigate() we can navigate to other path
through our code.
 -->
<!-- Using relative paths in programmatic navigation:
 Learn: When you send a request, the reload icon or the spinner in the browser starts to working. But in angular we can reload
  the current page without sending the request to server.
 In the last example if you had this.router.navigate(['servers']); (relative path instead of absolute path), you wouldn't get
 an error. But if you were used routerLink="['servers']" , you would get an error. Because in that case if you click on the
 <button> , it would go to .../servers/servers .
 So why does it work fine if we use .navigate() method even with relative paths?
 Because unlink the routerLink , the navigate() method doesn't know on which route you're currently on. In other words,
 the routerLink always knows on which component it sits and therefore it knows what is the currently loaded route.
 To tell navigate() method on which route we are currently in, we pass it the second arg and it would be a JS object and in that
 object we can configure the navigate() method. One configuration is to set the relativeTo prop. This prop is where we define
 relative to which router, this link should be loaded and by default, the value of that prop is root domain, which is why we
 didn't get any error for that relative path which was used with navigate() method. For the value of this prop, we must pass it
 a route which is not a string and we can inject or import it in the () of constructor. So we can get the currently active route
 by including an arg in () of constructor which is type of ActivatedRoute and it's type is important. But the name of that arg
 is not crucial. But in this case we named it route arg which because of shortcut, it would create a property with the same name.
 ActivatedRoute simply injects the currently active route. So for the component which is currently loaded, the ActivatedRoute arg and
 it's property would be the current route that you're on it and that prop which would get the ActivatedRoute arg in this case the
 name of that route is route, that prop would be a complex JS object which keeps a lot of meta information about the currently
 active route.
 Now by setting relativeTo prop to the current route which we got from ActivatedRoute arg which it's name and it's name of prop in
 this case is route, angular knows what our currently active route is.
 Learn: So we are saying, we must navigate to other routes, relative to the current route we are on it.
<button (click) = "onReload()">...</button>
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({...})
export class HomeComponent {
    constructor(private router: Router, private route: ActivatedRoute) {}
    ngOnInit() {}
    onReload () {
       this.router.navigate(['servers'], {relativeTo: this.route});
    }
}
Now if we click on that <button> , it would throw an error, like when we're using routerLink. So wewould go to .../servers/servers
 -->
<!-- Passing parameters to the routes:
 We want to load the profile of a user dynamically. So we can add parameters in routes and this parameters are dynamic segments \
 in the routes. We add them by using a colon and any name you want for that parameter. Like :id .
 You later will be able to retreive that parameter which is in the url, INSIDE THE LOADED COMPONENT by the name of that parameter.
 The : in route, tells angular that this is a dynamic part of the path.
 The differences of these two are in the first one, just '.../users/id' would be the path and the id means the exact word of id
 would be the path. But in second one, it would be '.../<anything>' . So in defining the routes in the app.module.ts file , if
 we would have:
 const appRoutes = {
    {path: 'users/:id', component: UserComponent}
 };
 The routes which are <domain>/users/<anything> would lead to UserComponent and that something means anything we place in that
 segment would load the UserComponent and it shouldn't even be a number CURRENTLY.
 So this is how we can dynamically load some route or in other words how we can encode some data into a path.
 Now how we can get access to that dynamic data which is in the path, INSIDE THE LOADED COMPONENT(the component which that route
 would lead to that component).
 Fetching(getting) route parameters:
 So we know that with dynamic segments in the route, there would be some data in that dynamic route. For getting access to that
 dynamic segment in .ts file, we need to import ActivatedRoute type and therefore we need to create an arg inside the () of
 constructor() and then we can use shortcut and we know by injecting or importing the ActivatedRoute by using an arg in () of
 constructor, we get access to the currently loaded route and we know this currently loaded route(which in the beginning is in the
 arg in constructor but after that we must STORE IT IN A PROP OF THAT CLASS IN .ts file) is a JS object with a lot of metadata about
 that currently loaded route. One of those crucial things is currently passed dynamic segment.
 Learn: So by using ActivatedRoute object which is in the prop of class that we store the arg of ActivatedRoute in that prop,
  we have access to that dynamic segment in the url.
 We can set things up, so when the component which the route would load it, had initialized (so in ngOnInit() method),
 Learn: we get access to the dynamic segment by using:
  this.<the prop which stored the ActivatedRoute arg>.snapshot.params['<the name of that dynamic segment so like:
  :<the name of segment> >']
  So if we have .../:id in the url, we can get the value of that dynamic segment by using:
  this.route.snapshot.params['id']
  -->
<!-- Fetching route parameters(not query parameters!) reactively:
 If you use a routerLink, in the html template of component that would be loaded if we hit a route which has dynamic segments,
 and in that routerLink you go to route but still in the same structure of that route (for example in the template which
 .../10/parsa will load that component, in that template, go to .../8/soheil) , the content of that component won't updated!
 It's not a bug, it's a default behavior. What's going on?
 We load the data which is dynamic based on the dynamic segments of url, by using snapshot prop which is available on the
 ActivatedRoute prop in the class of that component. Now if we load a new route(like the prior example) what would happen?
 What happens when the route is changed is angular looks at app.module.ts file and hopefully finds the route which we were
 requested, then loads the component which that route would load up it, then initialize the component and gives us the dynamic
 data which was changed because the dynamic route was changed. IMPORTANT: NOW THIS BEHAVIOR WOULD HAPPEN IF WE HAVE'NT ON THIS
 COMPONENT BEFORE!
 So if we WERE on that component which would loaded if we hit that route, BEFORE, the old url would be changed, but the
 old data won't change, because we were on that component before!
 Recap: If we click a link which is on the template which would be loaded if that route was reached, and the target or routerLink
 of that link is AGAIN that dynamic component (dynamic component is a component that uses the data which is because of dynamic
 segments), the url would changed to the new url but we are ALREADY in the component which should get loaded because the url
 was changed. So angular cleverly doesn't really instantiate this component, because if it instantiate this component, this work
 would only cost us performance. Why angular would want to re-render a component which we're already on it? Now you might say:
 "Because the data which is based on the dynamic segments, has changed!!! So angular must re-render that component!"
 But angular doesn't know and this good that by default it doesn't recreate the whole component and destroy the old component, if
 we ALREADY are on that component.
 But we want the updated data on the same component, right?
 It's fine to use snapshot property for FIRST initialization. But to be able to react to subsequent changes, we need a different
 approach.
 So in ngOnInit() after the first initialization, we can use params prop on the route itself and not on snapshot prop.
 What's the difference? In the second approach, params prop is an observable. So we have an async task. Because the parameters
 of your currently loaded route might change at some point in the future, if user clicks that link(which would redirect to this
 component but with different dynamic segments). But you don't know when the user would click on the button and also you don't
 if he even would do that and also you don't know how long it would take to redirect to the same component but with different
 url. So therefore, you can't block your code and after blocking, wait for that to happen. Because it might never happen.
 Learn: So an observable is an easy way to subscribe to an event which that event MIGHT HAPPEN IN THE FUTURE, to then execute
  some code when that event happen without having to wait for that event to happen from now until it happens. So this is
  what params is. params property is such an observable and therefore we can observe this prop by subscribing to that observable.
  Basically observables are feature added by some other 3-party packages and not by angular but this feature is heavily
  used by angular which observables allow you to easily work with async tasks.
  Learn: .subscribe() can take 3 functions as args. The first arg or function(in this case), would be fired whenever new data
   is sent through that observable or in this case(when using params observable, when a new url is requested, so the data that
   is sent through this url is changed. The data in this case is url), when parameters in the url changes. So after a parameter
   is changed, the first arg is executed and in the function of first arg, in this case, we can get the updated params as an
   arg and this arg would be an object. Because params will always an object, just like when using .snapshot or using it in here
   and this object, holds the parameters that are in url.
   Now in the body of first function, we can update the data that we expect to updated when that event occurs.
   So in this case we can update the id of user.
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
@Component({...})
export class UserComponent implements OnInit{
    user: {id: number};
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
      /*First initialization(which won't get updated when we WERE on this component before and again load this component again but
      with a different parameters in url.)
      So for first initialization of this component, we can use snapshot property but for later reloads of this page, we are
      using params property directly on route instead of using on snapshot and then route prop.*/
      this.user = {
         id: this.route.snapshot.params['id'],
         name: this.route.snapshot.params['name'],
      };
      /*This snippet will update the user object(which is from the dynamic segments of url), WHENEVER(we don't know when so we must
      use a callback function) the url changes. That's why it's inside of this callback function it is passed to the subscribe()
      method. Important: The callback function inside subscribe() method, won't executed when ngOnInit is executing. So
      when ngOnInit() is executing, ONLY the subscribtion to that event is set up and the code inside subscribe method won't
      executed, but only if the parameters of url changes (not in the first time we go to this route and not from other routes
      we went to this route- only if we WERE on this component and again we reload the page or requested this route with another
      parameters.) we will call the callback function inside subscribe() method. */
      this.route.params.subscribe((params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
      });
    }
}
Now if you're sure that the component you're on it CURRENTLY, may never be reloaded from WITHIN that component, then you might not
need this extra code. You might need to just use snapshot. So if you know that this component in 100% of times be RECREATED and
doesn't need to update it's data based on changes in parameters of url, you don't need to subscribe to route.
But you can use that subscribe() to get informed about any changes in the route parameters.
So we learned how we can subscribe to the current parameters of url to update them or to react to any changes to them and
then update our page, IF WE ARE ALREADY ON THAT PAGE.
Also remember that angular will clear this subscription you set there, whenever that component is destroyed. Because if it wouldn't
do this, what are you doing here? You're subscribing to url parameter changes and let's say you leave this component and later
you come back. Well once you left this component(for example you go to completely different url-completely means you didn't
just change the parameters, but you go to completely different url, but if you just change the parameters, the component won't
be destroyed and you're still in the same component), this component will be destroyed and when you come back a new one
is created. But this subscription will always live in the memory. Because it's not closely tied to your component. So if the
component was destroyed, the subscription won't. Angular handles this destroying of subscription for you. But maybe you want
to implement onDestroy() lifecycle hook. Then you can implement ngOnDestroy() and then you can store the subscription on a
prop and you must import Subscription type from 'rxjs/Subscription'.
Now after creating a property which is type Subscription, this prop must now bind to the subscription we have in our code
(assign the code we had to this newly created prop) and now in the ngOnDestroy() (which would be executed when the component
gets destroyed), we access to this newly created prop and use unsubscribe() on it. AGAIN: You don't have to do this and you can
leave the code, like the last code we had, because angular will do this thing we're doing here for us regarding these
route observables. Learn: But if you add your own observables, you have to unsubscribe it on your own.
EX)
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
@Component({...})
export class UserComponent implements OnInit, OnDestroy {
    user: {id: number};
    paramsSubscription: Subscription;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
      this.user = {
         id: this.route.snapshot.params['id'],
         name: this.route.snapshot.params['name'],
      };
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            this.user.id = params['id'];
            this.user.name = params['name'];
        });
      }
      ngOnDestroy () {
        this.paramsSubscription.unsubscribe();
      }
}
rxjs package is not shipping with angular but angular is using this package.
-->
<!-- Passing QUERY parameters(and not parameters but QUERY parameters) and fragments:
Query parameters are separated by question mark. For example: <domain>/parameters?queryParameters So like:
 localhost:4200/4/parsa?mode=editing&access=private
 The question is how we can pass these query parameters by using angular links
 (Important: If you want to use <a> for routing and navigating, you must delete href attr and use attrLink)?
 and how you can then retrieve those query params?
 You might also have a # fragment. So like ...#<something> , it's use to jump to a specific place in your app.
 So how we can pass and retreive them with those 2 approaches. 1) Using routerLink directive 2) navigate() method in .ts file
 So for example let's create a new route in app.module.ts file, like: {path: 'servers/:id/edit', component: EditServerComponent}
 Now to be able to load or navigate to this new route from another component like servers component, which has a route of
 .../servers , we can for example create an anchor element, like: and let's use [] syntax so we can pass an array of segments to
 routerLink directive.
 Important: Right now you're on .../servers but you want to go to .../servers/... . But you can't omit servers segment here.
  Therefore you can't say, I'm on .../servers so we can just go to REMAINING parts of the route we want to go. NOOOOO!
  It's better to use absolute paths. So in absolute paths it doesn't matter where you are currently. You must always start
  from root. Therefore in here we also specified 'servers' segment again, although we're currently in .../servers
 <a
  [routerLink] = "['servers', 5, 'edit']"
  [queryParams] = "{allowEdit: 1}"
  fragment = "'loading'"></a>
 Now let's add query parameters too. We don't do that by adding '?=' as another element of this array!
 Instead, when we're using a link in the template, we add a new prop of this routerLink directive and that prop is queryParams
 and we can bind to this prop. But remember that queryParams is not a new directive, it's just another bindable property of the
 routerLink directive and to this prop, we have to pass a JS object and in this object we use key value pairs of query parameters
 that we want to edit.
 Now if you click that <a> element, you see we have ...?allowEdit=1#loading now.
 We also have [fragment] property. You can pass in a string('') to "", therefore you can omit the [] for fragment.
 Let's now see how we can set these things up programmatically. So instead of setting them in template file, we can pass
 them in .ts file.
 Programmatical approach is how we use .ts code for routing and navigating.
 So we can have something like: <button (click) = "onLoadServer(1)">Load server 1</button>
 for the template which when we clicked on it, a method would be called and then in
 that method we would set those query params and fragments programmatically.
 .ts file for that little html template:
 For adding those query parameters and fragments we use an object in navigate() method and in that object we use queryParams
 property.
 onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1', fragment: 'loading'}});
  }
15. Retrieving Query Parameters and Fragments
We find out how to pass query parameters and fragments, now we want to retreive them.
Again like retreiving  parameters, we need to create an arg with any name you want but with ActivatedRoute type in the constructor
of the component which would be loaded if we go to that route which that route has those query params and fragments that we want
to retreive in the .ts file of that component.
Also make sure that you place the import expressions for core angular modules and packages, BEFORE the import expressions of your
created files.
There are 2 ways of retreiving them, just like parameters.
In the first approach we can simply access the snapshot prop of the route that we're currently in that route and then access
queryParams prop or fragment prop of snapshot prop.
Important: The first approach might bring the same problem that we had with params too and that problem is that this code would
 only run or updated at the time which this component is created. So if there's a chance of changing your query params or
 fragments from the page that you're currently on and after that change in query params or fragments, again you must go
 to that page with changes in query params or fragments, you shouldn't use this approach. Because this approach isn't reactive.
 It won't display or allow you to react to any changes which happen after this component has been loaded. But also note that
 if you go to another component and come back to this component, it WILL update the data which is based on query params and
 fragments.
The second is to use subscribe() method on queryParams which like params is an observable directly on route (route is the name of
arg and prop (because we used shortcuts so the name of arg and prop which stores that arg of constructor is equal)) and also
we have fragment as an observable, so we can subscribe to it. So with using this approach we can react to changes to query parameters.
Also you don't need to unsubscribe() them here, because angular will do it for you.
Remember that in second approach we STILL use the snapshot property at the beginning to retreive the params or query params or
fragments for the first time. But if you reload the current route with different params or ... the data which is based on params
and ... won't updated. So we must add some code to it and that is we must use params or queryParams or fragment on route and
subscribe() to them(use subscribe() method on them).
So:
ngOnInit() {
  this.route.queryParams.subscribe();
  this.route.fragment.subscribe();
}
Remember: If we parse a parameter from our URL, it will always be a string. Because our whole URL is simply just a text.
So if you are retreiving a number like text from url, like id, make sure to convert it to a number if you expect to ge a number
from the url. You can make a text that is like a number(like '123') by adding a + in front of it.
So like:
const id = +this.route.snapshot.params['id'];
  -->
<!-- 17. Setting up Child (Nested) Routes:
You can see that in app.module.ts you have some duplications in routes. Because we have some routes that all of them start with
'servers' or some other routes which start with 'users'. So it would be nice to nest them and have some child routes which all of
them start with 'servers'.
To do that, we add another property named children to the one of the objects of routes which has has the beginning COMMON segment
of the routes that we want to nest them. For example in this snippet, we added children prop to the fourth route, because it's like
a parent route for the next routes in this array. So it can have the children prop, therefore it would be a parent route of the
next ones. Right? Now children prop takes another array of routes just like appRoutes. So we can now take those nested routes and
add them inside that children array. After that, that common segment of route must be remover from the path prop of those
nested routes, which are nested inside the children prop of their parent route object.
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/:name', component: UserComponent},
  {path: 'servers', component: ServersComponent},
  {path: 'servers/:id', component: ServerComponent},
  {path: 'servers/:id/edit', component: EditServerComponent}
];
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: 'users/:id/:name', component: UserComponent},
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}
  ]},
];
Now the question is where the ServerComponent would be loaded? Because in your app you would get an error which says:
Cannot find an outlet to load 'ServerComponent' in that outlet and this is because the only router outlet, the only hook in
our code where it should load components is in our app component. So we have <router-outlet></router-outlet> in the app.component.html
file. But that <router-outlet> is reserved for all of the components of routes which those routes are on the TOP LEVEL, not the
routes which are nested inside top level routes. So the child routes need a separate outlet element in app.component.html file.
Because those child components can't override the ServersComponent (parent component) and instead of overriding their parent component,
those childes must be loaded nested into their parent component. So we go to their parent template file and then in that file,
where you are instantiating the child components inside this file (like where you have <app-edit-server></app-edit-server>),
we must delete those instances of child components inside the template of parent component and instead add <router-outlet>
where you had instance of those child components. This <router-outlet> adds a new hook which will be used on all child routes of the
route which is being loaded on the ServersComponent (parent component). So all of the children of the parent route, would be loaded
in this <router-outlet> we placed in parent now.
So in <router-outlet> of parent component, all of the child routes of that parent route component, will be loaded.
So for example, in the html template of '.../users' route, instead of instantiating the <app-user> component, instead we must
use <router-outlet> in the place we want to use the user component in the template of users component.
-->
<!-- Router type and it's arg is crucial for using navigate() method in .ts file for navigating programmatically to other
 parts of app. For example when we click on a button or an anchor element , a method in .ts file of that component would be
 called which uses navigate() method to redirect to other parts of app.
 Also you learnt if you want to use a relative path in navigate() method, you need to setup the relativeTo property on the second arg
 of navigate() method which that second arg is an object and for the value of that prop, use the reference to the currently loaded
 route. So like: this.<name of prop of type ActivatedRoute> . With that, angular router knows to which route you want to navigate
 relatively. So when you are in '.../servers' route and in that route, if you click on a button or link which has a code inside
 of it's component like the below code, it would append '/edit' to the end of the current route. Therefore you would go to
 '.../servers/route'.-->
<!--19. Configuring the Handling of Query Parameters
How we can preserve our query params, when we navigate again from a component or kinda page which ahs some query params and
1fragments in it's url nut after going somewhere else, the query params and fragments would ne gone and then we have a new
url.So we must do sth, because our query parameters and fragments would be gone if we navigate away from a component which in
there we would have some query params and fragments. So we want to preserve those query parameters and fragments even after
we navigate away from that component. In the component which would give us those query parameters or fragments and it has a
navigate() method so if we click on the button or <a> which has the navigate() method we would go to other parts of app, to that
navigate() method in the second arg of it which is an object, we can add a property to configure the navigation and that prop called
queryParamsHandling . queryParamsHandling prop takes a string as the value and that string could be 'merge', to merge our
old query params with any new query param that we might add there. But in this case we just want to preserve the query params after
navigating to that route, so we choose 'preserve' and 'preserve' will overwrite the default behavior which will overwrite the
default behavior which that default behavior is to simply drop the current query params after navigating to that route.
Now if we use 'preserve' here, if we add new query parameters here, the old query parameters (after navigating to that route by
using .navigate() method) would actually overwrite the new query params(those which would be created in the route that we navigated
to it by using navigate() method).
So if we use 'preserve', the current query params would be added even we navigate to the route which was specified in the navigate()
method, therefore the new query params which would be created after we navigated to that route which is specified in the
navigate() method of previous url, would be overwritten by the old query params. So if you want to add new query params in the
url which we will go to that url by navigate() method and also you don't want the old query params overwrite the new ones,
use 'merge'.
So with this prop, we don't lose the query params or information that we had before after navigating to a new route.
-->
<!-- 20. Redirecting and Wildcard Routes:
 Currently if we write something in the url after domain, which is a route that we don't cover it, we get an error.  In other words
 we want some 404 error handling. So maybe we want to redirect the user which want to go to a page that doesn't exist, to a
 specific page.
 So whenever the user wants to visit a page we don't have, we want to redirect the user to a specific page.
 Let's start with redirecting. So let's add a page-not-found component and then add it to declarations array which is in
 app.module.ts file.
 For redirecting the user when requests to visits a page and you don't want to show that page(maybe it's not a page you covered
 or ...), don't add the component prop to that route you don't want users to be able to see it and instead add redirectTo
 prop when you're definign the routes in app.module.ts file.
 So if you don't want to specify a component to load for a route(maybe that page is not a page you covered or that route the
 user entered its' route is bullshit!) and you want to redirect the user when he enters that not covered url, instead of
 using component prop you can use redirectTo prop.
 So the component of route which that route is the place that we redirected user to that route, is an alternative component.
 Also for catching all the routes which those routes aren't covered by your app is to use double ** for path prop. So in that
 object which '**' is the path, we can redirect user to a not found component or page.
 The order is super important in this case. Because you must make sure that very generic routes are the last ones in your
 array of routes. Because your routes get parsed from top to bottom. So if for example an extremely route was at the beginning
 like {path: '**', redirectTo: '/not-found'} , you would always get redirected in this case. Because everything you enter in the
 url would catched by this route and this route would redirect you to 'not-found' route and it's component would shown to you.
 Learn: So the more generic the route, the more bottom in the routes array.
 Learn: It's also a must to use pathMatch: 'full' prop in object of a route which has a redirectTo prop. The details are
  in course note.
 EX)
 const appRoutes: Routes = [
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'},
 ];
-->
<!-- 22. Outsourcing the Route Configuration:
 Typically if you have more than 2 or 3 routes in your app, you don't add them directly in app.module.ts file. Instead,
 you create a new file which is application-wide, so it must be created in app folder and it's name is app-routing.module.ts .
 So now we have 2 modules.
 Basically you can build your angular app from multiple modules.
 So now cut the appRoutes const which is an array of all of our rotes and paste them in this new file. Also you must import
 the .ts files of the components which are used in that array of routes.
 Remember that you don't need the declarations array in @NgModules of this class in this file, because those components are
 already declared in app.module.ts file. But also remember to add AppRoutingModule to the app.module.ts module.
 Also it's good to remove routerModule().forRoot(appRoutes) from imports array and it's import expression from top that file which
 is in app.module.ts file because we don't need it anymore in app.module but in app-routing.module.ts file.
 Now you must import routerModule in app-routing.module.ts file. Now we must configure @NgModule() .
 To do that, again (which we had this imports array in app.module.ts file too)  add imports array in that object we passed
 to @NgModule decorator and in imports array, we add routerModule.forRoot() and pass the variable name of routes array to
 forRoot() method. But this isn't enough. Because we use app-routing.module.ts file for outsourcing our routes.
 So we need to add our app-routing.module.ts file back to app.module.ts file and for doing this, we need to add the exports array
 as a property in object we passed to @NgModule() in app-routing.module.ts file.
 exports array simply tells angular: "Hey, from this module, If i were to add this module(the module that exports array is currently
 in it) to imports of another module, what should be accessible to the module that imports this module which I'm currently in it. "
 And the one thing that we want to make it accessible from the module that imports this module is our routerModule. But in here
 you don't call forRoot() on routerModule, because we call it earlier. So in the first step, we configured routerModule and
 configured means you added your routes to it's () of forRoot() , now in the exports array, we just export this configured
 routerModule. Therefore in app.module.ts, we can now import our own module which in this case is app-routing.module.ts and it's
 class.
 So in imports array of app.module.ts , add appRoutingModule and also it's address in top of app.module.ts file. With this, we have
 a leaner app.module.ts file and also our routing functionality is outsourced in a separate module is app-routing.module.ts file.
 const appRoutes = [
    ...
 ];
 @NgModule({
  ...
 })
 export class AppRoutingModule {
 }
 -->
<!-- Guards:
 Guards are functionality, logic or code which is executed before a route is loaded or once you want to LEAVE a route.
  For example: Let's say you want to give access to user for using your server component or the edit-server component if
  a user is logged in. Manually checking if a user is logged in, in OnInit() is not good because you must add that logic to all
  of those components. So we must use a feature in angular that runs some code before that component we want to check sth before
  it's is loaded.
  24. Protecting Routes with canActivate:
  So let's create auth-guard.service.ts file.We called it auth-guard because the feature of @angular/router is called guards.
  Also I called the class of this file AuthGuard and not AuthGuardService because we will use this service only as a guard,
  we can leave it as AuthGuard without Service added to end of it and we must implement CanActivate interface and this interface
  forces you to have a canActivate() method in your class and this method will receive 2 args with types of route arg(I named it
  route) which is type of ActivatedRouteSnapshot and state of the router which I named it router and it's type is
  RouterStateSnapshot .
  Where are we getting these args from?
  We'll soon define that angular should execute the code in canActivate method before the route is loaded. So it will give us the
  data.
  Important:canActivate() also returns something. It either returns an observable which is type of Observable and the
   returned observable would wrap a boolean value.So it return type would be Observable<boolean> . This means IN THE END,
   this observable resolves to true or false. Or this method returns a promise of type Promise which in the end would be RESOLVED(we
   don't specify the reject value) to a boolean value. Or this method returns just a boolean.
   So canActivate() can be executed both asyncrounosly which therefore would return an observable or a promise or synchronously
   which returns a boolean. Why it can be executed async and sync?
   Because you MIGHT have some guards which execute some code and that code runs completely on the client therefore it runs
   synchronously. Or you might have some code which takes a couple of seconds to finish, because maybe you use a timeout in there
   or you reach out to a server.  Therefore that code runs asyncrounosly and both is possible with canActivate() .
   Now let's assume that we have a fake service which is called auth.service.ts which might reach out to service and allows us to
   login or logout and also can check our current authentication state and in that service we're tracking the state with loggedIn
   prop.
   We need to use @Injectable for auth-guard.service.ts to be able to use another service in auth-guard.service.ts service or in other
   words to be able to inject another service to this service which we are using @Injectable() on it and then we can inject that
   external service by creating an arg in () of constructor of the service which has @Injectable() and also it's better to store
   that arg to a prop, so we can use that prop in whole class and not in just that method (which in this case is constructor) which
   gets that arg.So by storing it on a prop of class, we can use that arg, in it's class and objects.
   auth-guard.service.ts:
   import {
      canActivate,
      ActivatedRouteSnapshot,
      RouterStateSnapshot
   } from '@angular/router';
   import{Observable} from 'rxjs/Observable';
   @Injectable()
   export class AuthGuard implements CanActivate {
      constructor(private authService: AuthService, private router: Router) {}
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
      {
          // Let's check if user is logged in or not?
          /* Learn: Also I use return here, because if you return sth inside of a promise, that sth we returned would gives us
              back another promise. (Even if that sth which you're returning inside of a promise, is just true or just a number! It
              would return a promise which resolves with that true or that number). In this code that promise which we're returning
              sth from it, is this.authService.isAuthenticated() which returns a promise.*/
         return this.authService.isAuthenticated()
                          .then((authenticated: boolean) => {
                             if (authenticated) {
                                return true;
                             } else {
                                /* In this case we don't want to allow user to access to the route that he wanted to go, in the
                                 beginning. So we can navigate away to force the user to go somewhere else. So let's first include
                                 angular Router. Because we need it, here. So first let's create an arg for getting that router
                                 with it's type. So let's specify for going back to root page.
                                 So with this navigating, we don't let user to go to that original route.*/
                                 this.router.navigate('/');
                                 /* After navigating away, you may also want to write return false; so with this you will prevent
                                  the original navigation from happening ANYWAYS!*/
                                  return false;
                             }
                          });
      }
   }
   auth.service.ts:
   export class AuthService {
      loggedIn = false;
      //This method checks the state of we're authenticated or not (state)? and in this method maybe we reach out to a server.
      isAuthenticated () {
      //Learn: Promise() class always takes take a function as the arg with resolve and reject arg methods that we can execute.
        const promise = new Promise((resolve, reject) => {
        //Let's simulate reaching to a server:
        /*Learn: In setTimeOut() we first wait the time that we specified in second arg and then execute the function which is the
           first arg of this method */
          setTimeOut(() => {
            resolve(this.loggedIn);
          }, 800);
        });
        return promise;
      }
      login () {
         loggedIn = true;
         ...
      }
      logout () {
      ...
         loggedIn = false;
      }
      ...
   }
Now we must go to app-routing.module.ts file and now we want to define which routes should be protected by this guard and we can
do it by going to the object of that route in appRoutes array and add canActivate property to that object. (If a route has nested
child routes those child routes would be also protected by that route).
Now canActivate takes an array of all of the guards that you want to apply to this route and it will automatically get applied
to all of the child routes.
So now '/servers' and it's children will accessible if the canActivate method in auth-guard service returns true in the end which
will only happen if in the auth service loggedIn is true. But right now it would always false. Because we don't change it.
    -->
<!-- 25. Protecting Child (Nested) Routes with canActivateChild:
 The prior service is applying for WHOLE '/servers' path. Now we can grab it from path defenition and instead give it to each of
 it's children so with this, only it;s childes are protected and not '/servers' itself.
 const appRoutes: Routes = [
    {path: 'servers', component: ServersComponent, children: [
        {path: ':id', canActivate: [AuthGuard], component: ServerComponent},
        {path: ':id/edit', canActivate: [AuthGuard], component: EditServerComponent},
    ]},
 ];
 BUT this is not the easiest way. Because we're adding that canActivate: [AuthGuard], to every child.
 So there is another guard we can use. It's another interface called canActivateChild. So first we must implement this interface
 in the AuthGuard service. This interface wants you to provide a canActivateChild() method in the class that you implement this
 interface and the args and the return type of it's method is exact as canActivate() method.
 Now inside this method you can call canActivate() method and pass it those 2 args that you get from canActivateChild() .
 So now since we added CanActivateChild interface, we can now use a different hook in the routes definition. So instead of
 only using canActivate prop on parent route and then the children get that guard, instead , we can use canActivateChild on the
 parent route which also takes an array of services which act as guards and those services are definitely implementing the
 right interfaces. So now we ONLY use canActivateChild prop on parent route and not anything else on parent or children,
 so now if we go to parent route, we can and it won't redirect us(because it hasn't redirectTo prop) and also it's children
 don't have anything else. So if we go to children routes of this route, they will redirect us.
 -->
<!-- 27. Controlling Navigation with canDeactivate:
 Let's control users to whether they are allowed to leave a router or not? For example when user did some changes on a page
 and he wants to go to another page or route or go back, we can ask user if he really wants to leave this route or not? So keeping
 users from accidently navigating away.
 So in the component you want to to this, let's create a prop named changesSaved and set it to false initially. So when the
 user clicks on update button, onUpdateServer() must run and must save the changes to server. Now changes were saved on server,
 we set changesSaved prop to true and after the changes were saved in onUpdateServer() method, we want to navigate away.
 So let's add Router in () of constructor and store it in a prop.
 Now we somehow need to execute the code which asks the user if he really wants to navigate away without saving the changes on
 server, in that edit-server.component.ts file. Because we need access to changesSaved() method, which informs us that update button
 was clicked or not? Learn: However a guard always need to be a service.
 Because we need to provide it just like we provided the AuthGuard service. So somehow this doesn't fit. Because we need to
 access the code in our component and also must have a service and that sounds like a complicated setup. But it's simple.
 Let's create a file named can-deactivate-guard.service.ts inside edit-server folder.
 Learn: An interface simply is a contract which can be imported by some other classes which FORCES those classes that imported
  this interface, to provide some logic.
 CanComponentDeactivate interface requires one thing from the component that implement this interface and that one thing is
 canDeactivate() method.
 An interface won't contain the actual logic and it would only contain information about how that method in the components(classes)
 which implement this interface, should looks like.
 So in this interface we are saying that the classes which implements this interface MUST have a method called canDeactivate which
 shouldn't receive any arg (() means no args) and this method in the end should return an observable which therefore we need to
 import it at top of the file and that observable would resolve to a boolean and ... .
 canDeactivate is an interface provided by angular and it's a generic type and it will wrap our own interface
 So: <our interface>
 So it will wrap an interface which forces some components or some classes which use(implement) this interface, to implement
 canDeactivate() method. So this is the setup which makes sure that in future we can easily connect a component to our
 canDeactivateGuard.
 Now this canDeactivateGuard needs to has a canDeactivate() method and this method will be called by angular router once the user
 tries to leave the route that he is currently in it.Therefore, the canDeactivate() method will receive the component on which the
 user is currently on that component as an arg which must be of type canComponentDeactivate which means it needs to be a component
 which has implemented our interface. Therefore that component has canDeactivate() method on it.
 nextState arg is where do you want to go? Because remember, this will be called at the end, when we want to leave a route.
 nextState is an optional arg so it gets ? before :<type> . Then we call canDeactivate() method on the component which we're
 currently on it. This is why we need to implement canComponentDeactivated on that component. This is why we created that
 interface. Because now, the angular router can execute canDeactivate() method in our service and can rely on the fact that
 the component we're currently on has the canDeactivate() method too. Because this is what we will actually implement the logic
 which is checking whether we're allowed to leave the current component we're on it or not. Because we need this connection
 between our guard and the component. So this is why we can call canDeactivate() method there. Now we can go to app-routing.module.ts
 and on path: ':id/edit' we want add this new guard, so: canDeactivate: [CanDeactivateGuard]
 Now angular will call this guard, whenever we want to leave that path. Also you need to go to app.module.ts and add our guard
 to providers array. Also you must implement the CanDeactivateGuard class in the component which is on ':id/edit' path.
 So we must go to EditServerComponent and implement CanDeactivateGuard. Why we did this? Because I told CanDeactivateGuard
 will in the end call canDeactivate() method on our component. Now we know that in CanDeactivateGuard we are implementing the
 canDeactivate() method of CanComponentDeactivate interface.
 So because in CanDeactivateGuard class we are using canDeactivate() method, so we need to implement that method in other classes
 which are in the path which that guard is also used for that path. Because that guard class (CanDeactivateGuard) will need
 the component of that route to use canDeactivate() method on that component.
 Therefore in the edit-server-component file we need to add canDeactivate() method and we know what this method will return,
 because we defined the return type in the interface. Now we must write the actual logic of this method and in second if statement
 we check if the value of serverStatus or other values or as same as before or not(actually checking they have been changed or not?)
 export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
 }
 export class CanDeactivateGuard implements canDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
                  {
                      return component.canDeactivate();
                  };
 }
 -->
<!-- 28. Passing Static Data to a Route:
 How to get some data either static data or dynamic data, once a route is loaded. Now you might say: "We learned how to get
 data and how to get parameters or query params and ... out of the url! and use them". NO! This is not like them!
 I mean that some of your routes depend on data they receive, either get data statically, which means each time the routes
 loaded, they will receive those data, or dynamically.
 For example we create an error component page, which we use it for all kinds of errors and in the template of this component,
 maybe we have some string interpolation which shows the error message, therefore we must create a prop for that string
 interpolation (with exact names). But where we get this message? Now, we could reach this page and it's component through
 different hooks.
 But we also know that there's a specific error for each error page. So we can go to app.module.ts file and then go to
 the object for 'not-found' route and add data property(which we can pass static data) then add the key-value pairs you want
 to use in that component of route.r
 Now you might say: "Why we didn't define that message in the .ts file of component itself? Instead of defining them in app.module.ts
 file? Because we might reuse this error page.So maybe we would have another route which that route also would reach this component
 (nested routes or ...) where in that route we want to display error or we have a different logic in our app, which might render
 that page.
 So again it might be reusable, but for each error, there's a specific data for a specific message.
 Now we want to retreive that error, whenever we load our error component and for this task, like params and ... , we need
 ActivatedRoute type and it's arg in constructor and store it in a prop of .ts file of that component and then in ngOnInit()
 we must ge that message prop which is available when we enter this route, by using route.snapshot.data['message']
 and if that message prop would possibly change, while you're still on that page and component, we must use: this.route.data.subscribe()
 So because we passed the data prop which is an object and in this case has message prop, we can access that message rop which
 is available on that route, by using this.route.snapshot.data['message']
29. Resolving Dynamic Data with the resolve Guard:
Now let's say we have some dynamic data which we want to fetch them before a route can be displayed or can be rendered. So we need
a resolver and this resolver is also a service which will allow us to run some code BEFORE a route is rendered. The difference
between CanActivate and this resolver is that resolver won't decide whether this route should be rendered or not or in other words
it won't decide whether the component in that route should be rendered or not?
So the resolver will always render the component in the end, but it will do some pre-loading or in other words it would fetch some
data that the component will need in the future. The alternative of this approach, is to render the component of that route instantly
(instead of pre-loading and fetching some stuff before show that component) and in ngOnInit() method of that component (page of that
route) we can fetch the data and display some spinner whilst you're fetching that data. But if you want to load it before actually
displaying the route:
You must create a file in server folder because that file is a resolver for servers.
Remember: Resolve is a generic type and it should wrap whichever item or data field you will get or in this case, fetch there.
So in <> of Resolve, we must specify the type of thing that when resolve() method finishes, it would be return that thing for us.
So in this case, when resolve method finishes it's work after some time, it would bring us a server which would be an object with some
props that we specified the type of those props.So <> for Resolve is type definition of the thing which resolve WILL give us in the
end(the type of thing it would resolved in the end).
Now the resolve interface which we implemented it, wants from us to implement resolve() method in our class which implements
Resolve interface and resolve() method takes 2 args. First one is the route with type of ActivatedRouteSnapshot and the secodn one
is state. So these 2 information pieces were the things that resolve() method gets from angular.
Learn: We defined an interface named Server. So we can replace the type definitions of a server object with Server interface.
 So instead of saying: <{id: number, name: string, status: string} we can say <Server>> . So that Server interface is a shortcut
 of that long type definition. So after implementing that interface in the class which it's method would return that long exact
 type of interface, we can replace the name of that interface with those long type definitions.
 In return statement of resolve in server-resolver.service.ts file, we are getting the route in that method. The route is only a
 snapshot, so the route which is a snapshot won't be updated if we were on that route and reload it with other params. But in this
 case it doesn't matter. Because the service which uses snapshot for getting the params, would be executed each time we rerender
 the route.So snapshot prop is all we need. So again, unlike the component itself, the service is executed each time, so for
 service to getting the params and ..., we don't need to use the subscribe() and ...
 Now add this new service in providers array in app.module.ts file. Now where we want to use it? Right, in app-routing file.
 For the path that you want to use this service, you can add the resolve property and resolve prop takes a JS object and in that
 object we define key-value pairs and the name of the key is up to you.
 This prop is different to properties which we add guard files to them like canActive or canDeactive. In those props, we use
 arrays for their values.Why we have this difference? You'll see.
 Now by adding that resolver service to resolve prop in that path, the route will map the data which resolver service gave to that
 route. Why resolver service gave us that data? We didn't even call that method? Because that method will be called by angular when
 the route which this service is used in it, is loaded.
 Learn: So when that route is loaded, angular will call the resolver service's resolve() method automatically.
  So the data that resolver-service gave us back, would be stored in the key. (Remember that we had key-value pairs in resolve
  property. So the data that value would return, will be stored in key). So in this case, the data that ServerResolver would be
  give us back, will be stored in server and we have this key, available in the component which would be loaded for that route.
  Also a resolver can handle both async and sync codes.
   Currently we are getting the server by using serverService. So we can comment it our. Because now we want to use a resolver
   for this task. So I commented out some code in ngOnInit() of server.component.ts . There, we can easily get the return value
   of that resolve() method which is the server object that you were requested, by binding the data observable.
   So just like static data which you passed with data object for a route in routes definition in app-routing file, the data which
   is returned from your resolver will also go into data object which you have access to that data object in your loaded component
   for the route.
  Learn:
   Recap: For passing static data and then using that data: For passing the static data into a component which would be loaded for
   a route, you must provide that static data in the object for that route in route definitions in app-routing file, in the
   data property which this data property is an object and you can pass your static data to this data object by providing a key-value
   pair for each of your static data. For example we want to pass the name and age of a person and this name and age would be available
   for the component that we specified for that route. For doing this task in data prop we specify 2 key-value pairs:
   data: {name: 'parsa', age: 20} . Now we passed that static data for the component which would be loaded when we enter that route.
   How we gonna access that static data? First we must provide the ActivatedRoute type in () of constructor() of the .ts file of
   the loaded component and then store that arg in a prop of that class and then use that prop by using it's property called
   snapshot and then on that snapshot we have data prop which is that data prop in the route definitions and then provide a []
   and in that square brackets we write the key name of that data we want to use. Also you can use subscribe snippet code for
   updating and ...
   For passing DYNAMIC data and then using that data in the component of a route:
   For passing that dynamic data, we must create a resolver service and implement Resolve interface of angular and we know that
   the Resolve interface of angular requires the class that implemented it to implement it's resolve() method. So we must also do
   this in our resolver service which this resolve() method would return the dynamic data that we want in our components. Each
   resolver service is for it's specified component and would return the dynamic data for that specified component.
   So after creating that resolver service, we must include that service in the component which wants the dynamic data, by
   providing an arg in () of constructor of that component and then store that arg in a prop. So now the component has the data.
   Now we must use that data which is provided by that service for the component.
   For doing that, first you must include the ActivatedRoute type in () of constructor() of that component and then store it
   in a prop of the class of that component. So that prop would have the current route and then say:
   this.<name of prop which has the ActivatedRoute type>.data.subscribe((data: Data) => {
      this.<the prop> = data<or whatever name you used for arg of this callback>['<the prop name in resolve object in app-routing file
      which the service you used, is assigned to this prop in that resolve obj>']
   });
   data prop which is an observable is like that data object in static data passing and using. By saying .subscribe() on data
   object in this case, we're listening to any any changes on data object(listening, because it is dynamic and may change) and
   here we're using an observable which is data because the server can changed so the data can change, so we must subscribe() to
   it and in subscribe() we know we would get back our data.
   A resolver service is very crucial if we would get some data asyncronously.
   -->
<!-- 30. Understanding Location Strategies:
 If you have a route for example like: <domain>/servers on a real web server , app might not work out of the box. Because the URL is
 always parsed(handled) by the server(the server which hosts your app) first. Now here, in our local development environment,
 we're using a development server, but this server has one special configuration which the real servers which host your app
 also has to configured, so when user sees 404 page, the server must returns index.html file(the file containing and starting
 your angular app) why?
 Because all of your URLs are parsed by the server first. So not by angular, but by the server. Now if you have for example .../servers
 it will look for a .../servers route on the server. Now chances are you don't have that route here because you only have one file
 there, which is index.html which this file is containing your angular app BUT you want angular to take over instead of server and
 parse this .../route.But it will never get a chance because the server which is hosting your angular app doesn't know the route
 so it would give 404 page. Therefore you need to make sure that in this case, your web server returns the index.html file instead of
 404 page. But if for some reason, you can't get this to work or you need to support very old browsers which those browsers are
 not able to parse paths like .../servers in the client which angular does, you have an alternative approach to using those nice
 urls like .../servers . That alternative is to using # signs in your routes.
 You can enable that feature in app-routing.ts file where you register your routes by using RouterModule.forRoot(<name of array of
 the routes>) . You can pass a second arg which is a JS object which configures the setup of the routes.
 So the first arg is about routes themselves and the second arg is configuration of them. In this case we use: useHash: true;
 the default value is false. So now the url of website would like: <domain>/#/...
 So for example when in the past we had .../servers , after this configuration we have .../#/servers , this is hash mode routing.
 What this hashtag will do is: it informs your web server, "hey! Only care about the part in this url, before this hashtag".
 So all of the parts of url that are after #, would be ignored by your web server. Therefore, these kind of urls, will run even
 on servers which don't return the index.html file in case of 404 errors. Because those servers with this config, will only
 care about the part before # and the parts after the # can now be parsed by client, like angular.
 Prettier routes using the html history mode are normal slash routes without #.
 -->
<!-- In routerLinkActive directive, we define the class we want to CONDITIONALLY attach to the element that this directive sits on it,
 whenever the link on that element or the element nested inside of it gets active.
 Also when using <a> don't use href attr on them, because it would send request to server and therefore it would reload the app.
 Instead use [routerLink] directive.-->
<!-- For setting up dynamic links non programmatically, we must use [routerLink] with [] to really configure those links.-->
<!-- You can't use routerLink on <button> elements. So you can add a click listener on those elements and then call a method after
 user clicks on those elements and in that method you can use navigate() method to go to other routes. Also for using navigate()
 you must include Router to your .ts file.-->
<!-- Important: When you have a component that would have an id or some other information which would be created for that
      component in the beginning nad you will need that info later in your methods or props, you can get that information
      which is about that component in ngOnInit() of that component.-->

<!-- Observables
An observable is like a data source. Now in our angular project, an observable is basically just an object which we import from
a 3rd party package named rxjs. The observable here, is implemented in a way that it follows the observable pattern. So we have
an observable and an observer. In between of these 2, we have a stream or a timeline and on this timeline, we can have multiple events
which these events are emitted by observable or data package which emitted by the observable which these 2 reasons of emitting the events
depend on data source of that observable. So the that observable could emit data because you trigger that observable to emit data.
you can do that programmatically. For example: The observable could be connected to a button and therefore whenever that button is
clicked, an event in a data package is emitted automatically or as the angular https service does it, it's connected to a http request.
So when the response returns, the response is emitted as a data package and we have a lot of data sources.
So observable is like a data source. Like user input events, http requests, triggered in code and ... . These were all async tasks.
Because you don't know when they will happen and you don't know how long they will take. So if you execute your normal application code,
you don't want to wait for these events or you don't want to wait for completion of a http request because if you wait, it will
block your code. Observables are different approach for handling async tasks (other approaches are like callbacks and promises).
The observer is actually your code. In observer you have 3 ways of handling data packages.
You can handle normal data, you can handle errors or you can handle the completion of observable. Because these are 3 types of
data packages that you can receive. So you can determine what should happen if you receive a new data package, what should happen
if you receive an error, what should happen when the observable eventually completes. So these 3 were 3 different hook where different
code is executing depending on the type of the package we receive and then observables might emit a couple of normal data packages or
might emit an error or eventually it get might completed.
Remember: An observable doesn't have to complete. For example there are observable which hooked up to a normal button, which never
completes, because how would you know it completes? A user can click a button how often the user wants, right?
But other observables like http request can eventually complete.
2. Analyzing Angular Observables
Observables are constructs which you subscribe to them to be informed about the changes in data. Because remember, observables are
stream of data and whenever and when a new data piece is emitted, because we have been subscribe to that observables(stream of data),
we will informed about the new data.
EX) When we have this.route.params.subscribe((params) => {...});
params is an observable and it's a stream of route parameters and that stream gives us a new route parameter whenever we go to
a new page(whenever those parameters in the url changes), we get the new params therefore the code inside that callback of subscribe()
runs.
-->
<!-- 3. Getting Closer to the Core of Observables:
For building your own observables you must import sth from rxjs package. But when you're working with params observables you
don't need to do this import for that. But if we want to create a new observable, we need certain feature from rxjs package.
To be precise, the rxjs package gives us different ways of creating a new observable and one of the easiest way of doing this is
to use interval function and we can import interval from rxjs package and you can call interval() and then pass a number to it.
That is a bit like setInterval() where it will fire an event every x(the number in () of setInterval()) milliseconds.
So here it is also like setInterval. So when you pass 1000 to interval() , every 1 second it would emit a new event. The
result of interval(1000) would be an observable therefore we can subscribe() to that function which gives us observable.
The first arg you can pass to subscribe() is an anonymous function, that function is a handler for all of the data values which
emitted from interval() and the emitted values from interval() is an incremental number. So we can get that number by providing
an arg for the anonymous function in first arg of subscribe().
So when we have interval(1000) , it will emit a new incremented number every 1000 milliseconds. So we can get that emitted number
by providing an arg in () of function of first arg of subscribe() . Which in this case we named that arg, count.
Now in developers console, you should see an incrementing value which would log to the console every 1 second and it would log it
to console till end of earth!
This is not an observable which we built from ground up but it's close to that. Now, we write the code of this interval() observable
in the file of a component, right? For example in .ts file of componentA. But after navigating to componentA, if you now go to
another component, you can see still we're logging that incrementing number to the console! Even when we're not at the component
which has the code of that observable!!!
Now if you navigated away from the component which has an observable which emits values and AGAIN navigate back to that component,
a new observable which is exact as that old observable will start to emitting values and that old observable is also keeping
it's work and is still emitting it's values. So now we have 2 observables that are working and again if you navigate away from
that component and then get back to that component, 3 observables would working and ...
Learn: Observables don't neccessirly stop emitting values just because you're not interested in them anymore(so in this case
 when we navigate away from the component which has the code that emit values from an observable, still we get the values of
 that observable)! But there are certain observables which emit a value ONCE and they're done. For example an HTTP request where
 you get back the response.
 To stop an observable from emitting values and therefore to prevent memory leaks, you should unsubscribe from any observable
 which you're not interested to it's values anymore. To do this, we should store our subscriptions. So if you subscribed to an
 observable in a component, you should store that subscription inside a prop of class of component and the type of that prop
 which stores a subscription to observable would be Subscription and this Subscription type must be imported from 'rxjs' package.
 When we use .subscribe() on an observable, that method returns a subscription. So when we subscribe, we can store that
 subscription in the property which we stored our subscription and is type of subscription. But notice, here we are not storing
 the observable in that subscription prop, because we instantly subscribe() to that observable. Therefore we store whatever
 subscribe() returns and we know subscribe() returns a subscription.
 Now the idea behind storing the subscription into a prop simply is that we now can implement OnDestroy there and by
 implementing OnDestroy on the class of a component, it forces us to add the ngOnDestroy() lifecycle hook and inside of that
 we can use that prop which we stored the subscription to that observable and call unsubscribe() method on that prop. This means
 whenever we leave that component, we clear that subscription and therefore we prevent memory leaks because we're not keeping the
 old subscription anymore.
 So now if you navigate away from that component, the observable won't emit new values and if you get back to that component
 again the old observable is dead because we unsubscribed that old observable and a new observable would start to working.
 Remember: The observables which are provided by angular, like params, all of them are managed by angular and therefore you don't
 need to unsubscribe from them manually.
 So we learnt that interval() is kind of a utility function which gives us a predefined observable that fires every x seconds.
EX)
interval(1000).subscribe((count) => {
  console.log(count);
});
ngOnDestroy () {
  this.<property which we stored our subscription to that observable we want to unsubscribe from it>.unsubscribe();
}
 -->
<!-- 4. Building a Custom Observable:
To create a new observable, we can import the type Observable from 'rxjs'.
The create() method on Observable takes a function which that function will get an argument automatically. RxJS will pass that
arg automatically for us to that function and that arg is called observer.
Learn: The observer, in the end is the part that is interested in being informed about new data or about errors or about
 observable being completed. Now our job in the anonymous function of create() is to tell observer about the new data which
 observable emits or about errors or about the observable being completed and in there(in anonymous function for create()),
 we're not responsible for listening because the observer is the listener. In that anonymous function, we get the listening part
 as an arg and we need to tell it once we're done(for example once we have new data).
 Learn: In subscribe() we pass a function which accepts the data we're emitting from observable.
 When we're saying observer.next() in anonymous function of create() method, we are emitting a new value by calling that.
 Or observer.complete() in function of create() is to inform observer that you're done.
 When you create a subscription to an observable which that observable is created by using create method, you must add the
 result of subscription into a property and then you must use unsubscribe() on that property. So it means you unsubscribed
 from that subscription.So with this, if you navigate away from the component which has this custom observable, that observable
 would be die and won't emit new values and if we back to that component again, a new observable would be start to working.
const customIntervalObservable = Observable.create((observer) => {
  //Emitting new data from this observable
  let count = 0;
  setInterval(() => {
    Observer.next(count);
    if (count === 2) {
      Observer.complete();
    }
    //Fake error handling
    if (count > 3) {
    //Throw an error
      Observer.error(new Error('Count is greater 3!'));
    }
    count++;
  }, 1000);
  this.firstObsSubscription = customIntervalObservable.subscribe();
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}); -->
<!-- 5. Errors & Completion:
The most crucial thing that observables do is emitting new data, so when you subscribe() to an observables, you must pass the
first arg of subscribe() where you're in getting the data from observable.
When you have HTTP request with observables, error handling is crucial.
Whenever an observable throws an error, it cancels, it's done, it dies and won't emit new values and therefore in that case
you don't need to unsubscribe from that observable. You still can unsubscribe if you navigate away from that component.
So throwing an error actually cancels the observable and lets it die.
Learn: The second arg of subscribe() method is a function that gets called when an error occurs and we get the error by
 providing an arg for that function.
When you call complete() on the observable, observable will really come to halt. So whenever an observable is complete it's
really done, there are no values emitted after an observable is completed.
Learn: If you want to react to completion of an observable you can add the third arg to subscribe() method and that third arg
 is the completion handler function. It's a function that gets no arguments, because completing doesn't pass any arguments.
 Also remember: You don't need to unsubscribe of the observable, if your observable completes. But you might don't know that,
 so you can unsubscribe it in ngOnDestroy() .
Important: When an observable throws an error or gets canceled due to an error, the complete function would never called.
 The complete arg, won't called if the observable gets an error. So if we get an error, the observable would never completed.
 Because it was canceled and died.
 Whenever you subscribe() to an observable and then you set up your different handler functions as arguments of subscribe(),
 in the end, RxJS would merge all of those handler functions altogether into one object and passes that object which is the
 observer, to observable and inside of observable, it will then interact with observer and let the observer know about new data
 that he(observable!) was emitted and also about errors and ... .
 So generally, observables wrap some event source(in our custom observable, that event source was setInterval() function and in
 other cases, it might be an ajax request or a click listener or ... ) and they give you data or might errors or complete event and
 in most cases you use .subscribe() on observable and pass some functions to that subscribe() as args to deal with those data or
 errors or completion.
 -->
<!-- 7. Understanding Operators:
 Sometimes you don't need the raw data that comes from observable and you want to transform it or filter out certain data points
  and of course you can do all of that inside your subscription or in other words in functions that you pass to subscribe() ,
  but there's a better way. You can set things up, which with that setup, data points first reach those operators instead of
  subscribe() and then those operators do something with the data and then subscribe to result of those operators.
  So we manipulate the data we got from observable in earlier places than those handler functions and those places are operators.
  You can use those operators on the observables like customIntervalObservable which we were created it and by calling a method
  called pipe() .
  Every observable has pipe() method available on it.The pipe() method is built into rxjs . Now you can import operators but not
  from 'rxjs' package, instead from 'rxjs/operators' . map() gets an anonymous function as argument and that function and that
  function takes the data that if you weren't use operators, that data would go directly to the first anonymous functions inside
  subscribe() and that data is the current data of your observable which is being emitted by observable.
  In map() we have to return the data we got from observable.
  Now if you see the results of logging the data you are getting from map() operator in subscribe() first callback, you notice
  that the data is not changed! The reason is that yes the data is applied and changed by map() but still we're subscribing to
  old observable and also and the map() inside of pipe(), isn't changing the data that observable emitting, but instead it is
  changing the data we get AFTER the pipe() . Important: So we must subscribe() on the pipe() of observable.
  So instead of this:
  customIntervalObservable.pipe(map((data) => {
    return `round ${data + 1}`;
  }));
  this.firstObsSubscription = customIntervalObservable.subscribe(
  (data) => {console.log(data);},
  (error) => {
    console.log(error);
    alert(error.message);
  },
  () => {console.log('Completed!');}
  );
  We must write this:
  customIntervalObservable
  .pipe(
  filter((data) => {
    return data > 0;
  }),
  map((data) => {
    return `round ${data + 1}`;
  }),
  )
  .subscribe(
      (data) => {console.log(data);},
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {console.log('Completed!');}
  );
 pipe() method takes unlimited args which each arg is an operator and those operators will execute one after another and do
 different kinds of stuff on the current data which was emitted by the observable.
 Learn: In filter() we must return either true or false, which with this , we decide that data point will continue that chain
  of methods or not.
 8. Subjects:
 Instead of EventEmitter<>() we can use a Subject<>() .
 A Subject<>() is a spacial kind of observable. So you can subscribe() to a subject which is an object like an observable but
 it's more active because you can call next() on it from outside of subject. Remember: In observables context, you could call
 next() but you must do this from INSIDE of that observable.
 So subjects are active observables which are perfect for using them as event emitters. So if we don't have a passive event source like
 an http request or DOM events, but if we have sth that needs to actively triggered by us in our app we can use subjects.
 WHEN you want to USE a subject, you must subscribe to the property which triggered that subject.
 Important: Just like your own observables, you must unsubscribe to your subjects, whenever you don't need them(in ngOnDestroy()).
  For unsubscribing from an observable you must store the result of using .subscribe() on the observable, into a property
  which is the type of Subscription and then use that property and call .unsubscribe() on that prop in ngOnDestroy() .
 Learn: In <> of Subject<>() we specify what data type will EVENTUALLY be emitted like what we had in EventEmitter<>() .
 So like EventEmitter<>() , in the component which you want to emit an event , you can create a prop which would store the
 result of new Subject<>() and we can then say . this.<the prop which has stored the result of new Subject<>()>.next();
 So instead of emit() in EventEmitter<>() we called next() in Subject.
 You don't use subjects instead of event emitters. So when you're using @Output() with your own even emitter prop, you shouldn't
 use a subject instead of that event emitter.
 IMPORTANT: So you only use subjects for cross component communication through services. So for example you create a prop which
  stores the result of new Subject<>() in the service file and then include that service in the component you want to emit
  an event using that subject by using subscribe() on prop of that service which stored the new Subject() TODO ????
  Important: So if you were using a prop for just parent-child communication and not CROSS-component communication which
   that prop would definitely decorated with @Output() and therefore that prop would be store the new instance of EventEmitter<>(),
   you SHOULDN'T replace that EventEmitter<>() with Subject().
   So now we can pass data from componentA to B in best possible way by using Subject<>() instead of EventEmitter<>().
 Remember: Subjects() use next() instead of emit() to send a new value. Also when you want to consume a property which was
 taken out from the subject, by using next() , you can use .subscribe() on the property which stored the new Subject<>() in that
 service file.
 Also after using subscribe() on a subject, it's a good practice to store the result of that subscription into a property with
 type of Subscription and then use unsubscribe() on that prop in ngOnDestroy() .
 So it's better to replace all of your event emitters with subjects.
 -->

<!-- You're creating a SPA with angular, so there isn't any submitting to the server in forms, instead you need to handle the
 form through angular and then if you want to submit a form to the server, you need to reach out the server via
 angular's HTTP service.
 We need an object representation of your form in your ts code to work with that form.
 Angular offers 2 approaches for handling forms:
  1) Template driven approach: In this approach, you set up your form in template and angular will automatically infer the
  structure of your form and will infer which controls and inputs your form has. So angular infers the form object from the DOM.
  2) Reactive approach: In this approach, instead of angular, YOU will define the structure of the form in ts code and you
   also setup the html code of form and then you manually connect them together.
 The <form> element we haven't action attr which would point to a route also we don't specify the method attr on this element.
 The reason is that this form should not get submitted to the server. I don't want a HTTP request to be the result of clicking
 the submit button of form. Instead, angular should handle the form and therefore we won't have an action attr or method attr.
 So because we aren't sending a request to server when clicking on submit button, the refresh icon of browser isn't spinning.
 How we get angular to create that form object for us?
 5. TD Creating the Form and Registering the Controls:
 How angular creates such a JS object representing of our form in the template driven approach ?
 The things you must do is in app.module.ts import the FormsModule and also add it to imports array.
 Angular will automatically create a form for you(actually it will create a javascript object representation of that form),
 WHEN it detects a <form> element in html code. So you can think of that <form> element serving as a selector for some angular
 directive which that directive would create such a javascript object representation of the <form>...</form> for you.
 But one thing does not automatically happen by angular and that is angular won't detect automatically the inputs in that <form>.
 Because maybe you don't want to add all of the inputs which are in that <form> as controls to that object representation of that
 form. Control is what is in that JS object. Again: Not every input in your html code might be a control that you want to have
 in your object representation of that form. For example: Maybe you have a dropdown in that <form> which by clicking on it's
 values, only something on the UI changes but the those values shouldn't be part of what gets submitted. Or maybe you use some
 3rd party package which adds some custom form controls which are not labled as <input> , so angular would have no chance of
 detecting that element which that element must be as a control in the object rep of your form.
 So you still need to register the controls of your forms manually. In other words you need to tell angular: "Hey! Within
 that <form> element, those must be the actual controls of my form." So we must tell angular how our form looks like?
 In the template driven approach that is super simple.
 You must add the ngModel directive to the input you want to add it as a control of that form. But it's not using as two-way data
 binding in this case. For doing 2-way data binding, we must use ngModel as [(ngModel)] . So in this form case, we add ngModel
 without any parentheses or brackets. This ngModel is enough to tell angular: "hey, this input actually is a control of my form"
 So ngModel is a directive which made available by FormsModule. So you can use ngModel for 2-way data binding but ngModel actually
 is a part of a bigger module with more features. Also we need to give angular the name of the input we want it as a control of
 that form. So by giving the name attr of the input we want to add it as a control of that form, that input is registered as
 control of that form and would be in JS object representation of that form.
 Learn: So we added ngModel and name attr for the input we want it as a control of that form.
  <select> element is another type of html input elements.
 Now we want to see key-value pairs which shows us what user inputs into each input.-->
<!-- 6. TD Submitting and Using the Form:
Now let's make our form submittable, therefore we can see what users entered. For doing that, we create a method like onSubmit()
and this method will be triggered whenever the form is submitted by user. Now where we must call this method?
You might say click listener on the button for that element. Because that is the button we click when we want to submit that form.
However this is not the best place to do that.
Important: Currently we have a button for submitting the form which has the type="submit". So if we click on that button,
 the default behavior of html will be triggered. Because if you have a <button> in the <form> element , that button will submit
 the form and will send a request and besides of those, submitting that button will trigger a JS event. The submit event which is
 built-into javascript and html. Angular uses this behavior and gives us a directive which we can place on the <form> and it is
 ngSubmit and it actually only gives us one event that we can listen to that. So ngSubmit is a directive which gives us the
 (ngSubmit) event which would be fired whenever that form is submitted so whenever that default behavior is triggered. Now
 for the code that would execute after firing that (ngSubmit) event we can call that method.
Important: In template driven approach as a rule of thumb, we have to do everything in html template(as the name of
 this approach represents!). So everything you want to change about that form, or if you want to add functionality to that form
 you do it in template.
We can add local references to html elements to get access to those elements in that template file.
Now for getting access to that object representing of the form, we can place a local reference on <form> and then pass that
reference to () of method that we're calling that method after the form submitted. So like:
<form (ngSubmit) = "onSubmit(f)" #f>...</form>
So we can submit the form by calling the onSubmit() method and pass the form we get via ngForm in () of onSubmit()
Learn: The f or local reference of that <form> element which we are passing to onSubmit() method, is type of HTMLFormElement.
Now provide an arg when you're defining that method to retreive the value we're passing to that method.
Now the f would be the form object which isn't a JS object created by angular but that object is there and we just need a way to
get access to that object and it's values. Now for get access to that automatically created object(in this case it's f reference),
we must set that local reference on the <form>, to something which that sth is exposed by form.
Learn: Keep in mind, the <form> element is kind of a selector for a directive which is built-into angular which will create that
 JS object of the form automatically and that <form> would expose some data which we can fetch on that <form> element which remember
 it's kind of a directive. we can access to that data by set local reference which is on the <form> to "ngForm".
 #<local reference> = "ngForm" would tell angular: "Hey please give me access to that JS object of form you created automatically."
So this was how you get access to the JS object representing the form which was created by angular automatically.
Learn: Now the f(local reference on <form>) wouldn't be type of HTMLElementForm but instead of type of NgForm and you must import
 NgForm from '@angular/forms'.
you can see a strange class on the <form> which that class attr was generated by angular.
7. TD Understanding Form State:
In JS object which represents the form, we have value prop which stores the inputs of user in key-value pairs.
touched field specifies if we click on a field of the form. Difference between touched and dirty is that in dirty we have to
change the value of a field to make dirty prop true but for touch, if we simply click on a field of that form it would turn to
true.
8. TD Accessing the Form with @ViewChild:
Another approach for submitting the form:
Learn: Remember: We learnt that @ViewChild() decorator allowed us to access a local reference which is in template file, from .ts file.
So also in submitting the form, we can also use @ViewChild() to get access to the object which represents the form element, from
.ts code, instead of passing the reference to that method we're calling when the form is submitted, we can use @ViewChild() to
get that reference which holds the object representation of form.
So in that method, create a prop which is decorated with @ViewChild() decorator and in () of that decorator specify that
local reference in string format. So in our case, we can say:
export class .... {
  @ViewChild('f') <name of prop>: NgForm;
  onSubmit() {
    ...
  }
}
Learn: Now with this @ViewChild('<local reference to <form>>') we have access to the <form> object created by angular. So with
 this approach, we have access to that form without passing the local reference to the method which would be called when the
 form is submitted. Also this approach also is useful when you need to access the form not just at the point of time when the
 form is submitted but also earlier. The first approach of submitting the form, only gives us access to the form object, when the
 form is submitted not earlier of that.
 -->
<!-- 9. TD Adding Validation to check User Input:
Whilst you MUST validate inputs on the server side as the front end, we know that front-end can be tricked by users!
But for UX, it's better to do it on front-side too. Now since we're using the template driven approach, we can only add those
validators in the template file. For example we can add required attr which is a default html attr and angular will detect this
validator. So required acts as a selector for a built-in directive which ships with angular and it will automatically configure
your form.
Keep in mind that required directive just treated as a selector for angular directive.
On an <input> which is for email, you can add email directive like a html attr. But email is not a built-in html attr, it still
is a directive.
Right now, just by using email directive, nothing prevents us from submitting a from even without providing any email or an invalid
email even by using those directives. But if you look at the valid prop of form object which automatically created by angular,
the valid prop is false. So now angular tracks the state of our form and correctly informs us or gives us a chance of querying
it whether this form is valid or not and this behavior also happens in control level of our forms. So inside each control
of our forms we also have the valid prop. So angular tracks the directives we place on the inputs, for per control level(so if
the input is a control and if we place required directive on an input, angular will track that directive.
So if the user inputs a valid data into that input based on the directives we placed on that input, the valid prop in
object representation of that form would be true for that control) and then also on the form level.
Also there is another place where angular tracks the valid prop. So if we inspect the input in html code, you can see that
angular added a couple of classes like: ng-dirty ng-touched ng-valid . When the value of that field was valid, angular will
add these classes to the input which is responsible for that value. But if the value was incorrect or has a problem, we could see
ng-invalid instead of ng-valid. So angular also adds some classes which those classes give us some information about the state
of individual controls we have in forms. Whether that input is dirty or not(whether we changed the initial state of that input),
whether that input is touched or not(whether we clicked into that input or not) and whether it's valid or not.
Now with these information we can style these inputs conditionally.
So we can take advantage of the fact that angular tracks the state of the validity and the form overall and change the styles and ... .
IMPORTANT:
 For the template-driven approach, you need the directives. But for reactive approach we must use validators.
 you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding
 the ngNativeValidate  to a control in your template.-->
<!-- 11. TD Using the Form State:
For disabling the submit button if the form is not valid, we can add some property binding to that element. So let's bind to disabled
property.
Learn: By using property binding on disabled attr, angular will set the disabled state of button to true or false depending on some
 condition which that condition is set between "".
 Remember: In property binding, we bind a prop in [] and therefore by doing that, the value of that prop would dynamically change
 based on the condition we specify in the right side of the = and between "" .So the code between "" MUST be a dynamic code like
 calling a method which in that method based on some conditions we return a useful thing for that binded prop or the prop which is
 inside [] . Or that dynamic code inside "" , could be an expression with local references or other stuff which return sth correct
 for the bindded property.
EX)
<button type="submit" [disabled] = "!f.valid">
With this snippet, the button wouldn't disabled if we haven't any valid prop with value of false for each of the controls in that
form.
Now we can use the css classes that angular gives us.
Important: We do get these classes like ng-valid or ... AUTOMATICALLY by angular, so we can go to .css file of the component
 which has that class and modify those classes! Even without having them in your html. Because angular would give them to us
 automatically.
Just remember that angular will add .ng-invalid and all of those automatic classes to both <form> element itself and also the
controls. So instead of saying:
.ngInvalid {...}
in css file, we can say:
input.ngInvalid, select.ngInvalid {border: 1px solid red;}
Now with this improvement, if we see the results, you can see that the borders of controls which have invalid value inside them,
are red from the BEGINNING. But we want to at least give the user a chance of chainging the inputs of form before showing him
errors which he doesn't input the valid values for inputs.
So a better approach is we only add the red border to the input which has the ng-invalid css class AND also has the .ng-touched
class.So instead of prior selector we can do:
input.ngInvalid.ng-touched, select.ngInvalid.ng-touched {border: 1px solid red;}
With this improvement, the user has to at least click into the input to get an error and not from the beginning.
So now by default the user doesn't see anything with border red on the inputs EVEN though the inputs are empty(invalid) ,
(because when a user go to login page the inputs are empty right? But he didn't clicked on the inputs yet) .
Also you can add other elements to the template which form is there and say:
<form>
  ...
  <p *ngIf= "">Please enter a valid value!</p>
</form>
Whenever we have a wrong value in the field that p is gonna show an error message for that field. But how we gonna determine if
a value of that field which that field must be a control of that form, is a valid value or a wrong value? So with this, we can
complete that *ngIf for <p> . In the next video we can complete it.
12. TD Outputting Validation Error Messages:
We only want to show that <p> element if an invalid value entered into the input which this <p> element would show error message
for that input or control(if we add ngModel to that input element). So we need an access to that input or control to see if
there was an invalid value in there or not? So we can add a local reference to that input and then for the value of that local
reference instead of ngForm which we used for form overall, but ngModel.
So just like the form directive automatically added by angular when it detects a <form> element, the ngModel on inputs also
kind of exposes some additional information about the control which it(ngModel) creates for us.So the prior example should be like:
<form>
  ...
  <input
   type="email"
   name="..."
   #email = "ngModel"
   >
  <p *ngIf= "!email.valid && email.touched">Please enter a valid value!</p>
</form>
Now the user would see that <p> element from the beginning and this is not good. So we can add: && email.touched
So now if user clicks on that input and then enters an invalid value and then clicks on anywhere else, AFTER THIS, the <p>
element would be shown.
-->
<!-- 13. TD Set Default Values with ngModel Property Binding:
Right now we are using the ngModel without property binding or event binding or 2-way data binding. But we can use it in
property binding. So let's add [] on it and now we can bind it to a value and that value would be in "" .
So inside "" you can hardcore a string by wrap that string inside '' which is inside "" or you can create a prop in the .ts
file of that component and bind ngModel to that property instead of hard coded value.
EX) ... [ngModel] = "<property which has some value>" ...
So with this, we pre populated an input with some values.
Remember: The normal html input elements would be turn into controls by angular in the background automatically.
14. TD Using ngModel with Two-Way-Binding:
Sometimes you not only want to pre populate the default value for an input, but you ALSO want to instantly react to any changes
because right now, everything inside that form only updates if we click on submit button of that form and after that, we get
the form object and in that object we ca retreive the values which were submitted by the user.
Sometimes you want to INSTANTLY check something or simply repeat whatever the user entered. For example, we have an input
which we want to instantly show, whatever the user is typing in that input. So we can use 2-way data binding with ngModel.
So we want to repeat whatever user types in that input, inside the <p> element.
For doing this task, we can bind ngModel in 2-way data binding with a property which we named it answer and then use that property
in that template. That property is named answer.
EX)
<textarea
name="..."
rows="3"
[(ngModel)]="answer"></textarea>
<p>Your text: {{ answer }}</p>
.ts file:
class ... {
  answer = '';
  ...
}
So now we're seeing the value of that input instantly and if you submit the form, you will get a snapshot of that value in the
object that was retreived from submitting the form.
15. TD Grouping Form Controls:
Now let's say on the value object which we get when we submit the form, we want to group some things like our inputs.
This would be nice, if we could validate the status of our individual groups of inputs.
For doing that, you can wrap the inputs of a form you want to group them together inside a <div> and then give that <div>
a directive and that directive is ngModelGroup and it must be set equal to a string which is the key name of that group of
inputs. So now if you submit that form and get the form object, in value prop you would get an object with the same name of
what we set equal ngModelGroup to. Also in controls prop which itself is an object, we have that group of inputs.
Now if you inspect that <div> with ngModelGroup directive, you see that also on that div we have ng-dirty and ng-touched
ng-valid or their opposits. But we knew that these classes would only be present for input elements not <div>s . But that is
the influence of that directive.
You can also get access to JS representation of   by adding a local reference to the element which holds the ngModelGroup directive
and then we must set that local reference to ngModelGroup and with this we can get access to the JS object of that group and
for example use it like:
<p *ngIf="!<the local reference on that div>.valid && <the local reference on that div>.touched">user data is invalid!</p>
-->
<!-- 16. TD Handling Radio Buttons:
You must place ngModel on <input>s to make them control(of course if you want to make them controls!).
Also we bind the value attr of <input> element to the prop we have in the .ts file of this component.
The value attr is crucial because we want to find out which radio button the user selected.
EX)
<div *ngFor="let gender of genders">
  <label>
    <input type="radio" name="gender" ngModel [value] = "gender">
    {{ gender }}
  </label>
</div>
Now when the user submits the form, in value prop of js object of that form, we get gender: <the value attr of the selected radio
button>
So this was how you can easily incorporate or combine the radio buttons by placing ngModel on the input like what we
did in that past.
IMPORTANT: For just GETTING the value that the user submits in the inputs, you must place ngModel directive on the inputs you want
 to get the value of them and this placing the ngModel without any binding is for JUST getting the value of that input element.
 BUT: If you want to make the input to has a default value, you can use 1-way data binding with ngModel and set the value of
 [ngModel] to the default value you want.
 BUT: If you want to instantly react to whatever user writes or select on the inputs, you can use 2-way data binding on those
 inputs and bind ngModel to a prop in your .ts file and then output that prop on that template file.
17. TD Setting and Patching Form Values:
A different approach to 2-way data binding for changing the value of our inputs is to use this new approach.
In this approach, we can use 2 different methods.
First of all you must give a local reference to whole form and then get that local reference via @ViewChild() and create a prop
for this @ViewChild() . Then on that prop, we can use setValue() method. This method allows you to set the value of whole form
and in () of this method we need to pass a JS object which EXACTLY is representing our form. For example if you have some
groups of controls in your form you must provide a js object inside this object and ... .
EX) Our form has a group of inputs with names of username and email and an input with name of secret.
@ViewChild('<the name of local reference of whole form>') signupForm: NgForm;
this.signupForm.setValue({
  userData: {
    username: ...
    email: ...
  },
  secret:...
});
When using this method by using a click listener which set the values of our inputs in page to the values we set in
setValue() method, these values in setValue() would overwrite the values that user inputted (we had another button of type
button too! Which we placed click listener on it.)
So with this approach we saw how we can set the values of our controls with ONE command and that command is setValue() which
in () of this method, we pass in the same copy of our form as a JS object and it can OVERWRITE the value of controls of
that form. But this is not the best approach.
The second approach is to use that prop which has the local reference of whole form using @ViewChild() and on that prop, we access
the form prop which is an object and then on that we can use patchValue() method. So this method is not available on the
prop which has the local reference of whole form, directly, so unlike setValue() method, but on form object.
In () of this method, we pass a JS object where you ONLY overwrite certain controls. So with this method you don't need to pass
in an object which is the EXACT copy of whole controls that form object gives that to us.
So patchValue() is only available on the form wrapped by ngForm itself. Also setValue() would be available on form too!
So we can have: this.signupForm.form.setValue();
RECAP: setValue() overwrties the whole form but patchValue() overwrite parts of the form you specify.
EX)
this.signupForm.form.patchValue();
18. TD Using Form Data:
For getting the values that user submitted, you can create a local reference on the whole form and then get that local reference
which is in the html template file, in .ts file by using @ViewChild() and then create a prop for that @ViewChild() . Now
after creating that prop, we can use:
this.<prop which has @ViewChild('<name of local reference of whole form>')>.value.<if inputs are grouped you must first specify the
group name>.<name attr of input>
19. TD Resetting Forms:
Now let's say we extract or get all of the submitted values in form and now we want to reset the form.
For doing that, we can use the prop which has the local reference of whole form by using @ViewChild() and then we can call
reset() method. This would reset the form and that means it would not only empty all the inputs, because you can empty out
all of the form with setValue() method too. But reset() will ALSO reset the STATE like the valid, the touched and ... .
But you can also pass the same object we pass to setValue() method, to reset() method which that object is the EXACT copy
of all of our controls in that form and then reset the form to specific values.
After representing the form, if you inspect the controls of form, all of the classes have been reseted to ng-untouched and
ng-pristine and ng-invalid . So it's looks like the page was loaded again. -->
<!-- So we saw that in template driven approach, ANGULAR infers the form object from the DOM. In this approach, form is created
programmatically and synchronized with the DOM.
For start to working with this approach we start from .ts file of the component not from template file. First we create a prop
which will hold our form. So let's give that prop any name we want but it's type is crucial. The type must be FormGroup and
we must import it from '@angular/forms'. Also remember we imported ngForm from this package and use ngForm in TD approach and
ngForm was automatically created wrapper. But ngForm in the end was wrapping a FormGroup. Because in angular in the end,
a form is a group of controls. Therefore the overall form is also a FormGroup.
Now for this prop we don't need to set an initial value for now.
In reactive approach, especially when we want to connect our programmatically created form to our html code of that template,
you need to import sth in app.module.ts file. As a side not, in that file, you don't need the FormsModule for this approach.
Because that module was necessary for TD approach. Instead you need ReactiveFormsModule to be imported in that file.
So this is the file we need in order to build our own form and then connect it to our HTML code.
23. Reactive Creating a Form in Code:
You can initialize the prop which holds our form by using assign operator but it's better to do that assignment in a method.
So we can do that assignment in ngOnInit() method. So in this method, we will initialize our form. It's very important to
initialize our programmatic form, BEFORE rendering the template file of that component. So make sure to use a lifecycle hook
which is called BEFORE the template is rendered, for initializing the programmatic form, like ngOnInit() hook.
Now assign that prop to what? Keep in mind, this prop is type of FormGroup, so we need to assign a new instance of FormGroup()
class to that prop. Now we need to pass a JS object to that class. We can add some controls to this object. Controls basically are
just key-value pairs in this object which we pass to the overall FormGroup .
We wrap the key name of controls in '' , because with doing this, we make sure that during minification or when this code gets
mangled, this property name is kept because we will reference it in HTML code. This work might not be necessary and it might not
get destroyed, but for making sure, we did that.
To FormControl() constructor, we can pass a couple of arguments.The first arg is initial state or initial value of that control.
The second arg would be a single validator or an array of validators that we want to apply to that control.
The third arg would be the potential asynchronous validators.
Remember: Radio buttons are also inputs at the end. So to angular, they are simply controls.
In this example, 'gender' is radio button that we want to by default, select 'male' value.
EX) class... {
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(),
      'email': new FormControl(),
      'gender': new FormControl('male')
    });
  }
}
Now let's connect this form we created in .ts to our form we have set up in html code.(We must already created the form in html
template file, now we need to connect them.)
24. Reactive Syncing HTML and Form:
Currently, angular doesn't know which one of our typescript control relate to which input in our template code. Angular
doesn't even know that our programmatic form should be attached to the form we have in html code!
Right now, angular is just know want thing which is that it knows we have a form in html code. In other words, right now
the one thing that angular is doing is autodetecting that we have a form in html code and it creates a form for us.
So we have to add some directives to overwrite this default behavior in order to give angular new instructions.
For these directives to work, you need to make sure that you added ReactiveFormsModule in imports array of app.module file.
The first directive, we must add is formGroup directive to <form> itself and with property binding.
[formGroup] on overall form, tells angular: "Hey, please take MY formGroup and don't infer a from and don't create a form for us,
instead just use MY formGroup".
Also we need to set property binding here, because we need to pass OUR form which is in .ts file .
Now by passing the form we created in a prop of .ts file , to directive on <form> , we still need to tell angular which controls
should be connected to which inputs in the template code. For doing this, we need another directive named formControlName
and we use this directives on input elements which must be connected to a control in .ts file and in "" of this directive
we must write the name of control in .ts file.
If you're wondering why we didn't use property binding with formControlName directive, because we're passing a string to "" of
this directive. But if you want to use property binding, you must wrap that directive into [] and then enclose the name of control
which that name is a string, inside '' .Otherwise, without '', it would search for a PROPERTY with that name.
Learn: When you want to pass just a string to a directive, you can omit the [] syntax. But when you want to bind the property to a
 typescript snippet, you must use the [] syntax.
So with this, we're telling angular: "Hey my form should be connected to the form which is stored in signupForm property and
in this form, that input should be connected to the control which is in .ts file with the name of username."
<form [formGroup] = "signupForm">
  <input formControlName = "username">
  OR
  <input [formControlName] = "'username'">
</form>
Now because our html form and inputs are connected to controls, you can see now angular gives for example ng-touched or ng-valid
classes to our inputs and form. So they are connected and the state of our inputs and form is tracked by angular.
Now we want to submit the form.
25. Reactive Submitting the Form:
In TD approach, we used ngSubmit directive on the form element. Well we still do the same in this approach. Because we still
want to react to the default submit event which is fired by html and JS. So we still add ngSubmit directive on form element and
we must bind it in the way of event binding. So we wrap that directive inside () and for "" of this directive we can call a method.
<form [formGroup] = "signupForm" (ngSubmit) = "onSubmit()">
The difference to TD approach, is that we don't need to get the form which is in html code, via local reference, this actually
won't work anymore. Because we're not using angular's auto-creation mechanism in this approach. But we don't NEED to get this
reference. Because HEY! We created this form ON OUR OWN! In opposite of TD approach which angular creates that js representation
of that form. So we needed to somehow access to that auto-created form.
We already got access to that form in our .ts code and actually in every method in .ts code. Because that form is a prop in the
class of .ts code. So we have access to the submitted values of form and states of form and ... by using that prop.
So whatever you pass to FormGroup({}) which makes up your js representative of your form, is what you get from values prop
of the prop which holds your form.
So you can bind it to your own model and easily make sure that the form structure matches the structure of your model.
.ts file:
class... {
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(),
      'email': new FormControl(),
      'gender': new FormControl('male')
    });
  }
  onSubmit() {
    console.log(this.signupForm);
  }
}
So this was how you can submit the form and access the values of submitted form but now using your own created form in .ts .
26. Reactive Adding Validation:
If you want to add required attr to an input in reactive approach it wouldn't work. Because:
Important: You're not configuring the form in the template, you're only synchronizing it with the directives like
 formControlName directive.
Instead you're configuring the form in .ts code. That's why FromControl() takes more than 1 arg. So in the first arg of it,
you can set the default value, the second arg allows you to specify some validators. For example for using required validator,
first you need to write Validators object and then on that object you have a couple of built-in validators like required
validator. bUT MAKE SURE TO NOT CALL that validator. So don't write: Validators.required() . Instead Validators.required .
So don't use parentheses to actually call that validator. Because we don't want to execute that method (in this case
required method- required is a static method which made available by using Validators object), instead you only want to pass
the reference to that method. So we didn't use () , because we want ANGULAR execute that method, WHENEVER it detects that
the input of that form control which that validator is using in that form control, has changed.
We can pass multiple validators by passing them into an array.
So don't execute the validators and just reference of them.
So as soon as you write something in the input which has required validator on it, it would become valid and it would get
the ng-valid class instead of ng-invalid .
27. Reactive Getting Access to Controls:
In reactive approach, let's assume we want to display a message for
<input formControlName = "username">
<p>Please enter a valid username!</p>
In TD approach, for getting access to a control, we can say: <input formControlName = "username" #username="ngModel">
But in reactive, we can't do this.
We can add *ngIf , because we want to determine if show this message or not? and then first, we access the overall form we're
in it currently and then use the get() method. The get() method in reactive approach, allows us to our control easily. In ()
of get() you either specify the control name or the path to the control.Then use the valid prop for determining. So if that
In the example of instructor, the path is equal to name of that control, because he has one level of nesting. So it would be
'username'.
valid prop is used to determine if that control is valid or not.
Also to give the user to change the value of that control we used && signupForm.get('username').touched
<form [formGroup] = "signupForm" (ngSubmit) = "onSubmit()">
  <input type="text" formControlName = "username" *ngIf="">
  <p *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched">Please enter a valid username!</p>
</form>
So that was how you can get access to a control by using get() method.
Also for overall form, you can determine if the overal form is valid or not. But in this case you don't need to use get('<name of
control of path to control>') method. Because we want to determine the form not control. So like:
<p *ngIf="!signupForm.valid && signupForm.touched">Please enter a valid data!</p>
So as you can see we have access to valid or touched or ... props even without using get() ,IF we want to access the whole
form.
So now if even one of the controls of the form is invalid, the form is also invalid too and that <p> for form would displayed.
So actually we're using the form STATE. Like touched or invalid or ... states.
input.ng-invalid,ng-touched {
  border: 1px solid red;
}
Important: The state classes are the same in both approaches.
-->
<!-- 28. Reactive Grouping Controls:
get() also can takes the path to a control in our form. So you can specify the path, because you might have a nested form.
Let's say we have a FormGroup() named userData. Remember: FormGroup() is not only used to be on the overall form(because the
overall form is a form group), but you can still have FormGroup() inside of FormGroup() . Because when you want to start
writing the reactive approach, you use new FormGroup() on the property which would be the overall <form> element too.
And we know when you have FormGroup() , you must pass it a JS object like the overall FormGroup() .
So we can add some from controls inside of a form group. Like:
EX)
signupForm: FormGroup;
ngOnInit() {
  this.signupForm = new FormGroup({
      'userData': new FromGroup({
        'username': new FormControl(),
        'email': new FormControl(),
      }),
      'gender': new FormControl('male')
    });
}
So now we have a nested form. We need to reflect that into our HTML template, because right now if we look at our form, we have
an error, which says we haven't a control called username on the overall form and that's true, we have nested that control in
another form which is called userData. Also it can't find email control.
So first of all we need to update our synchronization. Because as I said the former formControls which where in the first level
of the object we passed to FormGroup({}), are now inside the second level. Or in other words they went inside another
FormGroup({}) and they nested in another FormGroup({}) . So angular can't find them right now. So we must update the template
of those form controls too.
Important: We do that by nesting the form controls which are in a deeper level in .ts file, inside an element like a <div>,
 and on that <div> which is the wrapper of those form controls, we place the formGroupName directive.
 So now you can see some kind of the structure of directives in reactive approach.
 formControlName directive to tell angular which prop in our typescript object which is representing the form, is related
 to which input in html code. Also we got formGroupName directive to tell that it is the SAME form in the form. Because
 we use that directive when we have a nested FormGroup() in another FormGroup() . For the value of formGroupName directive
 we write the name of the nested FormGroup() in the .ts file.
 Also we have [formGroup] directive which is used to specify the name of the overall FormGroup and usually this directive sits
 on the <form> element.
 But still by adding that formGroupName directive to the container element of inputs which are nested in another FormGroup()
 in .ts code, we still got an error which says: Cannot read property 'valid' of null. Well, it is true because we have
 get('<the name of form control>') in html template which aren't updated based on the nested controls in .ts file.
 Because in get('<the name of form control>') in html template of the component, we are trying to get a formControl with the
 given name in () of get() in that reactive form which the name of that form is in value of [formGroup] directive.But right now
 we nested those formControls. So we need to update get() to point to the right path to that formControl. So instead of
 get('username') we can say get('userData.username') which the userData is the name of FormGroup() which that formControl
 is nested inside it. So you must structure your path in get() separated by dots.
 So this was how we can REFLECT nesting of formControls in another FormGroups() which all of them are in overall FormGroup()
 in html template.
30. Reactive Arrays of Form Controls (FormArray):
Let's say in our form, we want to allow the user to dynamically add formControls. So let's define a button in form:
...
<div formArrayName="hobbies">
  <button type="submit" (click)="onAddHobby()">Add Hobby</button>
  When you are using the getControls() method:
  <div class="form-group" *ngFor="let hobbyControl of getControls(); let i = index">
    <input type="text" formControlName="">
  </div>
  Alternatively when you are using the getter as I wrote in below in .ts code snippet you must output the array like this:
  <div class="form-group" *ngFor="let hobbyControl of controls; let i = index">
</div>
...
Now when the user clicked the button, we want to dynamically add a control to our form. So we want add that control to an array
of controls, because the user might has multiple hobbies. So let's add a click listener on that button too.
Now we need to add a new type of control but not formControl to our overall form and it would be an array of controls.
So because we need an array of controls, the type of that control shouldn't be FormControl and also not FormGroup too. Instead
the type of that control is FormArray. So let's say: new FormArray() for creating that control.
In the array that we pass to FormArray() you can initialize the formControls you want to be in that FormArray by saying:
new FormControl(), ... OR leave that array empty, so it means we haven't got any hobbies at the beginning.
We need to cast this.signupForm.get('hobbies'); to say it is type of FormArray. So we can say <FormArray> at the beginning
of that code and wrap the thing we want to be that type with ().
The first arg of FormControl() is the default value of that control.
.ts file:
ngOnInit() {
  this.signupForm = new FormGroup({
      'userData': new FromGroup({
        'username': new FormControl(),
        'email': new FormControl(),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray()
    });
}
onAddHobby () {
  //With this snippet we are creating and then adding the new form control but we won't able to see it. Because we need to
  synchronize that new form control with our HTML code. Therefore we can use a directive named formArrayName.
  So <div formArrayName="hobbies"> tells angular that SOMEWHERE IN that <div> , the hobbies FormArray will live.
  Now let's create a <div class="form-group"> inside that div with that special directive, to output the array of
  formControl hobbies and in that <div class="form-group"> we create an <input> which allows user to enter a new hobby-
  FormControl .
  Important: For synchronizing the FormArray with the html code, we need to use formControlName on each formControl which is
   in that FormArray and we want to output that FormControl in html code and use the index of *ngFor for looping thorugh
   those formControls. So we still needed to synchronize that <input> in *ngFor with dynamically created <input>. Now that
   dynamically created input(s) , won't have a name(s) attr chosen by us, but it(or they) would be in that array. So the name
   attr would be the index in that array, which is why we are retereiving it in let i = index; . So we can bind formControlName
   by using property binding or [] . Because there, we are not passing a string to formControlName, but instead we are using a
   variable or i in that case.
   So now if we click on that button, it would add a new input and add in on html too. Now if you write something in those
   new inputs and then submit the form and then console.log() that form(which we are doing in onSubmit() in value property
   and then in hobbies prop, you can see the name of those new inputs which are some numbers and you can
   see the value of those new inputs which the users submitted them.)
  Now we need to loop through the controls which are in the array of formControls or in other words loop through the
  FormArray. For this, we can create a method to get those controls which are in that array. So we created getControls() .
  const control = new FormControl(null, Validators.required);
  (<FormArray>this.signupForm.get('hobbies')).push(control);
}
getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}
OR:
get controls() {
  return (this.signupForm.get('hobbies') as FormArray).controls;
}
This was how you can use FormArray() in reactive approach.
Also don't forget to look at 29th text lecture for a bug in newere angular versions.-->
<!-- 31. Reactive Creating Custom Validators:
Let's say we have some usernames that we don't want the new users to use them. So let's create a new prop with an array for
it's value:
.ts code:
forbiddenUsernames = ['Chris', 'Anna'];
Now we must create our own validator which checks whether the username that the user entered is one of the forbiddenUsernames
or not?
We know a validator in the end, is just a function which gets executed by angular automatically when angular checks the validity
of the formControl() and angular checks the validity of form control, whenever you change that control. Like changing the
value of that control.
So for creating a validator, let's create a method in the .ts file which we want to use that custom validator. Now a validator
to work correctly, needs to receive an argument which is the control that validator should check and that control which the
validator should check, is of type FormControl.
A validator also needs to return sth in order to angular to be able to handle the return value correctly. This sth should be
a JS object and in that object we should have ANY key (so any means we must use []) which that key can be interpreted as
a string so we must have: [<something>: string] and the value of that key should be a boolean.
In the body of this function, we must check if the value of the control which this validator would be used for that control
is part of forbiddenUsernames array or not?
So this function should return a JS object like:
{nameIsForbidden: true}
So nameIsForbidden would interpreted as a string.
EX)
forbiddenNames (control: FormControl): {[s: string]: boolean} {
  if (this.forbiddenUsernames.indexOf(control.value) !== -1 ) {
    /* The key name is up to you, but must be a string as I mentioned in return type of this function.
     Also remember if control.value is NOT part of the array we are using indexOf() on it by checking control.value ,
     it will return -1. So if this.forbiddenUsernames.indexOf(control.value) is true, it would return -1 . So we need to
     make sure that we consider that too. So we must use !== -1 .
     That means if we DO FIND control.value in forbiddenUsernames array, which in that case, the result of would be NOT -1.
     Because it find that value in that array, it means the value was not valid. So we return the error object.
     So if we type Anna in that control, the angular would give that control an invalid class.*/
    return {'nameIsForbidden': true};
  } else {
    return null;
  }
}
Important: If validation is successful, you HAVE TO return nothing or null and you shouldn't return for example in this case,
 an object like {'nameIsForbidden': false}; which has the value for 'nameIsForbidden' of false. That's just how it works!
 So in the case of the validation is good and successful and the value hasn't ane problem, we should return either null or
 we can simply omit the return statement for that case. That strange way, is how you tell angular that the formControl is
 valid.
 So for creating your own validator, you must first receive the control which we want to validate it and then return the object
 with error code(key name) in the case of invalid and in case of valid, we omit the return or just return null. For using this
 validator:
 Remember: For using that validator we shouldn't use () for calling that validator. So we don't execute it and we just write
 the reference of that validator.
EX)
ngOnInit() {
  this.signupForm = new FormGroup({
      'userData': new FromGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(),
      }),
      'gender': new FormControl('male')
    });
}
Now if you go to website, you see an error. Which says: Cannot read property 'forbiddenNames' of undefined.
This error has do sth with the way javascript handles this keyword. Because in forbiddenNames method we are accessing this
keyword. Now that might be looked alright because we are in the class and we are accessing a property of that class with
this keyword. But think about who is calling this.forbiddenNames ?
We are not calling it from inside of that class, instead, angular will call it when it checks the validity of the control
we are using that custom validator on it. So at that point of time, this keyword won't refer to our class. So we need to
use .bind(this) in FormGroup() and for that validator.
32. Reactive Using Error Codes:
If you have an error on one filed of form, that field is invalid and therefore the overall form is invalid. Now if you somehow
make the form submittable for testing purposes and then look at the submitted object of form, in root of the object, you
see an errors prop which is null!
But if you go to controls prop> <the control which had invalid value> > errors , you see nameIsForbidden: true .
Which was our error code in the validator of that field. (We wrote Anna for the value of that field so that validator would
return some error). So that is where angular ACTUALLY adds the error codes on individual controls and on their errors object.
So we can take advantage of this and go to template code and add a span and in that span say:
<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid</span>
<span *ngIf="signupForm.get('userData.username').errors['required']">This field is required</span>
With these, if we click in that input and don't type anything and then click outside of that input, we see the second
<span> error message and if we type Anna we see the first <span>. -->
<!-- 33. Reactive Creating a Custom Async Validator:
Async validators are able to wait for a response before returning the error object or return null. So let's create a custom
async validator.
Important: In promise, we don't usually use return key word for returning sth, instead we use resolve() or reject.
EX)
forbiddenEmails (control: FormControl)>: Promise<any> | Observable<any> {
  const promise = new Promise<any>((resolve, reject) => {
    setTimeOut(() => {
      if (control.value === 'test@test.com') {
         resolve({'emailIsForbidden': true});
      } else {
        resolve(null);
      }
    }, 1500)
  });
  return promise;
}
Now for using this async validator:
ngOnInit() {
  this.signupForm = new FormGroup({
      'userData': new FromGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.forbiddenEmails.bind(this),
        'email': new FormControl(),
      }),
      'gender': new FormControl('male')
    });
}
I used bind(this) there too, but in this case it isn't necessary because we aren't use this keyword in that async validator.
So when a control is using an async validator, first the ng-invalid goes to ng-pending and then if the validate was successful
it changes to ng-valid else, ng-invalid.
34. Reactive Reacting to Status or Value Changes:
So the status of an input or a control which has some async validators, first changed from ng-invalid to ng-pending and
then ng-invalid or ng-valid .
There is actually a form state which you can track it in general which you can use it on overall form or on each control,
you have access to 2 observables which we can listen to them. They are: statusChanges and valueChanges:
EX)
this.signupForm.valueChanges.subscribe(
  (value) => {
    console.log(value);
  });
Important: The first callback of subscribe() , gets executed when new data arrives.
With every keystroke, we can get the value of the form by providing an arg in first callback function of subscribe() and
the value of form includes the value of controls inside of that form. So valueChanges gets fired whenever we type(or change sth)
in any input of that form. Also you can call valueChanges on individual form control.
this.signupForm.statusChanges.subscribe(
  (status) => {
    console.log(status);
  });
This would also get's triggered on every keystroke and checks the validity of each control (if it was used on a control) or
overall form. So if you want to look closely what happening on your form or react to those changes, you can use these 2
observables.
35. Reactive Setting and Patching Values:
Not only you can listen to updates that happen in your form by changing the values of the fields or ... , you can also update
the form by yourself! Sth like template driven approach by using setValue and patchValue are there for you.
So in this approach, you can also call setValue() on your whole form and pass it a JS object which in that object, we should
resemble the object structure(but not exactly that object!) when you create the whole form in reactive approach.
So because we have a FormGroup, here we also have an object inside the overall object.
EX)
ngOnInit() {
  this.signupForm.setValue({
    'userData': {
       'username': 'Parsa',
       'email': 'parsa@test.com'
    },
    'gender': 'male'
    'hobbies': []
  });
}
Now with this snippet, our form is pre-populated with these values.
Also like TD approach, we have got patchValue() which is used for updating some parts of the form and not all of it. So if
we use setValue() first and then patchValue() which in that have changed the username, the username at last would be the
username that we specified in patchValue() but don't use this example!!!
For resetting the form after submitting, you can place a method like onSubmit() on a button which is type submit and then say:
obSubmit() {
  this.signupForm.reset();
}
Learn: By doing this, all of the values in form would be reset. Even the default checked values in radio buttons. Don't want some
 values like default checked radio buttons gone after submitting the form? You can pass an object to reset() method to just
 reset those things in that object.
37. [OPTIONAL] Assignment Solution: //TODO
10. Creating the Template for the (Reactive) Recipe Edit Form:
Let's create a form in recipe-edit component.
11. Creating the Form For Editing Recipes:
12. Syncing HTML with the Form:
We created our form with reactive approach now we need to synchronize it to it's html code. For doing that, first we need to sth
to app.module.ts file. So now in imports array of that file, we now not only need the FormsModule, but we also need the
ReactiveFormsModule. So let's add this after FormsModule in that imports array. If you don't import that, synchronizing
the created form in .ts with html code of that form will fail. Because we don't have access to the directives that are available
by importing that module in whole app, when synchronizing in reactive approach.
Important: First on overall <form> element, we need to add formGroup directive which must be used with [] .Because we need
 to pass some data to that directive. So we need to bind it using property binding.
By using that directive, we're telling angular that our overall form in html, is managed by ourselves and angular itself
should not manage it instead it just should take our form. With that, we can now assign our own controls. So let's use
formControlName directive on inputs. Also you can use prop binding with this directive too and then use single quotion marks,
because the data we want to pass, is a simple string and it's not a property which in that case we MUST use property
binding to be able to pass that property. But in this case we just need to pass a data which is just a string. So we can
omit the [] or property binding and also omit the '' .
Now you can use (ngSubmit)="<a method call>" to actually see the object that angular creates for us using reactive approach.
Also remember you don't need to create a local reference for whole form and pass it to that method call because we have access
to that form in .ts file already.
14. Adding Ingredient Controls to a Form Array:
Important: We can use for of loops for looping through arrays.
15. Adding new Ingredient Controls:
16. Validating User Input:
Important: The pattern we use in <input> must be in "" , but the pattern we pass as value to Validators.pattern() must be
 between // .
Any button which hasn't type attr in form , can submit the form until we explicitly use type="button" on it.
To using the validation of form, we can disable the submit button of form based on some condition of validation or ... .
ng-invalid class would apply to anything which is invalid.
Learn: You can apply some style an element when it has a class or some class by saying:
 <the element>.<the class>.<class 2> {...}
 EX)
 input.ng-invalid {...}
17. Submitting the Recipe Edit Form:
18. Adding a Delete and Clear (Cancel) Functionality:
After this video, there is still one problem, which is when we click on delete recipe, the recipe is deleted from recipe-list
but it's image and detail is still shown in right side. So we need to update that state.
19. Redirecting the User (after Deleting a Recipe):
Currently, after deleting a recipe, the list of recipes is updating after deleting a recipe but we are staying on the page of
deleted recipe. So let's go to recipe-detail component and when we delete a recipe, we need to navigate away.
20. Adding an Image Preview:
Let's add a local reference on input with id of imagePath, because in that template we need to access to that <input>.
Then bind the src attr to value of that input which that input is where we write the url of that image.
21. Providing the Recipe Service Correctly:
We have a bug! If we add a new recipe and then we go to shopping list and then go back to Recipes page, you see that the
new recipe is lost!
The issue is that we are providing the recipe service in recipes.component.ts file . So all the components which are the
children of that component , share the same instance of that service and therefore all of them including the recipes component,
share the same instance of that service. So if we navigate away to the shopping-list area, the recipes component gets
destroyed and the instance of the recipes service is destroyed.
Important: So what we need to do in order to make the service survives from that navigation is we need to add it to
 app.module.ts file and in providers array. By adding it there, we make sure that we have one instance of that service available
 all the time as long as our app is running. Also don't forget to delete the service from providers array in recipes component.
22. Deleting Ingredients and Some Finishing Touches:
If you add a <button> without any type attr, by default it would submit the form. So you need to declare the type of button
if you don't want that button to submit the form.
As of Angular 8+, there's a new way of clearing all items in a FormArray.
(<FormArray>this.recipeForm.get('ingredients')).clear();
The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.
It's like manually creating a loop and calling removeAt() for every item.
-->
<!-- The next comments are in pamphlet.md file. -->

<!-- Right now we are using some *ngIf directives to navigate around the app. So first we catch the clicked element which happened
 on <app-header> and then we store that $event variable which has the clicked element to a prop in app.component.ts file and then
 use *ngIfs on components that might load if user clicked on that component. But it's better to use angular router.
 Learn: So I used <router-outlet> to mark the place where angular router should render the component which we should load it
  depending on the path we are currently. So with <router-outlet> we got a place to load the components which are responsible for
  routes.  -->
