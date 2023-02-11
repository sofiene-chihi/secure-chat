import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendModalComponent } from './invite-friend-modal.component';

describe('InviteFriendModalComponent', () => {
  let component: InviteFriendModalComponent;
  let fixture: ComponentFixture<InviteFriendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteFriendModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteFriendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
