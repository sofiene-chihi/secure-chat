import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageTypeEnum } from 'src/app/enums/messageType.enum';
import { Message } from 'src/app/interfaces/message.interface';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { QuitModalComponent } from '../quit-modal/quit-modal.component';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-conversation-box',
  templateUrl: './conversation-box.component.html',
  styleUrls: ['./conversation-box.component.css'],
})
export class ConversationBoxComponent implements OnInit {
  @Input() newProfileName: string = '';
  @Input() remainingTime: number = 0;
  @Input() encryptionKey!: CryptoKey;
  messageFormControl = new FormControl('', [Validators.required]);
  @Input() conversationMessages: Message[] = [];
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private cryptoService: CryptoService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = this.userService.getUserIdLocal();
    const timerId = setInterval(() => {
      this.remainingTime = this.remainingTime - 1;
      if (this.remainingTime == 0) {
        this.userService.removeUserIdLocal();
        this.router.navigate(['/']);
        clearInterval(timerId);
      }
    }, 60000);

    // updating the user socket id in the database when it changed in the socket server
    this.chatService.onClientSocketIdUpdate().subscribe((data: any) => {
      console.log('udpating the userId ' + userId);
      if (userId) {
        this.chatService.updateClientSocketId(userId);
      }
    });

    // when recieving a new message
    this.chatService.onMessageRecieve().subscribe(async (data: any) => {
      console.log('recieved message: ' + data);
      this.conversationMessages.push({
        content: await this.cryptoService.decryptMessage(
          data,
          this.encryptionKey
        ),
        type: MessageTypeEnum.RECIEVED,
      });
    });

    console.log(this.conversationMessages);
  }

  leaveConversation() {
    this.dialog.open(QuitModalComponent, {
      width: '500px',
    });
  }

  async sendMessage() {
    if (this.messageFormControl.valid) {
      const userId: string = this.userService.getUserIdLocal() as string;
      const message: string = this.messageFormControl.value as string;

      console.log('encryption key ' + this.encryptionKey);
      let encryptedMessage: string = await this.cryptoService.encryptMessage(
        message,
        this.encryptionKey
      );
      console.log('message before encryption: ' + message);
      console.log('message after encryption ' + encryptedMessage);
      this.chatService.sendMessage({
        message: encryptedMessage,
        targetedUser: this.newProfileName,
        sendingUser: userId,
      });
      console.log(
        'sent message: ' +
          JSON.stringify({
            message: message,
            targetedUser: this.newProfileName,
            sendingUser: userId,
          })
      );
      this.conversationMessages.push({
        content: message,
        type: MessageTypeEnum.SENT,
      });
      console.log(this.conversationMessages);
      this.messageFormControl.setValue('');
    }
  }
}
