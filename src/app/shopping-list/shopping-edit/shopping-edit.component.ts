import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /* I commented these 2 out, because we don't use local references on html template anymore. */
  // @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  subscription: Subscription;

  /* In <> here, we're saying the type of this custom event which it's name is ingredientAdded, is an object which that object
  * has 2 properties, one property called name and it's type is string and other property is called amount and it's type is number.
  * Or we can use the type of Ingredient class. */
  // ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  editMode = false;
  editedItemIndex;
  editedItem: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe(
    (index: number) => {
      /* Important: When know that when we click on an ingredient, this callback would run. We also know sth else. We only get
          here (into this anonymous callback function), if startEditing Subject was triggered or in other words, if we are
          editing. So that is an important information, when it comes to what we should do once the form is submitted. So
          we must know that after we submitted the form, now we are in create mode or in editing mode?
          For making that clear, we must the mode we are in it, in a property of this class and by default, that property is
          false and once we get to this callback function, it means we start to editing by clicking one of the ingredients.
          So in edit mode, we update an ingredient and not add a new one.
          So we must make the editMode to true. Because by doing this, whenever we click on an ingredient, we go to edit mode
          and rename the add button to edit button and also change the functionality of that button to edit functionality.
          Also let's store the index of item we are editing. So let's create a prop for
          storing that index and then assign the index arg of this callback to that prop.
          So we get the information about the ingredient we are about to edit it.
          Now with these information, we want to load the item we are about the edit. We will do it in 5th video.

        Now let's create a method in shopping-list.service to get the selected ingredient. Why in that file? Because our data or
        ingredients are in that file and we can get that ingredient by passing the index of selected ingredient to that method in
        service file.
        Now by calling that method, we can store the returned ingredient by that method into a prop of this class.
        So whenever we click on an ingredient, we call this getIngredient() method and pass the index of that ingredient to
        that method to get the actual ingredient.

        Now if we are in edit mode, we need to update our form by inserting the information of the selected ingredient.
        So we need to access to the form. Now on the form we have a local reference. So we can access to that local reference
        by using @ViewChild() and we use that @ViewChild() on a new prop which is named slForm which stands for shoppingListForm.

        Important: When you place some code OUTSIDE of the first callback of subscribe() , that code won't be run each time
          we get a new information(IF! we get some data in multiple times like a stream of data!), but that code might be
          run even before we get any information at all. So putting the code outside of first callback of subscribe() ,
          would be wrong in some cases. So if your code depends on the data that we listen to, in the first callback of
          subscribe() , you must put that code inside of first callback of subscribe() .

        Important: When you send a for example a GET request to server, the new data would usually only reach once to you
         not multiple times. Because the response won't be a stream of data usually.

         Now by using setValue() on form, when we select an ingredient, we populate the form with right values.

         6. Updating existing Items:
         Let's add some conditions for displaying the add button or update button. So let's go to shopping-edit.component.html

         For updating the ingredient, first let's add a method in shopping-list.service where we store our ingredients and in
         that method we expect to receive the index of ingredient we want to update and also the data of new ingredient.
         Important: After updating an ingredient, we must call the ingredientsChanged Subject to emit the new ingredients
          array, so other components which are using that ingredients would be also updated.

         Now let's reset the form after updating or creating a new item.
        */
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  /*
  onAddItem(name, amount) {
   We shouldn't use .nativeElement on these args because TODO??
    const newIngredient = new Ingredient(name.value, amount.value);
  }
  */

  /* I renamed this method from onAddItem to onSubmit. */
  onSubmit(form: NgForm) {
    // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);

    /*Getting the value of the form when submitting the form(which this value is the updated value or the whole new ingredient):
     */
    const value = form.value;

    // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    const newIngredient = new Ingredient(value.name, value.amount);

    /* I commented this line out, because now we might be in edit mode and try to edit the ingredient. So we must check if
    we are in edit mode or not and then call the right methods if that button was clicked.
    Now if we clicked on an ingredient, we go to edit mode and if we click on update button it would update the ingredient, but
    if we are not in edit mode, by clicking the add button, it would create or add a new ingredient.
     this.slService.addIngredient(newIngredient); */
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    /* Initially we are not in edit mode, then we switch to edit mode, whenever we get the startEditing observable to fire.
    * but we never switch it back to create mode. So after adding or updating, we set this.editMode = false; no matter of what
    * the editMode was anything before. This code, makes sure we definitely leave the edit mode after submitting the form. */
    this.editMode = false;
    form.reset();
  }

  onClear () {
    this.slForm.reset();
    /* If the editMode prop was false before, it doesn't hurt to set to false again and if it was true, well we set it to
    * false. */
    this.editMode = false;
  }

  onDelete () {
    /* In this method, we need to inform the service(because the ingredients are stored in service) that it should remove one
    of the ingredients in the array. Also we need to clear the form in this method. Because if an item was loaded in the form,
    we need to clear it because it was selected and by deleting it, it was gone so we need to clear the form too!
    Because obviously: For deleting something, first we need to tell what is the item we want to delete, so we must already
    selected it.
    So let's create a method in service named deleteIngredient() .

    We must call deleteIngredient() BEFORE clearing the form, because if we clear the form, we get out from the edit mode.

    Also remember, when you want to delete an ingredient, you must first click on it. So let's add a *ngIf on delete button
    and say this button would appear, IF we already selected an ingredient.
    So if we click on delete button without already loading an item, angular would throw an error. So I added *ngIf to
    delete button.*/
    if (this.editMode) {
      this.slService.deleteIngredient(this.editedItemIndex);
      this.onClear();
      this.editMode = false;
    }
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
