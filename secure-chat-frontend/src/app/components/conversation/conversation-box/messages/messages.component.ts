import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor() {}

  @Input() messages: Message[] = [];
  ngOnInit(): void {
    console.log(this.messages);
  }
}
