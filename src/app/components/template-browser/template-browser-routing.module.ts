import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateBrowserComponent } from './template-browser.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateBrowserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateBrowserRoutingModule { }
