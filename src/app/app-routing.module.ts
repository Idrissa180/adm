import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'disponibilite/:id',
    loadChildren: () => import('./disponibilite/disponibilite.module').then( m => m.DisponibilitePageModule)
  },
  {
    path: 'formulaire/:id/:startWeek/:endWeek',
    loadChildren: () => import('./formulaire/formulaire.module').then( m => m.FormulairePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
