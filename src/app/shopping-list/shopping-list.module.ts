import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
// import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    /* I commented this CommonModule out, because by importing the SharedModule, we get access to CommonModule, so there's no need to
    import this CommonModule individually. But it's not really worth it here, because the only thing we really need from the SharedModule in
    this module is the CommonModule and currently we replaced one module import with another bigger module(sharedModule)*/
    // CommonModule,
    FormsModule,
    RouterModule.forChild(  [
      {path: 'shopping-list', component: ShoppingListComponent},
    ]),
    SharedModule
  ],
  exports: []
})
export class ShoppingListModule {

}
