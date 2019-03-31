import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DespesaPage } from './despesa.page';
import { NovaDespesaPage } from '../nova-despesa/nova-despesa.page';
import { TelaDespesaPage } from '../tela-despesa/tela-despesa.page';

const routes: Routes = [
  {
    path: '',
    component: DespesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DespesaPage, NovaDespesaPage, TelaDespesaPage],
  entryComponents: [NovaDespesaPage, TelaDespesaPage]
})
export class DespesaPageModule {}
