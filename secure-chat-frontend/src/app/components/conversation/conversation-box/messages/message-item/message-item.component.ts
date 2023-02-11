import { Component, Input, OnInit } from '@angular/core';
import { MessageTypeEnum } from 'src/app/enums/messageType.enum';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  constructor() {}

  @Input() messageText: string = 'Hello there';
  @Input() messageType: string = '';

  ngOnInit(): void {
    
  }
}
