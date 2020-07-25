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
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  /* After using shopping-list service for this file, add button doesn't work anymore. WHY?
 * Because when we call getIngredients() , we only get a slice(or a copy) of ingredients array which is in shopping-list service.
 * Therefore when we add a new ingredient by clicking the add button, which the new ingredient of course won't added to the
 * COPY OF array of ingredients in shopping-list service array but instead it would be added to ORIGINAL ARRAY OF ingredients, but
 * the original array of ingredients is not reflecting to the components but instead it's the copy of ingredients which is passing
 * to the components by using .slice() when we use getIngredients method.
 * So the easiest solution is: We can remove .slice() from getIngredients method. So if you're sure you won't accidently manipulate
 * the original array of ingredients, you can use this solution
 * The second solution is we can inform our component that the new data in ingredients array is available. Why?
 * Because
 *
 * So let's create a new prop in shopping-list service which would be a custom event and then whenever we change the ingredients array,
 * we simply call this ingredientsChanged custom event property and use .emit() on it and pass the original ingredients array to
 * () of emit() therefore we can listen to this custom event in service, and update the copy of ingredients array that we get in
 * components. So therefore after adding ingredient to ORIGINAL ingredients array, we call the ingredientsChanged event which would
 * add the ingredients that were added to ORIGINAL ARRAY of ingredients, to COPY array of ingredients.
 * So now we always have the right ingredients array in the service and then we inform other components about the change in the
 * ingredients array. */
  ngOnInit(): void {
    /* You should add all tasks which require a bit more heavy lifting or in general it's a good practice to do all of
    * initializations in ngOnInit() method. */

    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  /* This method shouldn't live here and it must be in shopping-list service. Because it adds some data to our data which
  * in this case is ingredients and we know that data must be lived in services not components. So I commented out this method
  * and empty out the ingredients props and take them to shopping-list service.
  * Now let's first add the service to providers array for now. Because this shopping-list component is a good place of importing
  * the the shopping-list service because it would share the same instance between itself and it's child components. So let's add
  * this service to providers array of this component FOR NOW. Why for now? Because later we want to access this service from
  * recipes folder too. So instead of adding this to providers array in this component, let's add it to providers array in
  * app.module.ts therefore it would be accessible from whole app(all childes of app.module.ts).
  * Why empty out ingredients prop?
  * Because we want to add the shopping-list service here in this file and that service has all of the ingredients data and we would
  * access those data and assign it to ingredients prop in this file.
  * Learn: So the services till now can do 2 crucial stuff:
  *  1) Getting the data from a component and store that data in a prop of themselves. How?
  *  First we create a prop in the service which holds the data and then we import that service in the component which would
  *  give data to that service and push the data or send the data to service.
  *  2) Component communication. How?
  *  First we create a prop in service which would be an instance of EventEmitter<>() class and then we import the service in the
  *  component which that component would give the data to service by using .emit() on the prop of service and then pass the data
  *  to () of emit() and then in the component which would get the data from other component, we would first import the same instance
  *  of service which we used .emit() on it in the component that gave the data to service, and then add @Input TODO????
  *  */
  // onIngredientAdded (ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //
  //   /* Let's update the COPY array of ingredients array after adding ingredients to ORIGINAL array of ingredients. */
  //
  // }
}
