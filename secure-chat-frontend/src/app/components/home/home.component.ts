import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private indexedDBService: IndexedDBService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.removeUserIdLocal();
    await this.indexedDBService.clearKeys();
  }
}
