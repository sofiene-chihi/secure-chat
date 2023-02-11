import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserService } from 'src/app/services/user.service';
import { InvitationModalComponent } from '../../home/invitation-modal/invitation-modal.component';
import { InviteFriendModalComponent } from '../../home/invite-friend-modal/invite-friend-modal.component';

@Component({
  selector: 'app-conversation-sidebar',
  templateUrl: './conversation-sidebar.component.html',
  styleUrls: ['./conversation-sidebar.component.css'],
})
export class ConversationSidebarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private chatService: ChatService,
    private conversationService: ConversationService,
    private router: Router
  ) {}

  @Output() profileNameEvent = new EventEmitter<string>();
  conversationList: string[] = [];
  @Input() userProfile: string = '';

  ngOnInit(): void {
    let userId = this.userService.getUserIdLocal();
    if (userId) {
      this.conversationService
        .getUserConversations(userId)
        .subscribe((res: any[]) => {
          console.log(res[0]);
          this.conversationList = res[0];
          if (!this.conversationList.length) {
            this.router.navigate(['/']);
          } else {
            this.profileNameEvent.emit(this.conversationList[0]);
          }
        });
    } else {
      alert('No generated user!!');
    }
    this.chatService.onConversationRequest().subscribe((data: any) => {
      this.dialog.open(InvitationModalComponent, {
        width: '500px',
        data: { clientId: data.id2, sender: data.id1 },
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('new sidebar changes');
    console.log(changes['userProfile'].currentValue);
    this.profileNameEvent.emit(changes['userProfile'].currentValue);
  }

  openConversation(profileName: string) {
    this.profileNameEvent.emit(profileName);
  }

  openAddConversation() {
    let userId = this.userService.getUserIdLocal();
    this.dialog.open(InviteFriendModalComponent, {
      width: '500px',
      data: { name: userId },
    });
  }
}
