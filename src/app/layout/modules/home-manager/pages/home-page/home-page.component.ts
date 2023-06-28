import { Component } from '@angular/core';
import { AuthStateService } from '../../../auth-manager/services/auth-state.service';
@Component({
  selector: 'app-home-page-compomnent',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent {
  constructor(public authStateService: AuthStateService) {
    this.authStateService.loadUserInfo()
  }

}
