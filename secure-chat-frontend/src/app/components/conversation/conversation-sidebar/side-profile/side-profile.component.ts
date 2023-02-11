import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.css'],
})
export class SideProfileComponent implements OnInit {

  constructor() {}

  @Input() profileName:string=""

  conversationPeriod : number = 45
  ngOnInit(): void {}
}
