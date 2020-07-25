import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  /* @Input() allows us to bind this property from outside */
  @Input() recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected() {
    // this.recipeSelected.emit(event);
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
