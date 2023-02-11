import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ConversationService } from 'src/conversation/conversation.service';
import { SharePublicKeyDto } from 'src/crypto/dto/sharePublicKey.dto';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { CreateConversationDto } from '../conversation/dtos/createConversation.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private redisCacheService: RedisCacheService,
    private conversationService: ConversationService,
  ) {}

  @SubscribeMessage('subscribeToSocket')
  async addUserToChat(client: Socket, payload: string): Promise<void> {
    // await this.appService.createMessage(payload);
    this.server.emit('chatConfirmation', client.id);
    const clientItem = await this.redisCacheService.getItem(payload);
    if (!clientItem || clientItem != client.id) {
      this.redisCacheService.setItem(payload, client.id);
    }
  }

  @SubscribeMessage('updateClientSocketId')
  async updateClientSocketId(client: Socket, payload: string): Promise<void> {
    // await this.appService.createMessage(payload);
    await this.redisCacheService.setItem(payload, client.id);
  }

  @SubscribeMessage('sendChatRequest')
  async requestConversation(
    client: Socket,
    payload: CreateConversationDto,
  ): Promise<string> {
    const requestedClientSocketId: string =
      await this.redisCacheService.getItem(payload.id2);
    if (requestedClientSocketId) {
      const requestMessage = payload;
      this.server
        .to(requestedClientSocketId)
        .emit('recieveConversationRequest', requestMessage);
      return 'Request sent successfully';
    } else {
      this.server
        .to(client.id)
        .emit('recieveRequestResponse', { response: 'targetNotFound' });
    }
  }

  @SubscribeMessage('sendPublicKey')
  async sharePublicKey(
    client: Socket,
    payload: SharePublicKeyDto,
  ): Promise<string> {
    console.log('sending public key');
    const requestedClientSocketId: string =
      await this.redisCacheService.getItem(payload.targetedClientId);
    if (requestedClientSocketId) {
      const publicKey: CryptoKey = payload.publicKey;
      this.server
        .to(requestedClientSocketId)
        .emit('recievePublicKey', publicKey);
      return 'Request sent successfully';
    }
  }

  @SubscribeMessage('respondToRequest')
  async respondToChatRequest(client: Socket, payload: any): Promise<void> {
    // await this.appService.createMessage(payload);
    const targetClientId: string = await this.redisCacheService.getItem(
      payload.targetId,
    );

    if (payload.response == 'yes') {
      await this.conversationService.createNewConversation(
        payload.targetId,
        payload.clientId,
      );
      this.server
        .to(targetClientId)
        .emit('recieveRequestResponse', { response: 'yes' });
    } else {
      this.server
        .to(targetClientId)
        .emit('recieveRequestResponse', { response: 'no' });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    // await this.appService.createMessage(payload);
    //Do stuffs
    const targetClientId: string = await this.redisCacheService.getItem(
      payload.targetedUser,
    );
    console.log('sending message: ' + payload.message);
    this.server.to(targetClientId).emit('recieveMessage', payload.message);
    await this.conversationService.addMessage(
      payload.sendingUser,
      payload.targetedUser,
      payload.message,
    );
  }

  afterInit(server: Server) {
    //console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    this.server.emit('onSocketIdUpdate', {});
  }
}
