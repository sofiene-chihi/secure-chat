import { MessageTypeEnum } from '../enums/messageType.enum';

export interface Message {
  content: string;
  type: MessageTypeEnum;
}
