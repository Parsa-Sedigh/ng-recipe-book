import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";

/* Since we are injecting a service into a service, we need to use @Injectable() to the service we are injecting sth in it.
* Which in this case is data-storage service. */

/* This file is really about our application data. */

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
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
  fetchRecipes() {
    // this.authService.user.subscribe().unsubscribe(); and ... OR:
    /*
    I commented out these 2 operators, because right now we are using these in interceptor.

    return this.authService.user.pipe(


     Here, we get the user object but only once and we don't need to manually unsubscribe() .
     Also remember: In fetchRecipes() we want to return the http request observable. So if you want to move the
     return this.http.get()...; to inside this callback, we get a problem. Because we are in subscribe() of an observable
     and in there we create yet another observable if we move that http request here.
     In the end we want to return the observable of http request but returning it from inside of callback of subscribe()
     doesn't work. Because we want to return sth from fetchRecipes() not sth from this subscribe. So if you return sth from this
     callback instead of returning it from the level of fetchRecipes() therefore, fetchRecipes() won't return anything. Because
     you aren't return anything from it's level but you are returning sth from one of inner levels of this method.
     SO: Important: If you want to return sth from a method, you must return it from it's level not in inner levels of that
          method.
     The solution is we can pipe these 2 observables(the user observable and http request observable) together into a big
     observable. So let's add another operator after take(1) , which is exhaustMap(it's name is strange!). This operator waits
     for the first observable(in this case user observable) to completes which will happen after we took the latest user.
     Thereafter, it gives us the user in exhaustMap() .
     Learn: So in exhaustMap() we get the data from the previous observable and then we need to return a new observable inside
      that exhaustMap() , which that returned observable will replace our previous observable(in this case user obs) in that
      entire obs chain.
      So we start with user obs and once we're done with that, it would replaced by the inner obs which we return it inside
      of the callback we pass to exhaustMap() .

      So first now let's move: return this.http.get<Recipe[]>('https://ng-recipe-book-44baf.firebaseio.com/recipes.json')
      into the callback of exhaustMap() .
      Learn: Also because by using exhaustMap() the obs that we return inside exhaustMap() would replace the first obs when
       the first obs is completed, therefore we can place the pipe operators of the second obs after the exhaustMap() operator.
      So I move map() and tap() after exhaustMap() . Why this is working?
      Because when we arrive to exhaustMap() , the second obs would replace the first one and therefore it has it's own operators
      which start after exhaustMap() operator, so the second obs won't use the operators which are before exhaustMap() .

      Now, let's get rid of subscribing() to this http obs, because we are subscribing to it in the header component.
     (Why latest? Well, because it's a subject and it updates when we use next()).

     So here, in the end, the fetchRecipes() method would return the http obs although in the first place we are looking to
     user obs. Because we switch that user obs in the exhaustMap() operator.
     So here, we get the user object only one time and then unsubscribe to that obs by using take(1) and then automatically replace
     that user obs with a new obs by using exhaustMap() .

     Now let's extract the token out of user obj. But how do we add that token to the request in the way that firebase requires
     it?
     Well for firebase and the realtime database rest API for firebase, we add the token as a query parameter which is in the URL.
     For other APIs, you may add that token in the header of the request instead of a query param.
     Now to add a query param, we have 2 approaches. First one is we can do it manually to add a ? and then the parameter name
     has to be auth(firebase needs that name with auth name) and value of that param is the user token(which firebase sent to
     us).
     The second approach is we add a second arg to get() method which is an object and ... .

     Now what if that token for some reason would be undefined?
     If that happens, we wouldn't have a big problem, our request would just fail. But we will also add some code to automatically
     log out the user when his token is expired, so we shouldn't even get into such a situation. What if the token is undefined
     and even it wasn't expired? That would never happen because the user must first be authenticated and gets a token to be
     able to fetch recipes and the only possibility for haven't a token is expiration of token.

     Now we can send the fetchRecipes http request with token attached to it.

      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-44baf.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        )
      }),
      */
    return this.http.get<Recipe[]>('https://ng-recipe-book-44baf.firebaseio.com/recipes.json').pipe(map(
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
      }));

    // .subscribe(
    //   (recipes) => {
    //      this.recipeService.setRecipes(recipes);
    //   }
    // );
  }
}



