import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from 'firebase'
import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular'
import { Observable } from 'rxjs';


@Injectable()
export class CargaArchivoProvider {

  images:ArchivoSubir[] = []
  lastkey:string = null

  constructor(public toastCtrl: ToastController,
              public afDb:AngularFireDatabase){
              
                this.loadLastkey().subscribe( () => this.loadImagenes() )

  }

  private loadLastkey(){
    return this.afDb.list('/post', ref=> ref.orderByKey().limitToLast(1))
              .valueChanges()
              .map( (post:any) => {
                console.log(post)
                this.lastkey = post[0].key
                this.images.push(post[0])
            })
  }

  loadImagenes(){
    let promesa = new Promise( (resolve, reject) => {
      this.afDb.list('/post', 
          ref=>ref.limitToLast(2)
                  .orderByKey()
                  .endAt(this.lastkey)
      ).valueChanges()
       .subscribe( (posts:any)=> {
          posts.pop()
          if(posts.length == 0){
            this.mostrarToast('Fin de los registros')
            resolve(false)
            return
          }

          this.lastkey = posts[0].key
          for(let i = posts.length-1; i >=0; i--){
              let post = posts[i]
              this.images.push(post)
          }
          
          resolve(true)

       })
    })

    return promesa
  }

  cargarImagenFirebase(archivo:ArchivoSubir){
    let promesa = new Promise((resolve, reject) =>{
       this.mostrarToast('cargando...')
       let storeRef = firebase.storage().ref()
       let nombreArchivo:string = new Date().valueOf().toString()
       let uploadTask:firebase.storage.UploadTask = 
           storeRef.child(`img/${nombreArchivo}`)
                   .putString(archivo.img, 'base64', {contentType: 'image/jpeg'})

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                  ()=>{

                  }, // saber % Mbs se han subido
                  (error) => {
                    //manejo error
                    console.log('Error en la carga', JSON.stringify(error))
                    this.mostrarToast(JSON.stringify(error))
                    reject()
                  },
                  ()=>{
                    //Todo ok
                    this.mostrarToast('Imagen cargada correctamente')

                    uploadTask.snapshot.ref.getDownloadURL().then((downLoadUrl)=>{
                       this.crearPost(archivo.titulo, downLoadUrl, nombreArchivo)
                    })
                    
                    resolve()
                  }
              )
    })
    return promesa
  }

  mostrarToast(message:string){
   this.toastCtrl.create({
       message: message,
       duration: 2000
    }).present()
  }

  crearPost(titulo:string, url:string, nombreArchivo:string){
      console.log(url)
      let post:ArchivoSubir = {
            img: url,
            titulo: titulo,
            key: nombreArchivo
      }
      this.afDb.object(`/post/${nombreArchivo}`).update(post).then(()=>{
          console.log('Good')
      },
      (err)=>{
        console.log('ERROR: '+ err)
      })

      this.images.push(post)
  }

}

interface ArchivoSubir{
  titulo:string
  img: string
  key?:string
}
