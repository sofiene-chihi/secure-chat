import { Module } from '@nestjs/common';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
