import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

/* recipes: Recipe[] = ...; means the recipes would be an array of Recipe objects.
When you are saying: new Recipe() , actually you're calling the constructor of that class. So in the (), we need to pass
* the arguments which that constructor expects.  */

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'some description', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'),
    new Recipe('A test recipe2', 'some description2', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'),

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
