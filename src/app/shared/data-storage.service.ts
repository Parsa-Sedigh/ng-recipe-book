import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

/* Since we are injecting a service into a service, we need to use @Injectable() to the service we are injecting sth in it.
* Which in this case is data-storage service. */

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes () {
    /* In this method, we could accept or receive the recipes we want to store as an argument and by importing our Recipe model
   in this file too and then defining the recipe arg must be of type Recipe[] and then in body of this method we can write
   the Http request where we store the recipes in back-end.

   So instead, we can inject the recipes service in this file and then we could directly get our currently loaded recipes from
   that recipe service and therefore by using this approach, we avoid the extra argument for this storeRecipes() method.
   So let's inject the recipe.service file. Now when we get our list of recipes, we can store them in back-end by sending a
   Http request from this service.*/
    /* This line will retreive the list of our recipes which these recipes will TEMPORARILY stored in recipes constant.

     You could definitely send a POST request if we would want to store ONE recipe, but I want to store ALL of my recipes and
     I essentially want to overwrite any previous recipes that I stored and in order to do that, firebase gives us an endpoint
     which we can use by using a PUT request.
     So in firebase we can send a put request to a specific endpoint to overwrite all of the data that is stored under that
     node.
     Now get the url that is shown in realtime database page and then add /recipes.json to end of it.
     .json is firebase characteristic and you have to add it at the end of the url. .json has nothing to do with the data that
     you're sending or has nothing to do with angular.

     /recipes gives us a rest api where in that rest api, we define our own nodes, which those nodes will be translated
     to folders and in those nodes or folders, the data will be stored.

     Now you know that just saying this.http.put() won't send the http request. Instead, that request will only be sent as soon
     as we subscribe to it.

     Learn: Now we have 2 options here. First is we can return our own observable in this.http.put() , by adding return to
       that line and then we can subscribe() to this method which returns an observable, in the component where we are calling this
       storeRecipes() method and in this case, that component would be header component.
       But in this case, we are not interested in this approach, because we don't want to show a loading spinner. Because the
       in this case and in our design, header component won't be interested in whether that request is done or not? Therefore
       there is no need to subscribe() in the component.
       The second approach which we will use is to directly subscribe in the service file and not in component file which is
       using that method in that service.
     Now let's add a click listener in header component and when someone clicks, this method will be called.

      So when you are sending an http request(which you must subscribe to it to make it to send the request), it takes some time,
      so when you are subscribing to http request, you COULD use some spinner or loading.

     */
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://ng-recipe-book-44baf.firebaseio.com/recipes.json', recipes)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  /* After fetching the recipes, we need to set our currently loaded recipes(the recipes that are shown on the screen) to overwrite
   the currently loaded recipes with the recipes that we get from this method. In order to do this, in recipe service we need
   a method that allows us to overwrite the existing recipes which are stored in that service. So let's create setRecipes()

   In this method, typescript doesn't understand that the recipes we would get eventually(because it takes some time) from the
   get request really are an array of Recipe and that makes sense. Because it just understands that in result of GET http request,
   we have the body of http response and that could be anything.
   Important: Therefore to inform TS about the eventual type, we should add generic annotation to get() method which between <>,
    we make clear the type of extracted response body. */
  fetchRecipes () {
    return this.http.get<Recipe[]>('https://ng-recipe-book-44baf.firebaseio.com/recipes.json')
      .pipe(map(
        (recipes) => {
            return recipes.map((recipe) => {
              /* Here we want to return the original recipes but if that recipe doesn't have an ingredients array. In order to
               set an ingredients prop for that recipe to an empty array and for that, let's return a new object (because each
               recipe is an object and inside the anonymous function that we pass to map() , we are working with each recipe.)
               and we use the speared operator to copy all of the properties of each recipe and then add ingredients prop to
               that copied object of what we get in response and for value of that ingredients prop which we add to each recipe
               we get as response, we check that if the recipe that we are processing here, already have an ingredients prop which
               is an array of 0 or more elements in it? and if that is the case, therefore we don't change it. But if that recipe
               doesn't have the ingredients array, we set that ingredients prop to an empty array.

               By adding this, we have a little bit more protection against the unexpected errors of incoming fetched recipes.
               Because now we ensure that the ingredients property of the loaded or fetched recipes is always set to at least
               an empty array.*/
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
         }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
      // .subscribe(
      //   (recipes) => {
      //      this.recipeService.setRecipes(recipes);
      //   }
      // );
  }
}



