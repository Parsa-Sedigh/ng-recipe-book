/* .model for the name of this file is optional but it's good to be descriptive, so we can quickly find out what's inside this
* file.
* In this file we define how a single recipe looks like.
*
* We can't store files in our codes! So in this class we can't have a property like image, so we create imagePath prop.
*
* Important: Inside the body of constructor, we have to assign the arguments we receive by instanciating the class to the properties.
*
* It doesn't matter what you name the arguments that you receive when you instanciate the class. */
/* We need to each recipe has some ingredients and thereafter I want to make that "To shopping list" button to work. So we can
* send ingredients to the shopping-list . First we need to add sth to recipe model. So now each recipe must have a property which
* is an array of ingredients. Now we must add this new field to our data in recipe service. */
import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }


}






