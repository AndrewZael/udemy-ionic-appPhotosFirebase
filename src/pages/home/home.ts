import { Component } from '@angular/core'
import { ModalController } from 'ionic-angular'
import { SubirPage } from '../subir/subir'
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo'
import { Observable } from 'rxjs/Observable'

//Compartir
import { SocialSharing } from '@ionic-native/social-sharing'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>
  more:boolean = true
  //items: Array<any[]> = []
  //lastkey:any = ''

  constructor(private modalCtlr:ModalController,
              private cargaArchivoProvider: CargaArchivoProvider,
              private socialSharing:SocialSharing) {
  }

  /*getData(){
    this.afDb.list('post', ref => ref.limitToFirst(2)).valueChanges().subscribe(res => {
      res.forEach( (item:any) => {
          this.items.push(item)
      })
    })
  }

  
  getMoreData(end:string){
    this.afDb.list('post', ref => ref.limitToFirst(2).orderByKey().startAt(end)).valueChanges().subscribe(res => {
      res.forEach((item:any) => {
          this.items.push(item)
      })
    })
  }*/

  compartirFacebook(item:any){
      this.socialSharing.shareViaFacebook(item.titulo, item.img, item.img).then(
        ()=>{
           this.cargaArchivoProvider.mostrarToast('Imagen compartida exitosamente')
           console.log(item.titulo)
           console.log(item.img)
      }).catch((err)=>{
         console.log('Error: '+ err)
      })
  }

  mostrarModal(){
    let modal = this.modalCtlr.create(SubirPage)
    modal.present()
  }

  doInfinite(infiniteScroll){
    setTimeout(()=>{
      this.cargaArchivoProvider.loadImagenes().then(
        (more:boolean)=>{
          this.more = more
          infiniteScroll.complete();
        }
      )
    },1000)
  }

}
