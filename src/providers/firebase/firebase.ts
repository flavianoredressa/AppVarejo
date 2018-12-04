import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

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
  getAllFilter(colectionName, filter1, filter2) {
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
  getAllFilterMenos(colectionName, filter1, filter2) {
    const collection = this.afs.collection(colectionName,
      ref => ref.where(filter1, "<", filter2));
    const collection$ = collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;
  }
  getAllFilter2(colectionName, filter1, filter2,filter3, filter4) {
    const collection = this.afs.collection(colectionName,
      ref => ref.where(filter1, "==", filter2).where(filter3, "<", filter4));
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
    const collection = this.afs.collection("servico", ref => ref.where("tipoServico", "<", tipo));
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
      .snapshotChanges().first()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
    return collection$;

    
  }
  concluir(key,obj)
  {
    return new Promise((resolve, reject) => {
      this.update("chamado", key, obj).then(res => { 
      const collection = this.afs.collection(
        "chamado",
        ref => ref.where("apartamento", "==", obj.apartamento).where("status", "<", 3)
      );
      const collection$ = collection
        .snapshotChanges().first()
        .map(actions => {
          return actions.map(action => ({
            $key: action.payload.doc.id,
            ...action.payload.doc.data()
          }));
        });
      collection$.subscribe((tarefas:any)=>{
        this.getAp(obj.apartamento).first().subscribe(apartamento => {
          if (apartamento && apartamento.length) {
            var status =  0
            if(tarefas && tarefas.find(x=>x.status==1))
            status=1;
            if(tarefas && tarefas.find(x=>x.status==2))
            status=2;
            this.afs.collection("apartamento").doc(apartamento[0].$key).update({status:status}).then(res=>{
              resolve();
            });
          }
          else
          resolve();
        })
      })
    })
    })
  }
  update(page, key, obj) {
    return this.afs.collection(page).doc(key).update(obj);
  }
  updateEdit(page,key, data)
  {
    return new Promise((resolve, reject) => {
    if (page == "chamado" && data.apartamento) {
      this.getAp(data.apartamento).first().subscribe(res => {
        if (res && res.length) {
          var aux = res[0];
          if (data.tipo == 4 ||data.tipo == 5 )
            aux["status"] = 2
          this.afs.collection("apartamento").doc(res[0].$key).update(aux).then(res=>{
            this.afs.collection(page).doc(key).update(data).then(res=>{
              resolve()
            });
          });
        }
        else
        resolve()
      })
    }
  })
  }
  save(page, data) {
    if (page == "chamado" && data.apartamento) {
      this.getAp(data.apartamento).first().subscribe(res => {
        if (res && res.length) {
          var aux = res[0];
          if (data.tipo == 4 ||data.tipo == 5 )
            aux["status"] = 1
          this.afs.collection("apartamento").doc(res[0].$key).update(aux);
        }
      })
    }
    return this.afs.firestore.collection(page).add(Object.assign({}, (data)));
  }
}
