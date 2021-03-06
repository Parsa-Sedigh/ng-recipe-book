import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /* Initially we want to show recipe so we set the initial value of this property to 'recipe'.
  loadedFeature = 'recipe';
 */
  /* We need to make sure that we store this feature arg. So we store it in loadedFeature which is a property of this class. */
  // onNavigate (feature: string) {
  //   this.loadedFeature = feature;
  //
  // }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
