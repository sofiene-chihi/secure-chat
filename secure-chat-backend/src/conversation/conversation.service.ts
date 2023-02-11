import { Injectable } from '@nestjs/common';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';

@Injectable()
export class ConversationService {
  constructor(private redisCacheService: RedisCacheService) {}

  async createNewConversation(id1: string, id2: string): Promise<any> {
    const user1ConversationsId = `${id1}-conversations`;
    const user2ConversationsId = `${id2}-conversations`;

    await this.redisCacheService.createConversation(
      id1,
      id2,
      user1ConversationsId,
      user2ConversationsId,
    );
  }

  async getConversationsByUser(userId: string): Promise<string[] | void> {
    const conversation = await this.redisCacheService.getConversationsByUser(
      userId,
    );
    return conversation;
  }

  async addMessage(senderId: string, recieverId: string, message: string) {
    const senderMessagesId = `${senderId}-${recieverId}`;
    const recieverMessagesId = `${recieverId}-${senderId}`;

    await this.redisCacheService.addMessage(
      senderMessagesId,
      recieverMessagesId,
      message,
    );
  }

  async getConversationMessages(conversationId: string) {
    const messages = await this.redisCacheService.getConversationMessages(
      conversationId,
    );
    return messages;
  }
}
