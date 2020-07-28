import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

/* The default matching strategy of router for the path is it will see if the provided path is the prefix of current path  */
const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/recipes'},
  {path: 'recipes', component: RecipesComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
];

/* We use @NgModule to transform this normal ts class into an angular module. */
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],

  /* We want to use this module in app.module.ts , so we need to export this module. So we used exports prop. */
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
