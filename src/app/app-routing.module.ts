import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenucadastrosComponent } from './menucadastros/menucadastros.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent },
  { path: 'cadastros' , component: MenucadastrosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
