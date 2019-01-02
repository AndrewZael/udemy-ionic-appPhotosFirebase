import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from 'firebase'
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  constructor(public toastCtrl: ToastController){

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
                    console.log('Archivo subido')
                    this.mostrarToast('Imagen cargada correctamente')
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

}

interface ArchivoSubir{
  titulo:string
  img: string
  key?:string
}