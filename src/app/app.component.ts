import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* Initially we want to show recipe so we set the initial value of this property to 'recipe'. */
  loadedFeature = 'recipe';

  /* We need to make sure that we store this feature arg. So we store it in loadedFeature which is a property of this class. */
  // onNavigate (feature: string) {
  //   this.loadedFeature = feature;
  //
  // }
}
