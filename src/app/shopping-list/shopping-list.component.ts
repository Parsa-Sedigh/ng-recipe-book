import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/* Just like Recipe, we're going to use ingredients a lot in our app. So we need to create a model for ingredients.
* Now where we must place the ingredient model file? We stored the Recipe model in recipes folder, because that model belongs
* to that folder, but where does the Ingredient model belong to? For this, we can create the shared folder in the app folder.
* Shared folder would contain features or elements of our app which are shared across different features. Like ingredient, which
* we're going to use both in the shopping-list and recipe section.
*
* Remember: The objects that are instanciate from a class are type of that class not type of objects of that class. So here
* an ingredient object is type of Ingredient which is the name of class not ingredient. */

import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomatoes', 10)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
