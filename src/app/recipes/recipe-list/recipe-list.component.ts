import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from "../recipe.service";

/* recipes: Recipe[] = ...; means the recipes would be an array of Recipe objects.
When you are saying: new Recipe() , actually you're calling the constructor of that class. So in the (), we need to pass
* the arguments which that constructor expects.  */

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  /* I commented this prop out, because we would receive it from recipe.service file. So for receiving it, first we provide
  * an arg in constructor() of this class which it's name doesn't matter but the TYPE of the service class is crucial to specified
  * and then we can use that service instance (not class because angular will automatically instantiate that service in these
  * situations) in all over of this file. In this case we call a method on instance of the service that we provided here in
  * ngOnInit(). */
  // recipes: Recipe[] = [
  //   new Recipe('italian spaghetti', 'some desc 1', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'),
  //   new Recipe('delicious soup', 'some desc 2', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'),
  // ];
  recipes: Recipe[];

  /* In this property, we create another custom property to emit the event that was itself emitted from the child component of
  * this component. */
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected (recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

}
