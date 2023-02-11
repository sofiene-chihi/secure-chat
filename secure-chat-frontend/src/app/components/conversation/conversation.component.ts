import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwkGeneratorResponse } from 'src/app/interfaces/JwkGeneratorResponse.interface';
import { JwkKey } from 'src/app/interfaces/JwkKey.interface';
import { KeySchemaInterface } from 'src/app/interfaces/KeySchema.interface';
import { Message } from 'src/app/interfaces/message.interface';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { IndexedDBService } from 'src/app/services/indexed-db.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    private conversationService: ConversationService,
    private userService: UserService,
    private router: Router,
    private chatService: ChatService,
    private cryptoService: CryptoService,
    private indexedBDService: IndexedDBService
  ) {}

  mobileDevice: boolean = false;
  sidenavMode: MatDrawerMode = 'side';
  conversationMessages: Message[] = [];
  updatedProfileName: string = '';
  conversationTTL: number = 0;
  cryptoKeyPair!: JwkGeneratorResponse;
  derivedCryptoKey!: CryptoKey;
  recievedPublicKey!: JwkKey;
  savedKeys!: KeySchemaInterface;

  async ngOnInit(): Promise<void> {
    if (!this.userService.getUserIdLocal()) {
      this.router.navigate(['/']);
    }
    this.mobileDevice = this.layoutService.mobileScreen();

    this.chatService.onPublicKeyRecieve().subscribe(async (data: any) => {
      console.log('recieved public key');

      if (JSON.stringify(this.recievedPublicKey) != JSON.stringify(data)) {
        console.log('updating keys');
        this.recievedPublicKey = data;

        if (!this.cryptoKeyPair) {
          this.cryptoKeyPair = await this.cryptoService.generateKeyPair();
        }

        await this.indexedBDService.setKeys(
          this.cryptoKeyPair.privateKeyJwk,
          this.recievedPublicKey,
          this.updatedProfileName
        );

        this.chatService.sendPublicKey(
          this.updatedProfileName,
          this.cryptoKeyPair.publicKeyJwk
        );
        this.derivedCryptoKey = await this.cryptoService.generateDerivedKey(
          this.recievedPublicKey,
          this.cryptoKeyPair.privateKeyJwk
        );
      }
    });

    if (history.state.source == 'invitation') {
      console.log('invitation source');
      console.log(this.updatedProfileName);
      this.cryptoKeyPair = await this.cryptoService.generateKeyPair();
      this.chatService.sendPublicKey(
        this.updatedProfileName,
        this.cryptoKeyPair.publicKeyJwk
      );
    } else if (history.state.source == 'invite') {
      console.log('not generating new keys');
    }
  }

  async updateConversation(profileName: string) {
    const userId: string = this.userService.getUserIdLocal() as string;
    this.updatedProfileName = profileName;

    console.log('updating conversation target name');
    if (await this.indexedBDService.getKeys(this.updatedProfileName)) {
      this.savedKeys = await this.indexedBDService.getKeys(
        this.updatedProfileName
      );
      this.derivedCryptoKey = await this.cryptoService.generateDerivedKey(
        this.savedKeys.targetPublicKey,
        this.savedKeys.SenderPrivateKey
      );

      this.conversationService
        .getConversationMessages(`${userId}-${this.updatedProfileName}`)
        .subscribe((res: any) => {
          this.conversationMessages = res.messages;
          this.conversationMessages.shift();
          this.conversationTTL = Math.floor((res.ttl as number) / 60);

          let promiseMessages = this.conversationMessages.map(
            async (message: Message): Promise<Message> => {
              return {
                content: await this.cryptoService.decryptMessage(
                  message.content,
                  this.derivedCryptoKey
                ),
                type: message.type,
              };
            }
          );

          Promise.all(promiseMessages).then((result: Message[]) => {
            console.log('decypted messages');
            console.log(result);
            this.conversationMessages = result;
          });
        });
    }

    const toggleSidenavButton = document.getElementById('toggleButton');
    toggleSidenavButton?.click();
  }
}
