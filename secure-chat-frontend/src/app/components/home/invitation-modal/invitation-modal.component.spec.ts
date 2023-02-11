import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationModalComponent } from './invitation-modal.component';

describe('InvitationModalComponent', () => {
  let component: InvitationModalComponent;
  let fixture: ComponentFixture<InvitationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
