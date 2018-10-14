import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class CameraProvider {

  public myPhotosRef: any;
  constructor(
    protected Camera: Camera,
    protected afStorage: AngularFireStorage,
    protected Imagem: ImagePicker) {

    // this.myPhotosRef = firebase.storage().ref('imagens/');
  }

  qualidade(img, MAX, callback) {
    var MAX_WIDTH = MAX;
    var MAX_HEIGHT = MAX;
    var quality = 90;
    var canvas: any = document.createElement("canvas");
    var image = new Image();
    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.height = canvas.width = width > height ? height : width;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl)
    }
    image.src = img;
  }
  getPicture(tipo: any, qualidade: number = null) {
    return new Promise((resolve, reject) => {
      if (tipo == 'Camera') {
        if (Camera['installed']()) {
          return this.Camera.getPicture({
            sourceType: this.Camera.PictureSourceType.CAMERA,
            destinationType: this.Camera.DestinationType.DATA_URL,
            quality: 80,
            targetWidth: 500,
            targetHeight: 500,
            encodingType: this.Camera.EncodingType.JPEG,
            correctOrientation: true,
            allowEdit: true
          }).then((data) => {
            if (qualidade != null)
              this.qualidade('data:image/jpeg;base64,' + data, qualidade, data => {
                resolve(data);
              })
            else
              resolve('data:image/jpeg;base64,' + data);
          }).catch(() => reject())
        }
      } else {
        if (tipo == 'FotoPerfil'){
          return this.Camera.getPicture({
            sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.Camera.DestinationType.DATA_URL,
            quality: 80,
            targetWidth: 500,
            targetHeight: 500,
            encodingType: this.Camera.EncodingType.JPEG,
            correctOrientation: true,
            allowEdit: true
          }).then((data) => {
            if (qualidade != null)
              this.qualidade('data:image/jpeg;base64,' + data, qualidade, data => {
                resolve(data);
              })
            else
              resolve('data:image/jpeg;base64,' + data);
          }).catch(() => reject())
        }
      }
    })
  }
  getImagens(ListaImagens) {
    if (ListaImagens == null) {
      ListaImagens = []
    }
    let options = { maximumImagesCount: 10, width: 500, height: 500, quality: 60, outputType: 1 }
    return this.Imagem.getPictures(options).then(results => {
      for (let i = 0; i < results.length; i++) {
        var achou = false;
        ListaImagens.forEach(element => {
          if (element.img == 'data:image/jpeg;base64,' + results[i])
            achou = true
        })
        if (!achou)
          ListaImagens.push({ img: 'data:image/jpeg;base64,' + results[i] });
      }
      return ListaImagens
    });
  }
  uploadPhoto(myPhoto, fileName, type) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref(type);
      const fileRef = storageRef.child(fileName);
      let imageRef = fileRef.putString(myPhoto, 'data_url')
      imageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

      },(_err) => { reject(_err);},
        () => {
          fileRef.getDownloadURL()
            .then(downloadURL =>{
              resolve(downloadURL)
            })
            .catch(err => reject(err));
        });
    })
  }
  processWebImage(event) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.qualidade(imageData, 400, data => {
          resolve(data)
        })
      };
      if (event.target.files.length > 0)
        reader.readAsDataURL(event.target.files[0]);
    })
  }
}