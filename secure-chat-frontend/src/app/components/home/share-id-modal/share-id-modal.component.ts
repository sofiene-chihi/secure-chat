import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-share-id-modal',
  templateUrl: './share-id-modal.component.html',
  styleUrls: ['./share-id-modal.component.css']
})
export class ShareIdModalComponent implements OnInit {

  rowHeightNumber:number = 3
  constructor(public dialogRef: MatDialogRef<ShareIdModalComponent>, private layoutService: LayoutService) { }

  ngOnInit(): void {
    if(this.layoutService.mobileScreen()){
      this.rowHeightNumber = 1
    }
  }

  

}
