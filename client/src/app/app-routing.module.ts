import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : '' , loadChildren : () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'home',loadChildren : () => import('./home/home.module').then(mod => mod.HomeModule)},
  {path : '**' , redirectTo :'',pathMatch :'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
