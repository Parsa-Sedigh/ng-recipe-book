import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {
  /* When the element that this directive sits on it clicked, we must add open css class to tha element and also remove
  that specific class once we AGAIN clicked on that element which this directive sits on it.
  So to be able to listen to a click, we add @HostListener() and then pass the click event in string format into () of
  @HostListener() and then after that we specify a property (which is like a method) for this event and here we named it
  toggleOpen() which would executed when we click on the element which this directive sits on that element.

  Why we added isOpen prop?
  Because for toggeling between adding the open class or remove that class, we must KNOW currently that element has open class
  or not? But there are other ways which doesn't need to create this prop.

  Learn: By using @HostBinding() on a property of the directive which that directive sits on the element, we can bind the
   property of this directive to all of the properties which that element has. So now in this case, by adding @HostBinding()
   to isOpen property which is a property of this directive, we can bind this prop to props of the elements that this directive
   sits on them and in () of @HostBinding() , we specify we want to bind this prop of directive to which prop of that element.
   In this case we want to bind isOpen prop to class prop of the elements that this directive sits on them.
   The class prop of elements in DOM, is a property of classes and in this case we JUST want to bind isOpen prop of directive
   to open class of that class array.
   So open class is the class that we want to attach it or detach it dynamically, by binding isOpen prop to that class so we can
   dynamically change that thing we attached to it.
   So now since initially we bind class.open to isOpen which in the beginning is false, so for the element that this directive sits
   on it, whenever the isOpen is false, the open class would be removed from that element and whenever isOpen prop switches
   to true, it will attached the open class to that element. Now we must add this directive to app.module.ts file.
   Now we must just place this directive on the elements we want.

  Learn:
   By using this snippet:
   prop = <initialValue>;
   this.<prop>= !this.<prop>;
   We are toggeling that property between it's values.


  */

  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
