import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  public titulo: string
  public imagenPrev: string
  constructor(private viewCtrl:ViewController,
              private camera: Camera) {
  }

  cerrarModal(){
    this.viewCtrl.dismiss()
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.imagenPrev = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
        console.log('Error en camara', JSON.stringify(err))
    });
  }
}
