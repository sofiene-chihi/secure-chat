import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.css'],
})
export class InvitationModalComponent implements OnInit {
  mobileStyling: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<InvitationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutService: LayoutService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mobileStyling = this.layoutService.mobileScreen();
  }

  declineRequest() {
    this.dialogRef.close();
    this.chatService.declineRequest(this.data.sender);
  }

  acceptRequest() {
    this.dialogRef.close();
    this.chatService.acceptRequest(this.data.clientId, this.data.sender);
    this.router.navigate(['/conversation'], { state: { source: 'invitation' } });
  }
}
