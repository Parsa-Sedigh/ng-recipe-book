import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  /* By adding @Input() to a prop, we make that prop settable from outside(the parent component) of that component.
  Settable from outside means we can use property binding to set this property(the value of this prop) from template code when
  we are instantiating this component, or from .ts file of parent component.

  The syntax for property binding for the componentA in a template file is:
  <app-componentA [<prop>]="some code"></app-componentA>

  Also don't forget to add this component to declarations array of app.module file. Now let's use this component in auth component.*/
  @Input() message: string;

  /* For making a functionality to be able to get rid of the alert, let's emit an event and we make that event listenable from
  outside of this component by using @Output() . If you don't use this @Output() you can just listen to this event from the files of
  this component and not other components.
  So let's create a new prop that holds an instance of EventEmitter() which we named it close and then for emitting this prop, we need
  to call a method. Let's name it onClose() and this onClose() method will be triggered whenever the user clicks the close button or
  clicks on the backdrop. So let's use (onClick)="" on those 2 elements in template of this component and in onClose() we use the
  close event which we created and manually emit() it to the parent component. Why we are emitting it?
  Because when the user clicks on the close button or backdrop, this onClose() method will be called and then we must destroy the
  instance of this component which is in a parent component, by emitting the custom close event.
  So when you are instantiating this component in auth component, we can listen to the even which we emitted it from this component
  by saying (<name of event>) and then execute some code or call another method.

  Remember: We use @Output() by emitting events to inform parent component about some changes.*/
  @Output() close = new EventEmitter<void>();

  onClose () {
    this.close.emit();
  }
}
