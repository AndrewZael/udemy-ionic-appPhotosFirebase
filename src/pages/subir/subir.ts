import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker'
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo'

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  public titulo: string
  public imagenPrev: string
  public img64:string
  constructor(private viewCtrl:ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public cargarArchivo:CargaArchivoProvider) {
  }

  cerrarModal(){
    this.viewCtrl.dismiss()
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 50,
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
    let options:ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagenPrev = 'data:image/jpeg;base64,' + results[i]
        this.img64 = results[i]
      }
    }, (err) => { 
      console.log('Error en selector', JSON.stringify(err))
    });
  }

  crearPost(){
     let archivo = {
        titulo: this.titulo,
        img: this.img64
     }
     this.cargarArchivo.cargarImagenFirebase(archivo)
  }

}
