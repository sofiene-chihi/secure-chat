import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quit-modal',
  templateUrl: './quit-modal.component.html',
  styleUrls: ['./quit-modal.component.css'],
})
export class QuitModalComponent implements OnInit {
  mobileStyling: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<QuitModalComponent>,
    private layoutService: LayoutService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.mobileStyling = this.layoutService.mobileScreen();
  }

  accept() {
    this.dialogRef.close();
    this.userService.removeUserIdLocal();
    this.router.navigate(['/']);
  }

  decline() {
    this.dialogRef.close();
  }
}
