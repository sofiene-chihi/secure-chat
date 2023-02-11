import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwkGeneratorResponse } from 'src/app/interfaces/JwkGeneratorResponse.interface';
import { ChatService } from 'src/app/services/chat.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { LayoutService } from 'src/app/services/layout.service';
import {
  spinnerMode,
  spinnerValue,
} from 'src/app/utilities/configs/spinner.config';
@Component({
  selector: 'app-invite-friend-modal',
  templateUrl: './invite-friend-modal.component.html',
  styleUrls: ['./invite-friend-modal.component.css'],
})
export class InviteFriendModalComponent implements OnInit {
  mobileStyling: boolean = false;
  requestSent: boolean = false;
  chatIssue: boolean = false;
  errorMessage: string = '';
  spinnerMode = spinnerMode;
  spinnerValue = spinnerValue;
  spinnerActive: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<InviteFriendModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutService: LayoutService,
    private chatService: ChatService,
    private router: Router,
  ) {}
  guestId: string = '';
  generatedId: string = '';

  ngOnInit(): void {
    this.mobileStyling = this.layoutService.mobileScreen();
  }

  cancelInviation() {
    this.dialogRef.close();
  }

  sendInvitation() {
    this.chatService.sendChatRequest(this.data.name, this.guestId);
    this.requestSent = true;
    this.chatService.onChatRequestResponse().subscribe(async (data: any) => {
      if (data.response == 'targetNotFound') {
        this.chatIssue = true;
        this.errorMessage = 'No user with this ID!';
      } else if (data.response == 'yes') {
        this.dialogRef.close();
        this.router.navigate(['/conversation'], {
          state: { source: 'invite' },
        });
      } else {
        this.chatIssue = true;
        this.errorMessage = 'Request has not been accepted!';
      }
    });
  }
}
