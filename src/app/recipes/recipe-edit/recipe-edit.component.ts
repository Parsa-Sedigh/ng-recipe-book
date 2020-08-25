import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  /* In this component, we should receive the id parameter from url and also we must determine whether we are in edit mode or
   not. So we created a prop named editMode and we're checking this, whenever the parameters change by subscribing to
   params observable.
   For determining that, we can check if we got id parameter in route or not. Because id in params, will only be not undefined
   if we're in edit mode*/

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    /* This is a good place to retreive the id of route. */
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (!isNaN(params['id'])) {
          this.editMode = true;
        }
        this.initForm();
    });
  }

  /* In reactive approach it's crucial that we're in edit mode or new mode? and we do get that information here. But why
   knowing that is crucial?
   Because depending on that mode, we need to pre populate the fields if we are in edit mode or don't pre populate them if we are
   in new or add mode. So let's create a new private method which is initForm() . Because that method is responsible for initializing
   the form. Also the form itself would be a prop which is recipeForm and we will basically build that form with reactive approach in
   initForm method and in {} we pass to new FormGroup() we have to register our controls in that FormGroup .
   So let's say by default the recipeName is an empty string and if we are in edit mode, with some logic we will get that name
   of recipe. But in add mode we don't need because we haven't name of recipe yet!
   So if we are in add mode, the initial value of fields would be an empty string and if we are in edit mode, we would get the
   value of those fields from service and use those values when creating the form in reactive approach.
   Now if we are in edit mode, we need to get the recipe that we're editing. Currently we have the id of recipe we're editing,
   so let's include the recipe.service to use it's method and it's data of recipes to get the recipe we're currently editing.

   Now we should call initForm() to change the values of controls of form, whenever route.params changes. Because that change
   indicates that we reloaded the page(some kind of reload without actual reload!). So that is where we should call initForm()
   method and important: We must call it inside of if() state. Because maybe we reload the page and go somewhere else, therefore
               that method shouldn't be called. Only if the page reloaded and right now have an id param in it's url.

   Now we need to synchronize the created form with the html code of that form.

   The recipeIngredients is initialized with empty array because we don't have any ingredients by default for a recipe. So
   in add mode we won't have any ingredients and in if statement where we check if we are in edit mode or not? We need to actually
   check if we have any ingredients for a loaded recipe or not? Because we could have a recipe that when we created it, we
   didn't give it any ingredient. But other data is required for creating a recipe so we don't need to check for their existance
   in edit mode.
   */

  private initForm () {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          /* We pushed a new FormGroup() into the recipeIngredients array because we want to have 2 controls which will be
           control a single ingredient. So for each ingredient we will push a FormGroup() to array of recipeIngredients and
           then for each of those ingredients, we would have 2 controls which we can rename that ingredient or change the
           amount of each ingredient with those 2 controls.

           recipeIngredients is a new FormArray() that we assigned that new FormArray() to that variable so we directly use
           recipeIngredients when creating the recipeForm.

           Now we need to synchronize the ingredients control with html code.
           Important: For synchronizing a FormArray() with html code, first we need to add formArrayName directive on the
            <div> or the element which WRAPS the place we want to output the FormArray.
           Now we are able to output the array of controls or FormArray, in the area which that element that we used
           FormArrayName directive on it, wraps that area.
           After using formArrayName directive on wrapper element, you must place formGroupName directive. Because IN THIS
           CASE we have a formGroup in FormArray too! and you must bind that directive to each formControl that we get from
           looping through the FormGroup. Also you need to use ; let i = index , when using *ngFor for looping through the
           FormGroup. Because the name of each formGroup in the formArray is actually the index of that formGroup in that formArray.
           So we use that i to specify each formGroup. So for value of [formGroupName] , we use i.
           Now we need to use formControlName on each input we have in html. Because in this case, we have 2 controls in each
           formGroup which those fromGroups are inside a FormArray.
           Important: Now you can declare a getter of those controls which are in FormArray and you want to output them in html.
            Which in that getter, we return the controls of that FormArray.
            Now you can use that getter with *ngFor.

           Remember: Adding an ingredient itself is not required for a recipe. But when you do add an ingredient, you must
           provide it's name and amount of that ingredient. */

          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,

              /* Important: We DO EXECUTE this pattern validator because it acts like a factory and it gives us back the
              *   configured validator which that configured validator will be used by angular. But to configure that
              *   validator, we need to pass an argument, right?! We need to tell that what should be our pattern?
              * Also we have to duplicate these 2 validators to onAddIngredient() , because well these validators also need to
              * be , when we are adding new ingredeients and not just when we are loading the existing ingredients of that
              * recipe. (Because the existing ingredients can be edited too and we need those validators there too.)*/
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  get controls () {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient () {
    /* We want to add a new control to array of controls.
    * We know that this.recipeForm.get('ingredients') would be of type FormArray (we indeed know that!), but angular or
    * in precise, typescript, doesn't know this. So we must explicitly cast that into type of FormArray.
    * Also don't forget to add type="button" for the button that isn't used for submitting the form.*/
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }
}



