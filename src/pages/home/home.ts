import { Component } from '@angular/core'
import { ModalController } from 'ionic-angular'
import { SubirPage } from '../subir/subir'

import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  constructor(private modalCtlr:ModalController,
            private afDB: AngularFireDatabase) {
        this.items = this.afDB.list('post').valueChanges();
  }

  mostrarModal(){
    let modal = this.modalCtlr.create(SubirPage)
    modal.present()
    console.log('OK')
  }

}
