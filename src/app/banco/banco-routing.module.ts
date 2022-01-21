import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  
  {path:  'bancos/cadastro', component: CadastroComponent},
  { path: 'bancos/cadastro/:id', component: CadastroComponent},
  { path: 'bancos/lista', component: ListaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
