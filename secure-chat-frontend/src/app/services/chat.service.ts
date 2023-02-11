import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { JwkKey } from '../interfaces/JwkKey.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: any) {
    this.socket.emit('sendMessage', msg);
  }

  integrateChat(id: string): Promise<any> {
    return this.socket.emit('subscribeToSocket', id);
  }

  sendChatRequest(senderId: string, requestedId: string) {
    return this.socket.emit('sendChatRequest', {
      id1: senderId,
      id2: requestedId,
    });
  }

  sendPublicKey(targetId: string, publicKey: JwkKey) {
    this.socket.emit('sendPublicKey', {
      targetedClientId: targetId,
      publicKey: publicKey,
    });
  }

  targetNotFoundResponse() {
    return this.socket.emit('respondToRequest', {
      response: 'targetNotFound',
    });
  }

  declineRequest(targetId: string) {
    return this.socket.emit('respondToRequest', {
      targetId: targetId,
      response: 'no',
    });
  }

  acceptRequest(senderId: string, targetId: string) {
    return this.socket.emit('respondToRequest', {
      targetId: targetId,
      clientId: senderId,
      response: 'yes',
    });
  }

  updateClientSocketId(clientId: string) {
    return this.socket.emit('updateClientSocketId', clientId);
  }

  onChatRequestResponse() {
    return this.socket.fromEvent('recieveRequestResponse');
  }

  onConversationRequest() {
    return this.socket.fromEvent('recieveConversationRequest');
  }

  onMessageRecieve() {
    return this.socket.fromEvent('recieveMessage');
  }

  onClientSocketIdUpdate() {
    return this.socket.fromEvent('onSocketIdUpdate');
  }

  onPublicKeyRecieve() {
    return this.socket.fromEvent('recievePublicKey');
  }
}
