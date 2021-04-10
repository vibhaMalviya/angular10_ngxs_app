import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/template-browser/template-browser.module').then(m => m.TemplateBrowserModule),
        pathMatch: 'full'
      },
      {
        path: 'template/:templateId',
        loadChildren: () => import('./components/deck/deck.module').then(m => m.DeckModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
