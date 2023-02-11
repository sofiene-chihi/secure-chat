import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('user/:id')
  async getConversation(@Param('id') id: string): Promise<string[] | void> {
    return await this.conversationService.getConversationsByUser(id);
  }

  @Get('messages/:id')
  async getConversationMessages(
    @Param('id') id: string,
  ): Promise<string[] | void> {
    return await this.conversationService.getConversationMessages(id);
  }
}
