import { Mensaje } from './../interfaces/mensaje.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
                               map((mensajes: Mensaje[]) => {
                                          console.log(mensajes);
                                          return this.chats = mensajes;

                                        }))
                                      }

  agregarMensaje( texto :string){
        let mensaje: Mensaje = {
          nombre: 'Demo',
          mensaje: texto,
          fecha: new Date().getTime()
        }

        // retorna una promesa
        // si se inserta hace el then y si no hace el catch
        // al hacer return se puede hacer el then y el catch en cualquier lado.
    return this.itemsCollection.add(mensaje);
  }
}
