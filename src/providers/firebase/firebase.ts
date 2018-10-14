import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Injectable() 
export class FirebaseProvider {

  constructor(
    private afs: AngularFirestore) {
  }
  login(user, senha) {
    const collection = this.afs.collection(
      "usuario",
      ref => ref.where("cpf", "==", user).where("senha", "==", senha)
    );
    const collection$ = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  getAll(colectionName) {
    const collection = this.afs.collection(colectionName);
    const collection$ = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  getAllFilter(colectionName,filter1,filter2) {
    const collection = this.afs.collection(colectionName,
      ref => ref.where(filter1, "==", filter2));
    const collection$ = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  getByKey(page, key) {
    const collection = this.afs.collection(page).doc(key);
    const collection$ = collection.snapshotChanges()
    return collection$.pipe(map(changes => {
      let collection: any = changes.payload.data();
      collection.$key = changes.payload.id
      return collection;
    }))
  }
  getServico(tipo) {
    const collection = this.afs.collection("servico", ref => ref.where("tipoUsuario", "==", tipo));
    const collection$ = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  getAp(tipo) {
    const collection = this.afs.collection(
      "apartamento",
      ref => ref.where("numero", "==", tipo)
    );
    const collection$ = collection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  update(page, key, obj) {
    return this.afs.collection(page).doc(key).update(obj);
  }
  save(page, data) {
    if (page == "chamado" && data.quarto) {
      this.getAp(data.quarto).subscribe(res => {
        if (res && res.length) {
          var aux = res[0];
          aux["status"] = 1
          this.afs.collection("apartamento").doc(res[0].$key).update(aux);
        }
      })
    }
    return this.afs.firestore.collection(page).add(Object.assign({}, (data)));
  }
}
