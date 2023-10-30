import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'segment-collaborators-nazan',
  templateUrl: './segment-collaborators-nazan.component.html',
  styleUrls: ['./segment-collaborators-nazan.component.scss'],
})
export class SegmentCollaboratorsNazanComponent {
  constructor(private _template: TemplateStateService) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

<<<<<<< HEAD
  ngOnInit(): void {
=======
  ngOnDestroy() {
>>>>>>> c76eb247992031fc835fcda7a44e9c8c0b1d3549
    this._template.state.sidebarOverlayVisible = false;
  }
}
