import { Mensaje } from "./../interfaces/mensaje.interface";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
// para realiza la autenticacion
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario : any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {

       // Este es un obsevable que permite verificar el estado
      this.afAuth.authState.subscribe( user => {
        if(!user){ return;}
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        console.log("El nombre que se maneja en google es: ",this.usuario.nombre);
        // EL UID es único para todo lo que utilce este usuario en google
        console.log("El UID del usuario es: ",this.usuario.uid);
      });

  }

  login( provedor: string) {
    if(provedor ==="google"){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }


  }
  logout() {
    // se debe restaurar el objeto usuario para que quede vacio
    this.usuario = {};
    console.log("logout");
    this.afAuth.auth.signOut();
  }


  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>("chats", ref =>
      ref.orderBy("fecha", "desc").limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    // retorna una promesa
    // si se inserta hace el then y si no hace el catch
    // al hacer return se puede hacer el then y el catch en cualquier lado.
    return this.itemsCollection.add(mensaje);
  }
}
