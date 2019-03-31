import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Despesa } from 'src/entidades/Despesa';
import { NovaDespesaPage } from '../nova-despesa/nova-despesa.page';
import { DBService } from './../services/db.service';
import { TelaDespesaPage } from '../tela-despesa/tela-despesa.page';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.page.html',
  styleUrls: ['./despesa.page.scss'],
})
export class DespesaPage {

  despesas: Despesa[];
  loading: boolean;

  constructor(private dbService: DBService, public modalCntrl: ModalController, public toast: ToastController) {
    this.init();
  }

  private async init() {
    this.loading = true;
    this.loadDespesas();
  }

  private async loadDespesas() {
    this.dbService.listWithUIDs<Despesa>('/Despesas')
    .then(Despesas => {
      this.despesas = Despesas;
      this.loading = false;
    }).catch(error => {
      console.log(error);
    })
  }

  async add() {
    const modal = await this.modalCntrl.create({
      component: NovaDespesaPage
    })
    modal.onDidDismiss()
      .then(result => {
        if(result.data) {
          this.confirmAdd();
        }
      })
    return await modal.present();
  }

  private confirmAdd() {
    this.presentToast("Despesa Salva.");
    this.loadDespesas();
  }

  remove(uid: string) {
    this.dbService.remove('/Despesas', uid)
    .then(() => {
      this.confirmRemove();
    }).catch(error => {
      this.presentToast("Erro ao remover.");
    })
  }

  private confirmRemove() {
    this.presentToast("Despesa removida.");
    this.loadDespesas();
  }

  async edit(despesa: Despesa) {
    const modal = await this.modalCntrl.create({
      component: TelaDespesaPage,
      componentProps: {
        editingDespesa: Despesa
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if(result.data) {
          this.confirmAdd();
        }
      });

    return await modal.present();
  }

  async presentToast(mensagem: string) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: 2000
    })
  }
}