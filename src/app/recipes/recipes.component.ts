import {Component, OnInit, Input, OnDestroy, HostListener} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent  {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  // ngOnInit(): void {
  //
  //   /* You can name that recipe arg whatever you want. Because basically we're getting the data which prop of
  //   * that service which is recipeSelected is emitting.*/
  //   this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
  //     this.selectedRecipe = recipe;
  //   });
  // }

  // ngOnDestroy() {
  //   this.recipeService.recipeSelected.unsubscribe();
  // }
}
