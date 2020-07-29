import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* This is a good place to retreive the id of route. */
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (params['id'] !== undefined) {
        this.editMode = true;
      }
    });
  }

}
