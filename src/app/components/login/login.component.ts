import { ChatService } from './../../providers/chat.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent  {

  constructor( private chatService: ChatService) { }

  ingresar(provedor: string) {
    this.chatService.login(provedor);

  }

}
