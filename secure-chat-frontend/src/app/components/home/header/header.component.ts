import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobileScreen:boolean = false
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.mobileScreen = this.layoutService.mobileScreen()
  }

}
