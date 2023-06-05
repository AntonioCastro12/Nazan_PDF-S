import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogManagerComponent } from './log-manager.component';
import { LogListComponent } from './pages/log-list/log-list.component';

const routes: Routes = [{ path: '', redirectTo: 'list', pathMatch: 'full' }, {
  path: '',
  component: LogManagerComponent,
  children: [
    { path: 'list', component: LogListComponent },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogManagerRoutingModule { }
