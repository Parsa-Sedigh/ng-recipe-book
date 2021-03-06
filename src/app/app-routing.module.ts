import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
// import {RecipesComponent} from "./recipes/recipes.component";
// import {ShoppingListComponent} from './shopping-list/shopping-list.component';
// import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
// import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
// import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
// import {RecipesResolverService} from "./recipes/recipes-resolver.service";
// import {AuthComponent} from './auth/auth.component';
// import {AuthGuard} from "./auth/auth.guard";

/* By using pathMatch: 'full' in the first route, we're saying: only redirect us to specified route, if the FULL path is empty.
So we won't redirect to '/recipes' on any other path. Because the current path must be EXACTLY(FULL) '' to redirect us to '/recipes'.

These 2 routes have the same component to load if we reach them but don't worry, in the code of that RecipeEditComponent we would
determine whether we are in 'new' router or in ':id/edit'.
path: 'new', component: RecipeEditComponent },
{path: ':id/edit', component: RecipeEditComponent }

If we try to visit '.../recipes/new' , we would get an error. Because angular failed to get a recipe with id of new !
That's because the order of our routes when we define the routes are incorrect. Because it will try to parse new as an id!
Because the route with dynamic id parameter comes before the route definition where we have 'new' hardcoded into the path.
So because {path: ':id', component: RecipeDetailComponent} is came before {path: 'new', component: RecipeEditComponent } .
So we must switch the order of these two routes.*/
const appRoutes: Routes = [
  {path: '',  redirectTo: '/recipes', pathMatch: 'full'},
  // I moved these to recipes-routing.module:
  // {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
  //     {path: '', component: RecipeStartComponent},
  //     {path: 'new', component: RecipeEditComponent },
  //     {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
  //     {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  // ]},
  // {path: 'shopping-list', component: ShoppingListComponent},
  // {path: 'auth', component: AuthComponent}

  /* This won't work in newer angular versions:
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'} */
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

/* We use @NgModule to transform this normal ts class into an angular module. */
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],

  /* We want to use this module in app.module.ts , so we need to export this module. So we used exports prop. */
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
