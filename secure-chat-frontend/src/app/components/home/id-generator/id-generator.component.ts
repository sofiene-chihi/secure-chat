import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareIdModalComponent } from '../share-id-modal/share-id-modal.component';
import { InviteFriendModalComponent } from '../invite-friend-modal/invite-friend-modal.component';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { InvitationModalComponent } from '../invitation-modal/invitation-modal.component';

@Component({
  selector: 'app-id-generator',
  templateUrl: './id-generator.component.html',
  styleUrls: ['./id-generator.component.css'],
})
export class IdGeneratorComponent implements OnInit {
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(12),
  ]);
  generatedId: string = '';
  submittedName: boolean = false;
  mobileStyling: boolean = false;
  copyIdMessage: string = 'Copy Id';
  rowHeightNumber: number = 10;

  constructor(
    private layoutService: LayoutService,
    public dialog: MatDialog,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.mobileStyling = this.layoutService.mobileScreen();
    if (this.mobileStyling) {
      this.rowHeightNumber = 3;
    }
    this.chatService.onConversationRequest().subscribe((data: any) => {
      this.dialog.open(InvitationModalComponent, {
        width: '500px',
        data: { clientId: data.id2, sender: data.id1 },
      });
    });
  }

  submitEvent(event: any) {
    if (event.keyCode === 13) {
      this.submitName();
    }
  }

  submitName() {
    if (this.nameFormControl.valid && !this.submittedName) {
      this.userService
        .generateId(this.nameFormControl.value as string)
        .subscribe((res: any) => {
          this.generatedId = res;
          this.userService.setUserIdLocal(this.generatedId);
          this.submittedName = true;
          this.chatService.integrateChat(this.generatedId);
        });
    }
  }

  copyId() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.opacity = '0';
    selBox.value = this.generatedId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyIdMessage = 'Copied!';
  }

  shareId() {
    this.dialog.open(ShareIdModalComponent, {
      width: '500px',
    });
  }

  inviteById() {
    this.dialog.open(InviteFriendModalComponent, {
      width: '500px',
      data: { name: this.generatedId },
    });
  }
}
