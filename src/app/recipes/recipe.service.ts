/* We manage our recipes in this file.
*  Now let's bring the recipes array from recipe-list.component.ts file to this file and then make it private. But now
* we can't access this array from outside so let's define a method which return this array so we can access that array
* from outside.
* But now if you return recipes array like this: return this.recipes;
* Currently you're returning a direct reference to this array and since arrays and objects are reference types, if we change
* this array in somewhere else. This array in this file would also be changed. Therefore I called .slice() when we're returning
* this array in it's getter.
* .slice() will return a new array which is an exact copy of that array which we have in this file. So therefore we can't
* REALLY access this recipes array from outside instead we would only change the copy of it.
*
* Important: Now we must add our services to a place in our app to provide them, therefore we can inject them. But the question
*  is where we should provide these services? For now let's provide recipe service in recipes.component.ts file because we can
*  always put them somewhere else in future if we recognize that we want access them from another part in our app.
*  So now if you provide this service in recipes.component.ts , that component and all childes of that component will share
*  the same instance of this service we provided. But you won't be able to access the service or at least the same instance
*  of this service which from outside of recipe component (it's sibilings or it's parents) can't be accessed.
*
* Now we're managing recipes in a central place. */
/* Right now we have a long chain of @Input() and @Output() which are getting the selected item from the recipe-item component
* over to recipe-list component and then to recipes component and then to recipe-detail component. So that is a super long
* way for just informing another component that we selected an item but we can do better.
* From recipe-item component we can directly inform recipe-detail component. So in recipe-item we don't want to emit an
* event to inform it's parent about the selected item. So I commented @Output() line and a line in onSelected() method, instead
* we want to call a method IN recipe.service which will then transfer data (the recipe that was selected) for us.
* So originally we were passing the data from recipe-component to it's parent and ... . But now we want to pass that data
* from recipe-component to the service method and this service will do the job(informing the recipe-detail about the
* recipe that was clicked) for us.
*
* For doing this task, I created a property in this service named recipeSelected with public accessor and this property would
* be a custom event (event emitter) which it's responsibility is to emit the data it got from recipe-item to recipe-detail
* component.
* REMEMBER: For sending some data out of a component or a service we must create a property which would be a custom event
* and then on that prop we can use emit() method to emit or output the data we want to . HOW?
* Simply we put that custom event in () in html template of the component that wants to get the data that this event emits and
* execute some code in "" which would get the $event variable.
* Learn: By default, properties and methods of a class are public.
* YEAH. You could make recipeSelected private and then create a getter for accessing this property undirectly from outside.
* Because right now it is public and we can directly accessing it from outside.
*
* Now we must go to recipe-item component (the component where it must pass the data to service) and add the property of service
* which is a custom event that would emit the data for other component, to constructor() of recipe-item . Then in the method
* that executes after click happens in recipe-item component, we must get the $event and pass it to .emit() which is available on
* custom event property of the service that we imported in recipe-item.
* Now you can go to parent components of recipe-item and delete that huge chain of inputting and outputting data to communicate
* between components.
*
* Now we must pass the data that we get from recipe-item (which first was passed from recipe-item to recipe.service) to the
* recipes component, so by doing that, in recipes component we can correctly decide whether we do have a selected recipe
* and should therefore render the recipe-detail component or we must still show that template with "please select a recipe" text.
* So as a side not, we COULD pass the data from recipe service to recipe-detail component directly and without passing data first
* to recipes component and then to recipe-detail, but we need to decide whether show the selected recipe or not? Because currenly
* we are instantiating recipe-detail component in the recipes component.
*
* Learn: For doing that decision, first we need to import the recipe service into recipes component. For doing this import,
*  first we need to create an arg in constructor() of recipes component (the component that we want to import service inside it),
*  the name of arg doesn't matter, but what is matter is that the type of that arg must be the service class. Then you must
*  store that arg which has a instance of that service, into a property of that component OR you can use the shortcut by
*  providing the accessor of that arg and it would store it in a property with the same name of arg and initialize it with the
*  arg itself like: this.<arg> = <arg>;
*  Now we provided the recipe service inside that component and since we did this, that component and all of it's children
*  would use the same instance of recipe service (but of course you must add an arg of that service and initialzie it with a prop
*  in children of this component to be able to use that service in those children, but all of them would share the same instance
*  of that service like their parents), which this concept that all of them share the same instance is important.
*  Because otherwise, the service where we emit the event would be a different one from the service which we listen to it
*  so I would never get informed about the event. But here it would work because we're using the same instance.
*  Now we provided the recipe service inside that component, we can setup the listener to the custom event in service.
*  For listening or in other words GETTING the data that the service was emitted, we use .subscribe() on the custom event prop of
*  instance of that service. So in that component where must get the data that service's custom event emitter we used .subscribe() in
*  ngOnInit() and get informed about the recipe which was clicked. So we used .subscribe() on property of that service which
*  that prop is a custom event and would give us the data we want and that data would be a recipe that was selected. For
*  getting that data,
*
*  Now we have the same behavior of app as before but with less code and without that chain of inputting and outputting data and
*  now we are doing it by using services for communicating between components of app. So now we don't have to create a huge chain
*  of event and property binding for communicating between components.
*
*
* Learn: It's better to first write the import that are stuff from angular built-in modules and files and THEN import stuff
*  which are kind custom.
*
*   */
/* When you need to add something which is the type of a class, you must instantiate that thing. So for example here we instantiate
* a new instance of Ingredient model. */
/* Now we want to add recipes to shopping list. For this, first we must create a click event in recipe-detail component on the
* <a>To Shopping List</a> and I also removed the href property from this element and then when click event happens on that element,
* we execute onAddToShoppingList() method and in this method we need to either get access to shopping-list service or recipe service.
* If you first communicate with recipe service, after sending data to recipe service, then you must send data to shopping-list service.
* Because we want that data ends up in shopping-list. But you can also directly with shopping-list service too and go a shorter
* way. But I will choose the route where we use the recipe service and then shopping-list service.
* So for communicating to recipe service, first we need to import that service by creating an arg for getting an instance of that
* service in () of constructor of that recipe-detail component.
* After importing the recipe service in recipe-detail component, we need to add a method in recipe service which is named
* addIngredientsToShoppingList() method and we will pass the ingredients from recipe-detail component to this service.
* Now we must call this addIngredientsToShoppingList() method of service in onAddToShoppingList() method of recipe-detail component.
* Now we are passing the data from recipe-detail component to recipe service. Now we need to access shopping-list service from
* recipe service. So we want to import or inject shopping-list service into this service, so we added @Injectable() to this service.
* Now we can import the shopping-list service in this service by creating an arg for getting the instance of shopping-list service
* in () of constructor() of recipe service.
* Now we have access to shoppingList service. So for sending the data that we received from recipe-detail component to
* shoppingList service, let's create a method in shoppingList service. Because that method*/

import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('italian spaghetti', 'some desc 1',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [new Ingredient('tomato', 2), new Ingredient('bread', 4)]),
    new Recipe('delicious soup', 'some desc 2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
      [new Ingredient('buns', 1), new Ingredient('meat', 7)]),
  ];

  recipesChanged = new Subject<Recipe[]>();

  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  constructor(private slService: ShoppingListService) {}

  getRecipes () {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList (ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  /* I created this method, so other components or services or ... , can get the recipes which are stored in this file. */
  getRecipe (index: number) {
    /* We called slice() here because by using this method, we would get a copy of the array.Though it won't be a deep copy,
    * so the object still are the same anyways. So you can also directly return the object like the code.
    * You could of course also create a had copy of the object with Object.assign() . */
    // return this.recipes.slice()[index];
    return this.recipes[index];
  }

  /* Because we have some duplication when using this.recipesChanged.next(this.recipes.slice()); in 2 methods, you can
  * create a private method for this line of code and then call that method in these 2 methods. */
  addRecipe (recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe (index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe (index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
