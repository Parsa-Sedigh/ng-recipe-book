import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

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
    /* Here, we want to save the new recipe in array of recipes or update the existing one. So let's create 2 methods in service
    * which are addRecipe and updateRecipe. So we must check if we are in edit mode or not. So with that, we can decide we must
    * call which method of recipe.service .
    * Currently, we can add and get a list of recipes, we return a copy with the slice() method in getRecipes() . Therefore,
    * that is not the same array that we're using in our component as we're storing in this recipe service. So the recipes
    * array that we're updating is not reflected in our components. So we can simply use the same approach as we did in
    * shopping list service. So when we edit a recipe, we must reflect it in our website instantly.
    * So let's create recipesChanged Subject and when we call addRecipe() in service file, we must use that created Subject and
    * emit a new value and also in updateRecipe() we must do that too! Now we must go to where we show the recipes which is
    * recipe-list component and in ngOnInit() of that component, we need to listen to that Subject. So whenever the Subject
    * changed, that component will listen to those recipes changes and show them. So if we have some changes in recipes,
    * in subscribe() to that Subject we know that we would eventually receive an array of recipes.
    * Now when we update a recipe or add a new recipe, that recipe would be appear in somewhere else (recipe-list component) too!
    * */
    const newRecipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath,
    this.recipeForm.value.ingredients);
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    // this.router.navigate(['../'], {relativeTo: this.route}); OR we can call onCancel() to navigate away
    this.onCancel();
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

  onCancel () {
    /* If we were editing a recipe, by clicking on cancel button, we would go to detail page and if we were in add mode,
    * this method will take us to recipes page.
    * But remember, for this to work, we need to tell angular what is our current route?
    * So we need to include route: Route in constructor() which we already did that. So let's add the second arg of navigate()
    * which is relativeTo. */
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient (index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}



