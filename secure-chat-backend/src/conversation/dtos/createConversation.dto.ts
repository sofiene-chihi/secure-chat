import { IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  id1: string;

  @IsNotEmpty()
  id2: string;
}
