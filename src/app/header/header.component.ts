import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user => {
      /* If we are not logged in, the user object would be null and if the user object exists, we are logged in. So let's
      create a property in this class named isAuthenticated.
      Now let's assign the isAuthenticated prop to the result of checking: !user ?
      In that ternary operator, we are checking if we haven't a user, then the result of ternary operator would be false but
      otherwise the result would be true and we are assigning this.isAuthenticated to result of this ternary operator.

      Learn: OR for shortcut of !user ? false : true; we can say: !!user
       By using !!user we CHECK if we have not a user(so we are checking !user) which would be true if
       the user is null and !user would be true if we have a user. But this is the opposite of what we need, hence I added
       an extra ! mark to inverse the value of !user.
       So if we have user, the result of !!user would be true and if we haven't user, the result of that would be false.

      Now let's use this isAuthenticated prop to update the UI based on that prop.
      this.isAuthenticated = !user ? false : true;  */
     this.isAuthenticated = !!user;
   });
  }

  // onSelect (feature: string) {
  //     this.featureSelected.emit(feature);
  // }

  onSaveData (): void {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    /* We don't want to do anything with result of calling fetchRecipes() here. So we can just use subscribe() to it and in that
    * subscribe() we can do nothing. */
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  onLogout () {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
