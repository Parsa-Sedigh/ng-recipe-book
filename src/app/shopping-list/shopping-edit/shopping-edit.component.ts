import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  /* In <> here, we're saying the type of this custom event which it's name is ingredientAdded, is an object which that object
  * has 2 properties, one property called name and it's type is string and other property is called amount and it's type is number.
  * Or we can use the type of Ingredient class. */
  // ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  /*
  onAddItem(name, amount) {
   We shouldn't use .nativeElement on these args because TODO??
    const newIngredient = new Ingredient(name.value, amount.value);
  }
  */


  onAddItem() {
    // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.slService.addIngredient(newIngredient);
  }

}
