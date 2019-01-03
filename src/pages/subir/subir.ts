import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo'

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  public titulo: string = ""
  public imagenPrev: string = ""
  public img64:string

  constructor(private viewCtrl:ViewController,
              private camera: Camera,
              public cargarArchivo:CargaArchivoProvider) {
  }

  cerrarModal(){
    this.viewCtrl.dismiss()
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 40,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.imagenPrev = 'data:image/jpeg;base64,' + imageData
     this.img64 = imageData
    }, (err) => {
        console.log('Error en camara', JSON.stringify(err))
    });

  }

  seleccionarFoto(){
    const optionsGallery: CameraOptions = {
      quality: 40,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(optionsGallery).then((imageData) => {
      this.imagenPrev = 'data:image/jpeg;base64,' + imageData
      this.img64 = imageData
     }, (err) => {
         console.log('Error en camara', JSON.stringify(err))
     });

  }

  crearPost(){
     let archivo = {
        titulo: this.titulo,
        img: this.img64
     }
     this.cargarArchivo.cargarImagenFirebase(archivo).then(()=>this.cerrarModal())
  }

}
