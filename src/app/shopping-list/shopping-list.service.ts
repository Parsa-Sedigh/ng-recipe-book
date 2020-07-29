import {EventEmitter} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomatoes', 10)
  ];

  /* This event emitter or now subject, is used to push the new information about changed ingredients from component A to B. */
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients () {
    return this.ingredients.slice();
  }

  addIngredient (ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients (ingredients: Ingredient[]) {
    /* By using this for of loop, we are emitting an event in each iteration of this loop. So it's better to not use this loop here.
    It's better to add all of the ingredients in one action and not in multiple iterations and repeatness.
    Learn: Now we can use speraed operator to basically turn an array of elements into a list of elements. Because the .push() method
     is able to handle multiple objects, but it's not able to handle an array or to be precise it can handle an array but then it would
     push this array as a single object to the other array.
     So with ... we can spread ingredients array into a list of ingredients instead of an array of ingredients which can now be
     pushed into ingredients array.

    After that we must emit() the copied array
    for (let ingredient of ingredients) {
        this.addIngredient(ingredient);
    }
    */
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
