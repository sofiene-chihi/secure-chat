import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { MessageTypeEnum } from 'src/conversation/enums/messageType.enum';
import { Message } from 'src/conversation/interfaces/message.interface';
import { RedisCache } from './interfaces/redis.interface';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: RedisCache) {
    this.redisClient = this.cacheService.store.getClient();
  }

  private redisClient: RedisClient;

  async setItem(itemKey: string, data: any): Promise<any> {
    return await this.cacheService.set(itemKey, data);
  }

  async getItem(itemKey: string): Promise<any> {
    return await this.cacheService.get(itemKey);
  }

  async createConversation(
    user1: string,
    user2: string,
    user1ConversationId: string,
    user2ConversationId: string,
  ): Promise<void> {
    const multi = this.redisClient.multi();
    multi.rpush(user1ConversationId, user2);
    multi.rpush(user2ConversationId, user1);

    const user1MessagesId: string = `${user1}-${user2}` as string;
    const user2MessagesId: string = `${user2}-${user1}` as string;

    multi.rpush(user1MessagesId, 'Setting Counter');
    multi.rpush(user2MessagesId, 'Setting Counter');
    multi.expire(user1MessagesId, 60 * 60 * 2, 'NX');
    multi.expire(user2MessagesId, 60 * 60 * 2, 'NX');

    multi.exec((errors, results) => {
      if (errors) {
        console.error(errors);
      } else {
        console.log(results);
      }
    });
  }

  async getConversationsByUser(userId: string): Promise<any> {
    const multi = this.redisClient.multi();
    const userConversationsId = `${userId}-conversations`;

    const res = await new Promise((resolve, reject) => {
      multi.lrange(userConversationsId, 0, -1);
      multi.exec((err, results) => {
        resolve(results);
      });
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async addMessage(
    senderMessagesId: string,
    recieverMessagesId: string,
    message: string,
  ) {
    const multi = this.redisClient.multi();
    multi.rpush(senderMessagesId, message + '&&' + MessageTypeEnum.SENT);
    multi.rpush(recieverMessagesId, message + '&&' + MessageTypeEnum.RECIEVED);
    // set the expiration time for 2h
    multi.exec((errors, results) => {
      if (errors) {
        console.error(errors);
      } else {
        console.log(results);
      }
    });
  }

  stringToObjectParser(message: string) {
    const messageObject: Message = {
      content: message.split('&&')[0],
      type: message.split('&&')[1] as MessageTypeEnum,
    };

    return messageObject;
  }

  async getConversationMessages(conversationId: string): Promise<any> {
    const multi = this.redisClient.multi();

    const res = await new Promise((resolve, reject) => {
      multi.lrange(conversationId, 0, -1);
      multi.ttl(conversationId);

      multi.exec((err, results) => {
        resolve(results);
      });
    });
    if (res) {
      const messagesList: string[] = res[0] as string[];
      const conversationRemainingTime: number = res[1] as number;
      const messages: Message[] = messagesList.map((message: string) => {
        return this.stringToObjectParser(message);
      });
      return {
        messages: messages,
        ttl: conversationRemainingTime,
      };
    } else {
      return null;
    }
  }
}
