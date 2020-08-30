import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

/* This resolver will run some code which that code loads some recipes eventually. */
@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* In this method the goal is to return either an array of recipes which we can't do it, because we need to load it first.
     Or an observable which in the end will yield an array of recipes and that is sth we can offer. For doing that, in
     fetchRecipes() of data-storage service, currently we are subscribing to it right there, so we can change it a little bit
     because of this case. So we don't want to subscribe right there, but we also still want to load or set the recipes that
     we get from fetchRecipes too. So what we can do is that we can use a tap() operator before we subscribing to that http call.
     So I commented out some codes in that method. So instead of using setRecipe() in subscribe() of that method, we are doing
     it in tap() operator of that method. So like nothing is changed!
     Now we don't want to subscribe() to that http call in service file anymore. (That's why I use tap() to put the code which
     was in subscribe() to tap() . Because that code wasn't really altering some data and we can do that code in tap() operator too.)
     Now, because we aren't subscribing to that http call directly in fetchRecipes which is in service file, we need to subscribe
     to it in header component. But first, we need to use return in that fetchRecipes() to return an observable from that method
     in order to be able to subscribe() to that method in other files.

     Important: We are not subscribing to fetchRecipes() in this file, because the resolver which is an angular feature, will
      subscribe() for us to basically find out once the data is there.

     So now we have a valid resolver which loads the recipes before this page is loaded.
     Right now if you fetch data and then go to details of one recipe and then refresh, we still get an error.Because we are not
     applying the resolver.

     So for applying the resolver service we need to apply it on some paths, so we go to app-routing.module file where we
     have 2 paths(':id' and ':id/edit') which are rely on a recipe being loaded and on the object paths we want to apply
     a resolver service, we need to add the resolve key or property. The resolve key is an array of resolvers.

     Now angular will run this resolver before loading those routes and by using this resolver, we fetch that recipe again in order
     to prevent that recipe to be gone after another refresh, when we are on that recipe.

     Important: So what we do in the end with resolvers, is we run fetchRecipes() or any code in resolve() method of
      resolver service, WHENEVER the routes that we use this resolver with them, gets loaded. That is the purpose of resolvers.

     IMPORTANT: YOU MUST return the result of fetchRecipes() here. Because fetchRecipes() return sth in it's definition, therefore
      you must return the result of fetchRecipes() method.*/

    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      /* Return the recipes we have at this moment without fetch them again. */
      return recipes;
    }
  }
}


