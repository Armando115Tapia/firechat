import { Mensaje } from './../../interfaces/mensaje.interface';
import { ChatService } from './../../providers/chat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent  {

  mensaje: string = "";
  constructor(private chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe();
   }


  enviar_mensaje(){
    // console.log(this.mensaje);
    // TODO falta el uid del usuario
    length
      if(this.mensaje.length ===  0){ return ; }

      this.chatService.agregarMensaje(this.mensaje).then( () => {
        console.log("se envio correctamente");
        this.mensaje = "";
      }).catch( (err) => {console.log("problemas al enviar: ", err )});

  }
}
