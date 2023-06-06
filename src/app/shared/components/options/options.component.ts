import { Component } from '@angular/core';
import { OptionsStateService } from './models/options-state.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {


  constructor(public optionServices: OptionsStateService) { }

  handleSearch() {
    this.optionServices.setSearch();
  }
}
