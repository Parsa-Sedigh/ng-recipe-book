import { Component, OnInit } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  // onSelect (feature: string) {
  //     this.featureSelected.emit(feature);
  // }

  onSaveData () {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    /* We don't want to do anything with result of calling fetchRecipes() here. So we can just use subscribe() to it and in that
    * subscribe() we can do nothing. */
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

}
